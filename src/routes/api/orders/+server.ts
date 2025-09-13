import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { shopify } from '$lib/clients/shopify'


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