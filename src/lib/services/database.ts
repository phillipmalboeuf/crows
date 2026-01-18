import { desc, eq } from 'drizzle-orm';
import { orders as ordersTable } from '../../../drizzle/schema';
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

export type SankeyDataPoint = {
  from: string;
  to: string;
  value: number;
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
      .orderBy(ordersTable.createdAt);
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

  // Sort each customer's orders by date and extract first product from each order
  const customerOrderProducts: Map<string, string[]> = new Map();
  
  for (const [customerId, customerOrders] of customerOrdersMap.entries()) {
    // Sort by creation date
    const sortedOrders = [...customerOrders].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    });

    // Extract first product from each order
    const products = sortedOrders
      .map(order => {
        const lineItems = order.lineItems as any;
        if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
          return null;
        }
        
        const firstLineItem = lineItems[0];
        // Try to get product title from various possible structures
        const productTitle = 
          firstLineItem?.product?.title ||
          firstLineItem?.variant?.product?.title ||
          firstLineItem?.title ||
          'Unknown Product';
        
        return productTitle;
      })
      .filter((product): product is string => product !== null);

    if (products.length > 0) {
      customerOrderProducts.set(customerId, products);
    }
  }

  // Build transition counts
  // First to Second transitions
  const firstToSecond = new Map<string, Map<string, number>>();
  // Second to Third transitions
  const secondToThird = new Map<string, Map<string, number>>();
  // Product counts for first orders
  const firstOrderCounts = new Map<string, number>();

  for (const products of customerOrderProducts.values()) {
    if (products.length >= 1) {
      const firstProduct = products[0];
      firstOrderCounts.set(firstProduct, (firstOrderCounts.get(firstProduct) || 0) + 1);
    }

    if (products.length >= 2) {
      const firstProduct = products[0];
      const secondProduct = products[1];
      
      if (!firstToSecond.has(firstProduct)) {
        firstToSecond.set(firstProduct, new Map());
      }
      const secondMap = firstToSecond.get(firstProduct)!;
      secondMap.set(secondProduct, (secondMap.get(secondProduct) || 0) + 1);
    }

    if (products.length >= 3) {
      const secondProduct = products[1];
      const thirdProduct = products[2];
      
      if (!secondToThird.has(secondProduct)) {
        secondToThird.set(secondProduct, new Map());
      }
      const thirdMap = secondToThird.get(secondProduct)!;
      thirdMap.set(thirdProduct, (thirdMap.get(thirdProduct) || 0) + 1);
    }
  }

  // Convert to Sankey data format
  const sankeyData: SankeyDataPoint[] = [];

  // Add first → second transitions
  for (const [fromProduct, toProducts] of firstToSecond.entries()) {
    for (const [toProduct, count] of toProducts.entries()) {
      sankeyData.push({
        from: fromProduct,
        to: toProduct,
        value: count
      });
    }
  }

  // Add second → third transitions
  for (const [fromProduct, toProducts] of secondToThird.entries()) {
    for (const [toProduct, count] of toProducts.entries()) {
      sankeyData.push({
        from: fromProduct,
        to: toProduct,
        value: count
      });
    }
  }

  return sankeyData;
}