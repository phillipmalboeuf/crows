import { getCustomerOrderSequenceSankeyData, getCustomersWithMultipleOrders, getDatabaseOrders } from '$lib/services/database';


export const load = async ({ request }) => {
  const [sankeyData, customersWithMultipleOrders] = await Promise.all([
    getCustomerOrderSequenceSankeyData(),
    getCustomersWithMultipleOrders()
    // getDatabaseOrders()
  ])
  
  return {
    sankeyData,
    customersWithMultipleOrders
  }
}