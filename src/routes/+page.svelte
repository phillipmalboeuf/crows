<script lang="ts">
  import MaterialsPage from './materials/+page.svelte'

  let { data } = $props()
</script>

<MaterialsPage {data} />
