import { shopify } from '$lib/clients/shopify'
import { DateTime } from 'luxon'

export type Order = {
  id: string
  name: string
  tags: string[]
  email: string
  totalPrice: number
  subtotalPrice: number
  totalDiscounts: number
  displayFulfillmentStatus: string
  createdAt: string
  lineItems: LineItem[]
  customer: {
    id: string
  }
}

export type LineItem = {
  id: string
  title: string
  quantity: number
  customAttributes: Array<{
    key: string
    value: string
  }>
  variant: {
    id: string
    title: string
    price: number
    product: {
      id: string
      title: string
    }
  }
}
export const getOrders = async () => {
  const now = DateTime.now()
  // const daysAgo = now.minus({ days: 90 })
  // const daysAgoString = daysAgo.toISODate()

  const orders = await shopify.query({
    data: `
      query {
        orders(first: 100, sortKey: CREATED_AT, query: "fulfillment_status:unfulfilled AND status:open") {
          edges {
            node {
              id
              name
              email
              tags
              customer {
                id
              }
              totalPrice
              displayFulfillmentStatus
              createdAt
              lineItems(first: 50) {
                edges {
                  node {
                    title
                    quantity
                    customAttributes {
                      key
                      value
                    }
                    variant {
                      id
                      title
                      price
                      product {
                        id
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  })

  return orders.data?.orders?.edges.map((edge) => ({
    ...edge.node,
    lineItems: edge.node.lineItems.edges.map((lineItem) => ({
      ...lineItem.node
    }))
  })) as Order[]
}

export const getOrdersByNumbers = async (numbers: string[]) => {
  const now = DateTime.now()
  // const daysAgo = now.minus({ days: 90 })
  // const daysAgoString = daysAgo.toISODate()

  const orders = await shopify.query({
    data: `
      query {
        orders(first: 150, sortKey: CREATED_AT, query: "name:${numbers.join(' OR name:')}") {
          edges {
            node {
              id
              name
              email
              tags
              customer {
                id
              }
              subtotalPriceSet {
                shopMoney {
                  amount
                }
              }
              totalDiscountsSet {
                shopMoney {
                  amount
                }
              }
              totalPrice
              displayFulfillmentStatus
              createdAt
            }
          }
        }
      }
    `
  })

  // console.log(orders.data?.orders?.edges.length, orders.data?.orders?.edges.map((edge) => edge.node.totalDiscountsSet))

  return orders.data?.orders?.edges.map((edge) => ({
    ...edge.node,
    subtotalPrice: parseFloat(edge.node.subtotalPriceSet.shopMoney.amount) + parseFloat(edge.node.totalDiscountsSet.shopMoney.amount),
    totalDiscounts: parseFloat(edge.node.totalDiscountsSet.shopMoney.amount),
  })) as Order[]
}

export const getDatabaseOrders = async () => {
  const now = DateTime.now()
  // const daysAgo = now.minus({ days: 90 })
  // const daysAgoString = daysAgo.toISODate()

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

  return [] as Order[]
}