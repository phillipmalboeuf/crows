import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { shopify } from '$lib/clients/shopify'
import { DIRECTUS_ADMIN_KEY } from '$env/static/private';
import { directus } from '$lib/clients/directus';
import { createItem, readItem, readItems, updateItem, updateItems, updateItemsBatch } from '@directus/sdk';

const escapeGraphqlString = (value: string) => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const syncOrderMetafields = async ({
  name,
  ready,
  goblin
}: {
  name: string;
  ready: boolean | null;
  goblin: string | null;
}) => {
  const safeName = escapeGraphqlString(name);
  const orderLookup = await shopify.query({
    data: `
      query {
        orders(first: 1, query: "name:${safeName}") {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  });

  const ownerId = orderLookup.data?.orders?.edges?.[0]?.node?.id as string | undefined;
  if (!ownerId) return;

  const now = new Date().toISOString();
  const setMetafields: string[] = [];

  if (ready === true) {
    setMetafields.push(`{ ownerId: "${ownerId}", namespace: "custom", key: "ready", type: "date_time", value: "${now}" }`);
  }

  if (goblin) {
    setMetafields.push(`{ ownerId: "${ownerId}", namespace: "custom", key: "started", type: "date_time", value: "${now}" }`);
  }

  if (setMetafields.length > 0) {
    const setResult = await shopify.query({
      data: `
        mutation {
          metafieldsSet(metafields: [${setMetafields.join(',')}]) {
            userErrors {
              field
              message
            }
          }
        }
      `
    });

    const setErrors = setResult.data?.metafieldsSet?.userErrors ?? [];
    if (setErrors.length > 0) {
      throw new Error(`Failed to set Shopify metafields: ${JSON.stringify(setErrors)}`);
    }
  }
};


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
      const updated = await directus(DIRECTUS_ADMIN_KEY).request(
        updateItemsBatch('orders', [{
          order: existingOrders[0].order,
          ...goblin ? { goblin: { key: goblin } } : {},
          ready,
          paid
        }])
      );

      await syncOrderMetafields({
        name,
        ready,
        goblin
      });

      return json(updated);
    } else {
      // Create new order
      const created = await directus(DIRECTUS_ADMIN_KEY).request(
        createItem('orders', {
          order: name,
          ...goblin ? { goblin: { key: goblin } } : {},
          ready,
          paid
        })
      );

      await syncOrderMetafields({
        name,
        ready,
        goblin
      });

      return json(created);
    }
  } catch (error) {
    console.error('Upsert failed:', error);
    throw error;
  }
}