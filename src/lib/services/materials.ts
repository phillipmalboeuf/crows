import { DIRECTUS_ADMIN_KEY } from '$env/static/private'
import { directus } from '$lib/clients/directus'
import { readItems } from '@directus/sdk'

export const getVariants = async () => {
  const variants = await directus(DIRECTUS_ADMIN_KEY).request(readItems('variants', {
    //@ts-expect-error
    fields: ['*', 'projects.projects_id']
  }))
  return variants.map((variant) => ({
    ...variant,
    projects: variant.projects.map((project) => project.projects_id as string)
  }))
}

export const getProjects = async () => {
  const projects = await directus(DIRECTUS_ADMIN_KEY).request(readItems('projects'))
  return projects
}

export const getMaterials = async () => {
  const materials = await directus(DIRECTUS_ADMIN_KEY).request(readItems('materials', {
    sort: ['sort']
  }))
  return materials
}