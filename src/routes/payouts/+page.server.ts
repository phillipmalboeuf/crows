import { shopify } from '$lib/clients/shopify';
import { directus } from '$lib/clients/directus'
import { getOrders, getOrdersByNumbers, type Order as ShopifyOrder } from '$lib/services/orders';
import { getGoblins, getMaterials, getProjects, getUnpaidOrders, getVariants } from '$lib/services/materials';
import type { Material, Project, Variant, Order } from '$lib/clients/schema';



export const load = async ({ request }) => {
  const [unpaidOrders, goblins] = await Promise.all([
    // getOrders(),
    getUnpaidOrders(),
    // getVariants(),
    // getProjects(),
    getGoblins()
  ])

  const orders = await getOrdersByNumbers(unpaidOrders.map(order => order.order))
  
  return {
    unpaidOrders: unpaidOrders.filter(order => goblins.find(goblin => goblin.id === order.goblin?.key)?.contractor),
    goblins: goblins.filter(goblin => goblin.contractor),
    orders: orders.reduce((acc, order) => ({
      ...acc,
      [order.name]: order
    }), {} as Record<string, ShopifyOrder>)
  }
}