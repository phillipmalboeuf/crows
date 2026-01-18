import { shopify } from '$lib/clients/shopify';
import { getOrderProducts, getOrders  } from '$lib/services/orders';
import { getAssignedOrders, getMaterials, getProjects, getVariants } from '$lib/services/materials';
import type { Material, Project, Variant, Order } from '$lib/clients/schema';


export const load = async ({ request }) => {
  const [orders] = await Promise.all([
    getOrderProducts()
  ])
  
  return {
    orders,
  }
}