import { shopify } from '$lib/clients/shopify';
import { getOrders  } from '$lib/services/orders';
import { getAssignedOrders, getMaterials, getProjects, getVariants } from '$lib/services/materials';
import type { Material, Project, Variant, Order } from '$lib/clients/schema';


export const load = async ({ request }) => {
  try {
  const [orders, variants, projects, materials] = await Promise.all([
    getOrders(),
    getVariants(),
    getProjects(),
    getMaterials()
  ])

  const assignments = (await getAssignedOrders(orders.map(order => order.name))).reduce((acc, assignment) => ({
      ...acc,
      [assignment.order]: assignment
    }), {} as Record<string, Order>)

    return {
    orders: orders.filter(order => !assignments[order.name]?.ready),
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
    materialsList: materials,
    materials: materials.reduce((acc, material) => ({
      ...acc,
      [material.id]: material
    }), {} as Record<string, Material>),
  }
  } catch (error) {
    console.error(error)
  }
  
  
}