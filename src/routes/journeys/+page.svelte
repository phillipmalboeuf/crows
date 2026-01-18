<script lang="ts">
  import { type Material, type Project } from '$lib/clients/schema'
  import { money, relativeDate, roundToDecimals } from '$lib/formatters'
  import { getLocale } from '$lib/paraglide/runtime';
  import type { LineItem } from '$lib/services/orders'
  import SankeyDiagram from '$lib/components/SankeyDiagram.svelte'

  let { data } = $props()
</script>

<SankeyDiagram data={data.sankeyData} />
<!-- <pre>{JSON.stringify(data.customersWithMultipleOrders, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify(data.sankeyData, null, 2)}</pre> -->


<style lang="scss">
</style>
