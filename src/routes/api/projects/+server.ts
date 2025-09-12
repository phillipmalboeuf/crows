import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { shopify } from '$lib/clients/shopify'

import hours from '../../../projects_hours.json'
import projectsData from '../../../projects.json'
import { getMaterials } from '$lib/services/materials'
import { DIRECTUS_ADMIN_KEY } from '$env/static/private'
import { directus } from '$lib/clients/directus'
import { createItems, readItems } from '@directus/sdk'


export const GET: RequestHandler = async ({ request, setHeaders }) => {

  // const materials = await getMaterials()

  const productsData = (await shopify.query({
    data: `
      query {
        products(first: 250, query: "status:active", sortKey: TITLE) {
          edges {
            node {
              id
              title
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    `,
  })).data?.products?.edges.reduce((acc, product) => {
    return {
      ...acc,
      [product.node.id]: product.node
    }
  }, {} as Record<string, { id: string, title: string }>);

  console.log(Object.keys(productsData).length)

  const projects = await directus(DIRECTUS_ADMIN_KEY).request(readItems('projects', {
    limit: 1000,
    fields: ['id', 'name']
  }))

  // First, create the variants without the projects relationship
  // const variants = productsData.data?.products?.edges.filter(product => !product.node.title.includes('Acorn Belt Pouch') && !product.node.title.includes('Classic Skirt Hike')).map(product => ({
  //   shopify_variant: product.node.id,
    // title: product.node.title,
  // }))

  const variants = await directus(DIRECTUS_ADMIN_KEY).request(readItems('variants', {
    limit: 1000,
  }))
  // console.log(JSON.stringify(variants, null, 2))
  

  const relations = variants.map(variant => ({
    variants_id: variant.id,
    projects_id: projects.find(project => productsData[variant.shopify_variant]?.title.includes(project.name))?.id
  }))

  console.log(relations.length)
  // console.log(JSON.stringify(relations, null, 2))
  
  if (relations.length > 0) {
    // await directus(DIRECTUS_ADMIN_KEY).request(createItems('variants_projects', relations))
  }

  // const projects = projectsData
  //   .filter(project => !project.Item.includes('Kit'))
  //   .filter(project => project.Item !== 'Acorn Belt Pouch' && project.Item !== 'Atlantis Bracers' && project.Item !== 'Classic Skirt Hike' && project.Item !== 'Ivy Leaf Epaulette Shoulder Armor')
  //   .map(project => {
  //   project[project['Veg tan Type']] = project['Veg Tan Weight']
  //   delete project['Veg Tan Weight']
  //   delete project['Veg tan Type']
  //   return {
  //     name: project.Item,
  //     hours: hours.find(hour => hour['Item Name'] === project.Item)?.Hours,
  //     product: products.data?.products?.edges.find(product => {
  //       return product.node.title.includes(project.Item)
  //   })?.node
  //     // materials: materials.filter(material => project[material.name] && project[material.name] !== '').map(material => {
  //     //   return {
  //     //     amount: project[material.name],
  //     //     material: { key: material.id.toString() }
  //     //   }
  //     // })
  //   }
  // })

  // console.log(await directus(DIRECTUS_ADMIN_KEY).request(createItems('projects', projects)))

  return json(relations);
}