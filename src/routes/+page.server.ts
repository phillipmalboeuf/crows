import { shopify } from '$lib/clients/shopify';
import { getOrders } from '$lib/services/orders';
import { getMaterials, getProjects, getVariants } from '$lib/services/materials';
import type { Material, Project, Variant } from '$lib/clients/schema';


export const load = async ({ request }) => {
  const [orders, variants, projects, materials] = await Promise.all([
    getOrders(),
    getVariants(),
    getProjects(),
    getMaterials()
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
    materialsList: materials,
    materials: materials.reduce((acc, material) => ({
      ...acc,
      [material.id]: material
    }), {} as Record<string, Material>),
  }
}