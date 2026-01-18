import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getCustomerOrderSequenceSankeyData } from '$lib/services/database'

export const GET: RequestHandler = async ({ setHeaders }) => {
  const sankeyData = await getCustomerOrderSequenceSankeyData();

  setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  return json({
    data: sankeyData
  });
}
