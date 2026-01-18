<script lang="ts">
  import { type Material, type Project } from '$lib/clients/schema'
  import { money, relativeDate, roundToDecimals } from '$lib/formatters'
  import { getLocale } from '$lib/paraglide/runtime';
  import type { LineItem } from '$lib/services/orders'

  let { data } = $props()
</script>

<pre>{JSON.stringify(data.sankeyData, null, 2)}</pre>


<style lang="scss">
</style>
