import { getCustomerOrderSequenceSankeyData, getDatabaseOrders } from '$lib/services/database';


export const load = async ({ request }) => {
  const [sankeyData] = await Promise.all([
    getCustomerOrderSequenceSankeyData(),
    // getDatabaseOrders()
  ])
  
  return {
    sankeyData,
  }
}