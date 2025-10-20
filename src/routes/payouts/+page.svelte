<script lang="ts">
  import { type Material, type Project } from '$lib/clients/schema'
  import { money, relativeDate, roundToDecimals } from '$lib/formatters'
  import type { LineItem } from '$lib/services/orders'
  import { invalidateAll } from '$app/navigation'

  let { data } = $props()


  let { orders, totals, assignedSubtotals } = $derived.by(() => {

    let totals = {
      // hours: 0,
      // assignedHours: 0,
      // readyHours: 0,
      totalSubtotalPrice: 0,
      totalReady: 0,
    }

    let assignedSubtotals = data.goblins.reduce((acc, goblin) => {
      acc[goblin.id] = 0
      return acc
    }, {} as Record<string, number>)

    // Iterate through all orders and their line items
    return {
      orders: data.unpaidOrders.flatMap(order => {
        totals.totalReady += order.ready ? 1 : 0;
        totals.totalSubtotalPrice += data.orders[order.order]?.subtotalPrice;
        assignedSubtotals[order?.goblin?.key] += data.orders[order.order]?.subtotalPrice;

        return {
          orderId: order.order,
          order: order.order,
          // tags: order.tags,
          // created: order.createdAt,
          ready: order.ready,
          paid: order.paid,
          goblin: order.goblin?.key,
          subtotalPrice: data.orders[order.order]?.subtotalPrice,
        }
      }),
      totals,
      assignedSubtotals
    }
  })

  async function updateOrder(name: string, goblin: string) {
    await fetch(`/api/orders`, {
      method: 'PUT',
      body: JSON.stringify({ name, goblin })
    })
    await invalidateAll()
  }

  async function updateOrderReady(name: string, ready: boolean) {
    await fetch(`/api/orders`, {
      method: 'PUT',
      body: JSON.stringify({ name, ready })
    })
    await invalidateAll()
  }
  async function updateOrderPaid(name: string, paid: boolean) {
    await fetch(`/api/orders`, {
      method: 'PUT',
      body: JSON.stringify({ name, paid })
    })
    await invalidateAll()
  }
</script>

<section>
<table>
  <thead>
    <tr>
      <th class="td--small">Order</th>
      <!-- <th>Customer</th> -->
      <!-- <th class="td--small">Created</th>
      <th>Tags</th> -->
      <th>Goblin</th>
      <th class="td--small">Ready</th>
      <th class="td--small">Paid</th>
      <th>Subtotal</th>
    </tr>
  </thead>
  <tbody>
    {#each orders as order}
      <tr>
        <td class="td--small"><a href="https://admin.shopify.com/store/foxes-and-ravens/orders/{order.orderId.split('/Order/')[1]}" target="_blank">{order.order}</a></td>
        <!-- <td class="td--small">{relativeDate(order.created)}</td>
        <td>{order.tags ? order.tags.join(', ') : ''}</td> -->
        <td>{order.goblin}</td>
        <td class="td--small td--checkbox">
          <input type="checkbox" checked={order.ready} oninput={(e) => updateOrderReady(order.order, e.currentTarget.checked)}>
        </td>
        <td class="td--small td--checkbox">
          <input type="checkbox" checked={order.paid} oninput={(e) => updateOrderPaid(order.order, e.currentTarget.checked)}>
        </td>
        <td class="mono">{money(order.subtotalPrice)}</td>
      </tr>
    {/each}
  </tbody>
  <tfoot>
    <tr>
      <td class="td--small">Total</td>
      <!-- <td class="td--small"></td>
      <td></td> -->
      <td></td>
      <td class="td--small td--progress" style:--progress={totals.totalReady / data.unpaidOrders.length}><span>{totals.totalReady} / {data.unpaidOrders.length}</span></td>
      <td class="td--small td--progress"></td>
      <td class="mono">{money(totals.totalSubtotalPrice)}</td>
    </tr>
  </tfoot>
</table>

<table class="goblins">
  <thead>
    <tr>
      <th>Goblin</th>
      <th>Total Payout</th>
      <!-- <th>Skills</th> -->
    </tr>
  </thead>
  <tbody>
    {#each data.goblins as goblin}
      <tr>
        <td>{goblin.name}</td>
        <td class="mono">{money(assignedSubtotals[goblin.id] * 0.15)}</td>
      </tr>
    {/each}
  </tbody>
</table>
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: row;
  }

  table {
    // table-layout: fixed;
    // border-collapse: collapse;

    &.goblins {
      position: sticky;
      right: 0;
      top: 0;
      z-index: 2;
      background-color: $blanc;
      height: fit-content;
      box-shadow: -10px 10px 20px $grey;

      td.alert {
        background-color: rgba($rouge, 0.333);
      }
    }

    td, th {
      border: 1px solid $grey;
      min-width: 200px;
      // box-shadow: 0px 0px 20px $grey inset;
    }

    th {
      vertical-align: bottom;
    }

    td,
    th {
      &.td--small {
        min-width: 100px;
      }

      &.td--checkbox {
        padding: $s0;
      }
    }

    td.td--progress {
      position: relative;

      span {
        position: relative;
        z-index: 1;
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        display: block;
        width: calc(var(--progress) * 100%);
        height: 100%;
        background: linear-gradient(to right, rgba($rouge, 0.5), rgba($jaune, 0.5), rgba($bleu, 0.5), rgba($vert, 0.5));
        background-size: 200px 100%;
      }

      &.td--small {
        &:before {
          background-size: 100px 100%;
        }
      }
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
