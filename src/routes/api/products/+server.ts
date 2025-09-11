import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { shopify } from '$lib/clients/shopify'


export const GET: RequestHandler = async ({ request, setHeaders }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') as string;

  const variants = await shopify.query({
    data: `
      query {
        products(first: 100, query: "${q}", sortKey: TITLE) {
          edges {
            node {
              id
              title
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
    products: variants.data?.products?.edges.map((edge) => edge.node)
  });
}