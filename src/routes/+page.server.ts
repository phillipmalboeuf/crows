import { shopify } from '$lib/clients/shopify';




export const load = async ({ request }) => {
  console.log("TEST",request);
  const orders = await shopify.query({
    data: `
      query {
  orders(first: 10) {
    edges {
      cursor
      node {
        id
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
    `,
  });

  console.log("TEST",orders);

  return {
    orders
  }
}