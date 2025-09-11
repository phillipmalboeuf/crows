import { SHOPIFY_TOKEN, SHOPIFY_SHOP_DOMAIN } from '$env/static/private';

// Simple GraphQL client for custom store apps
export const shopify = {
	async query({ data }: { data: string }) {
		const response = await fetch(`https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2025-07/graphql.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Access-Token': SHOPIFY_TOKEN,
			},
			body: JSON.stringify({ query: data })
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	}
};