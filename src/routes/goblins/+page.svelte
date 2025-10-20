<script lang="ts">
  import { type Material, type Project } from '$lib/clients/schema'
  import { money, relativeDate, roundToDecimals } from '$lib/formatters'
  import { invalidateAll } from '$app/navigation'

  let { data } = $props()

</script>

<section class="flex flex--column">
  {#each data.goblins as goblin}
  <a href="/goblins/{goblin.id}" class="goblin">{goblin.name}</a>
  {/each}
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: row;
    min-height: calc(100svh - 100px);

    .goblin {
      padding: $s0;
      border-top: 1px solid $grey;
      width: 100%;
      text-align: center;

      &:hover,
      &:focus-visible {
        background-color: rgba($gris-pale, 0.5);
      }
    }
  }
</style>
