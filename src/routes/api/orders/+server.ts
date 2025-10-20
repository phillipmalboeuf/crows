import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { shopify } from '$lib/clients/shopify'
import { DIRECTUS_ADMIN_KEY } from '$env/static/private';
import { directus } from '$lib/clients/directus';
import { createItem, readItem, readItems, updateItem, updateItems, updateItemsBatch } from '@directus/sdk';


export const GET: RequestHandler = async ({ request, setHeaders }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') as string;

  const orders = await shopify.query({
    data: `
      query {
        orders(first: 100, query: "name:${q}") {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
  });

  setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  return json({
    orders: orders.data?.orders?.edges.map((edge) => edge.node)
  });
}

export const PUT: RequestHandler = async ({ request, setHeaders }) => {
  const { name, goblin, ready, paid } = await request.json();

  try {
    // First, try to find existing order
    const existingOrders = await directus(DIRECTUS_ADMIN_KEY).request(
      readItems('orders', {
        filter: { order: { _eq: name } },
        limit: 1
      })
    );

    if (existingOrders.length > 0) {
      // Update existing order
      return json(await directus(DIRECTUS_ADMIN_KEY).request(
        updateItemsBatch('orders', [{
          order: existingOrders[0].order,
          ...goblin ? { goblin: { key: goblin } } : {},
          ready,
          paid
        }])
      ));
    } else {
      // Create new order
      return json(await directus(DIRECTUS_ADMIN_KEY).request(
        createItem('orders', {
          order: name,
          ...goblin ? { goblin: { key: goblin } } : {},
          ready,
          paid
        })
      ));
    }
  } catch (error) {
    console.error('Upsert failed:', error);
    throw error;
  }
}