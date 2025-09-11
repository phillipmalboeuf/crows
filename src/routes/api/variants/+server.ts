import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { shopify } from '$lib/clients/shopify'


export const GET: RequestHandler = async ({ request, setHeaders }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') as string;

  const variants = await shopify.query({
    data: `
      query {
        productVariants(first: 100, query: "${q}") {
          edges {
            node {
              id
              title
              product {
                title
              }
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
    variants: variants.data?.productVariants?.edges
  });
}