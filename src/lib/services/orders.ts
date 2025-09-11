import { shopify } from '$lib/clients/shopify'
import { DateTime } from 'luxon'

export type Order = {
  id: string
  name: string
  email: string
  totalPrice: number
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
  const daysAgo = now.minus({ days: 90 })
  const daysAgoString = daysAgo.toISODate()

  const orders = await shopify.query({
    data: `
      query {
        orders(first: 100, sortKey: CREATED_AT, query: "fulfillment_status:unfulfilled AND status:open") {
          edges {
            node {
              id
              name
              email
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