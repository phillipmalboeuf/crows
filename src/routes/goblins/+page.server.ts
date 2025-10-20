import { shopify } from '$lib/clients/shopify';
import { directus } from '$lib/clients/directus'
import { getOrders } from '$lib/services/orders';
import { getAssignedOrders, getGoblins, getMaterials, getProjects, getVariants } from '$lib/services/materials';
import type { Material, Project, Variant, Order } from '$lib/clients/schema';



export const load = async ({ request }) => {
  const [goblins] = await Promise.all([
    getGoblins()
  ])
  
  return {
    goblins,
  }
}