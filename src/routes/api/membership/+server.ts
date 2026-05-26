import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { shopify } from '$lib/clients/shopify';

const escapeGraphqlString = (value: string) =>
	value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export const OPTIONS: RequestHandler = async ({ setHeaders }) => {
	setHeaders(corsHeaders);
	return new Response(null, { status: 204 });
};

export const POST: RequestHandler = async ({ request, setHeaders }) => {
	setHeaders(corsHeaders);

	const body = await request.json();
	const customerId = body?.customerId;
	const segmentIds = body?.segmentIds;

	if (typeof customerId !== 'string' || !customerId) {
		return json({ error: 'customerId is required' }, { status: 400 });
	}

	if (!Array.isArray(segmentIds) || segmentIds.length === 0) {
		return json({ error: 'segmentIds must be a non-empty array' }, { status: 400 });
	}

	if (!segmentIds.every((id) => typeof id === 'string' && id)) {
		return json({ error: 'segmentIds must contain only non-empty strings' }, { status: 400 });
	}

	const safeCustomerId = escapeGraphqlString(customerId);
	const safeSegmentIds = segmentIds.map((id) => `"${escapeGraphqlString(id)}"`).join(', ');

	const result = await shopify.query({
		data: `
			query {
				customerSegmentMembership(
					customerId: "${safeCustomerId}",
					segmentIds: [${safeSegmentIds}]
				) {
					memberships {
						segmentId
						isMember
					}
				}
			}
		`
	});

	if (result.errors?.length) {
		return json({ error: result.errors }, { status: 502 });
	}

	const memberships: Record<string, boolean> = {};
	for (const membership of result.data?.customerSegmentMembership?.memberships ?? []) {
		memberships[membership.segmentId] = membership.isMember;
	}

	return json({ memberships });
};
