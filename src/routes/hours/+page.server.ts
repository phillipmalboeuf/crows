import { shopify } from '$lib/clients/shopify';
import { getOrders } from '$lib/services/orders';
import { getGoblins, getMaterials, getProjects, getVariants } from '$lib/services/materials';
import type { Material, Project, Variant } from '$lib/clients/schema';


export const load = async ({ request }) => {
  const [orders, variants, projects, goblins] = await Promise.all([
    getOrders(),
    getVariants(),
    getProjects(),
    getGoblins()
  ])
  
  return {
    orders,
    variants: variants.reduce((acc, variant) => ({
      ...acc,
      [variant.shopify_variant]: {
        ...variant,
      }
    }), {} as Record<string, Variant>),
    projects: projects.reduce((acc, project) => ({
      ...acc,
      [project.id]: project
    }), {} as Record<string, Project>),
    goblins
  }
}