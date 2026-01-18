<script lang="ts">
  import { type Material, type Project } from '$lib/clients/schema'
  import { money, relativeDate, roundToDecimals } from '$lib/formatters'
  import { getLocale } from '$lib/paraglide/runtime';
  import type { LineItem } from '$lib/services/orders'

  let { data } = $props()
</script>

<table>
  <thead>
    <tr>
      <th>{getLocale() === 'fr' ? 'Commande' : 'Order'}</th>
      <!-- <th>Customer</th> -->
      <th>{getLocale() === 'fr' ? 'Créée' : 'Created'}</th>
      <th>Item</th>
    </tr>
  </thead>
  <tbody>
    {#each data.orders as order}
      <tr>
        <td>{order.name}</td>
        <td>{relativeDate(order.createdAt)}</td>
      </tr>
    {/each}
  </tbody>
  <!-- <tfoot>
    <tr>
      <td>Total</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tfoot> -->
</table>

<!-- <h1>Crow’s Nest</h1> -->

<style lang="scss">
  table {
    // table-layout: fixed;
    // border-collapse: collapse;

    td, th {
      border: 1px solid $grey;
      min-width: 200px;
      // box-shadow: 0px 0px 20px $grey inset;
    }

    th {
      vertical-align: bottom;
    }

    tbody {
      tr {
        &:hover {
          background-color: rgba($gris-pale, 0.5);
        }
      }
    }
    
    thead,
    tfoot {
      position: sticky;
      top: 0;
      z-index: 2;

      td, th {
        background-color: $blanc;
        // border: 1px solid $grey;
      }
    }

    tfoot {
      top: auto;
      bottom: 0;
    }
  }
</style>
