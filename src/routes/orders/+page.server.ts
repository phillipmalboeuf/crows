import { shopify } from '$lib/clients/shopify';
import { getDatabaseOrders, getOrders  } from '$lib/services/orders';
import { getAssignedOrders, getMaterials, getProjects, getVariants } from '$lib/services/materials';
import type { Material, Project, Variant, Order } from '$lib/clients/schema';


export const load = async ({ request }) => {
  const [orders] = await Promise.all([
    getDatabaseOrders()
  ])
  
  return {
    orders,
  }
}