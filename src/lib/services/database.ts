import { desc, eq, gt } from 'drizzle-orm';
import { orders as ordersTable, customers as customersTable } from '../../../drizzle/schema';
import { db } from '$lib/clients/database';

export const getDatabaseOrders = async () => {
  // const now = DateTime.now()
  // const daysAgo = now.minus({ days: 90 })
  // const daysAgoString = daysAgo.toISODate()

  const orders = await db.select().from(ordersTable).where(eq(ordersTable.fulfillmentStatus, 'fulfilled')).orderBy(desc(ordersTable.createdAt)).limit(2000)

  // const orders = await shopify.query({
  //   data: `
  //     query {
  //       orders(first: 250, sortKey: CREATED_AT, reverse: true, query: "fulfillment_status:fulfilled") {
  //         edges {
  //           node {
  //             id
  //             name
  //             createdAt
  //             customer {
  //               id
  //             }
  //             lineItems(first: 10) {
  //               edges {
  //                 node {
  //                   title
  //                   quantity
  //                   variant {
  //                     id
  //                     product {
  //                       id
  //                       title
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `
  // })

  // console.log(orders)

  return orders
}

export const getCustomersWithMultipleOrders = async () => {
  const customers = await db.select({
    id: customersTable.id,
    email: customersTable.email,
    ordersCount: customersTable.ordersCount
  })
    .from(customersTable)
    .where(gt(customersTable.ordersCount, 1));

  return customers;
}


export type SankeyDataPoint = {
  from: string;
  to: string;
  value: number;
  customerIds: string[];
}

/**
 * Analyzes customer order sequences and generates Sankey diagram data
 * showing flows from first order → second order → third order
 */
export const getCustomerOrderSequenceSankeyData = async (): Promise<SankeyDataPoint[]> => {
  // Fetch all fulfilled orders - only select necessary fields
  let orders;
  try {
    orders = await db.select({
      id: ordersTable.id,
      customer: ordersTable.customer,
      email: ordersTable.email,
      createdAt: ordersTable.createdAt,
      lineItems: ordersTable.lineItems
    })
      .from(ordersTable)
      .where(eq(ordersTable.fulfillmentStatus, 'fulfilled'))
      .orderBy(ordersTable.createdAt)
      .limit(4000);
  } catch (error: any) {
    console.error('Database query error:', error);
    console.error('Error message:', error?.message);
    console.error('Error cause:', error?.cause);
    console.error('Full error:', JSON.stringify(error, null, 2));
    throw error;
  }

  // Group orders by customer ID
  const customerOrdersMap = new Map<string, typeof orders>();
  
  for (const order of orders) {
    const customer = order.customer as any;
    const customerId = customer?.id || customer?.admin_graphql_api_id || order.email || `unknown-${order.id}`;
    
    if (!customerOrdersMap.has(customerId)) {
      customerOrdersMap.set(customerId, []);
    }
    
    customerOrdersMap.get(customerId)!.push(order);
  }

  // Sort each customer's orders by date and extract all products from each order
  const customerOrderProducts: Map<string, string[][]> = new Map();
  
  for (const [customerId, customerOrders] of customerOrdersMap.entries()) {
    // Sort by creation date
    const sortedOrders = [...customerOrders].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    });

    // Extract all products from all line items in each order
    const orderProducts: string[][] = sortedOrders
      .map(order => {
        const lineItems = order.lineItems as any;
        if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
          return [];
        }
        
        // Extract all products from all line items
        const products = lineItems
          .map((lineItem: any) => {
            // Try to get product title from various possible structures
            const productTitle = 
              lineItem?.product?.title ||
              lineItem?.variant?.product?.title ||
              lineItem?.title ||
              'Unknown Product';
            
            return productTitle;
          })
          .filter((product: string | null): product is string => product !== null);
        
        return products;
      })
      .filter((products: string[]): products is string[] => products.length > 0);

    if (orderProducts.length > 0) {
      customerOrderProducts.set(customerId, orderProducts);
    }
  }

  // Build transition counts with customer tracking
  // First to Second transitions: Map<fromProduct, Map<toProduct, { count: number, customerIds: string[] }>>
  const firstToSecond = new Map<string, Map<string, { count: number; customerIds: string[] }>>();
  // Second to Third transitions: Map<fromProduct, Map<toProduct, { count: number, customerIds: string[] }>>
  const secondToThird = new Map<string, Map<string, { count: number; customerIds: string[] }>>();
  // Third to Fourth transitions: Map<fromProduct, Map<toProduct, { count: number, customerIds: string[] }>>
  const thirdToFourth = new Map<string, Map<string, { count: number; customerIds: string[] }>>();
  // Product counts for first orders
  const firstOrderCounts = new Map<string, number>();

  for (const [customerId, orderProducts] of customerOrderProducts.entries()) {
    // orderProducts is an array of arrays: [[order1_products], [order2_products], ...]
    
    // Track first order products
    if (orderProducts.length >= 1 && orderProducts[0].length > 0) {
      for (const product of orderProducts[0]) {
        firstOrderCounts.set(product, (firstOrderCounts.get(product) || 0) + 1);
      }
    }

    // First → Second order transitions (all products in order 1 → all products in order 2)
    if (orderProducts.length >= 2) {
      const firstOrderProducts = orderProducts[0];
      const secondOrderProducts = orderProducts[1];
      
      // Create transitions from each product in first order to each product in second order
      for (const firstProduct of firstOrderProducts) {
        if (!firstToSecond.has(firstProduct)) {
          firstToSecond.set(firstProduct, new Map());
        }
        const secondMap = firstToSecond.get(firstProduct)!;
        
        for (const secondProduct of secondOrderProducts) {
          if (!secondMap.has(secondProduct)) {
            secondMap.set(secondProduct, { count: 0, customerIds: [] });
          }
          const transition = secondMap.get(secondProduct)!;
          transition.count++;
          transition.customerIds.push(customerId);
        }
      }
    }

    // Second → Third order transitions (all products in order 2 → all products in order 3)
    if (orderProducts.length >= 3) {
      const secondOrderProducts = orderProducts[1];
      const thirdOrderProducts = orderProducts[2];
      
      // Create transitions from each product in second order to each product in third order
      for (const secondProduct of secondOrderProducts) {
        if (!secondToThird.has(secondProduct)) {
          secondToThird.set(secondProduct, new Map());
        }
        const thirdMap = secondToThird.get(secondProduct)!;
        
        for (const thirdProduct of thirdOrderProducts) {
          if (!thirdMap.has(thirdProduct)) {
            thirdMap.set(thirdProduct, { count: 0, customerIds: [] });
          }
          const transition = thirdMap.get(thirdProduct)!;
          transition.count++;
          transition.customerIds.push(customerId);
        }
      }
    }

    // Third → Fourth order transitions (all products in order 3 → all products in order 4)
    if (orderProducts.length >= 4) {
      const thirdOrderProducts = orderProducts[2];
      const fourthOrderProducts = orderProducts[3];
      
      // Create transitions from each product in third order to each product in fourth order
      for (const thirdProduct of thirdOrderProducts) {
        if (!thirdToFourth.has(thirdProduct)) {
          thirdToFourth.set(thirdProduct, new Map());
        }
        const fourthMap = thirdToFourth.get(thirdProduct)!;
        
        for (const fourthProduct of fourthOrderProducts) {
          if (!fourthMap.has(fourthProduct)) {
            fourthMap.set(fourthProduct, { count: 0, customerIds: [] });
          }
          const transition = fourthMap.get(fourthProduct)!;
          transition.count++;
          transition.customerIds.push(customerId);
        }
      }
    }
  }

  // Convert to Sankey data format
  const sankeyData: SankeyDataPoint[] = [];

  // Add first → second transitions
  for (const [fromProduct, toProducts] of firstToSecond.entries()) {
    for (const [toProduct, transition] of toProducts.entries()) {
      sankeyData.push({
        from: fromProduct,
        to: toProduct,
        value: transition.count,
        customerIds: transition.customerIds
      });
      sankeyData.sort((a, b) => b.value - a.value);
    }
  }

  // Add second → third transitions
  for (const [fromProduct, toProducts] of secondToThird.entries()) {
    for (const [toProduct, transition] of toProducts.entries()) {
      sankeyData.push({
        from: fromProduct,
        to: toProduct,
        value: transition.count,
        customerIds: transition.customerIds
      });
    }
  }

  // Add third → fourth transitions
  for (const [fromProduct, toProducts] of thirdToFourth.entries()) {
    for (const [toProduct, transition] of toProducts.entries()) {
      sankeyData.push({
        from: fromProduct,
        to: toProduct,
        value: transition.count,
        customerIds: transition.customerIds
      });
    }
  }

  return sankeyData;
}