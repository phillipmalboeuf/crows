import { shopify } from '$lib/clients/shopify';
import { directus } from '$lib/clients/directus'
import { getOrders } from '$lib/services/orders';
import { getAssignedOrders, getGoblins, getMaterials, getProjects, getVariants } from '$lib/services/materials';
import type { Material, Project, Variant, Order } from '$lib/clients/schema';



export const load = async ({ request, params }) => {
  const [orders, variants, projects, goblins] = await Promise.all([
    getOrders(),
    getVariants(),
    getProjects(),
    getGoblins()
  ])

  const assignments = (await getAssignedOrders(orders.map(order => order.name))).   reduce((acc, assignment) => ({
      ...acc,
      [assignment.order]: assignment
    }), {} as Record<string, Order>)
  // console.log(assignments)
  
  return {
    id: params.id,
    orders: orders.filter(order => assignments[order.name]?.goblin?.key === params.id),
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
    goblins,
    assignments
  }
}