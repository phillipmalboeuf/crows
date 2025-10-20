import { DIRECTUS_ADMIN_KEY } from '$env/static/private'
import { directus } from '$lib/clients/directus'
import { readItems } from '@directus/sdk'

export const getVariants = async () => {
  const variants = await directus(DIRECTUS_ADMIN_KEY).request(readItems('variants', {
    limit: 300,
    //@ts-expect-error
    fields: ['*', 'projects.projects_id']
  }))
  return variants.map((variant) => ({
    ...variant,
    projects: variant.projects.map((project) => project.projects_id as string)
  }))
}

export const getProjects = async () => {
  const projects = await directus(DIRECTUS_ADMIN_KEY).request(readItems('projects', {
    limit: 300,
  }))
  return projects
}

export const getMaterials = async () => {
  const materials = await directus(DIRECTUS_ADMIN_KEY).request(readItems('materials', {
    limit: 300,
    sort: ['sort']
  }))
  return materials
}

export const getGoblins = async () => {
  const materials = await directus(DIRECTUS_ADMIN_KEY).request(readItems('goblins', {
    limit: 30,
    sort: ['sort']
  }))
  return materials
}

export const getAssignedOrders = async (orders: string[]) => {
  const assignedOrders = await directus(DIRECTUS_ADMIN_KEY).request(readItems('orders', {
    limit: 300,
    filter: {
      order: {
        _in: orders
      }
    }
  }))
  return assignedOrders
}

export const getUnpaidOrders = async () => {
  const unpaidOrders = await directus(DIRECTUS_ADMIN_KEY).request(readItems('orders', {
    limit: 300,
    filter: {
      paid: {
        _neq: true
      }
    }
  }))
  return unpaidOrders
}