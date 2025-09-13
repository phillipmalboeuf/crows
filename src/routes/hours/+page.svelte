<script lang="ts">
  import { type Material, type Project } from '$lib/clients/schema'
  import { money, relativeDate, roundToDecimals } from '$lib/formatters'
  import type { LineItem } from '$lib/services/orders'

  let { data } = $props()

  let { projects, totals } = $derived.by(() => {

    let totals = {
      hours: 0,
    }


    // Iterate through all orders and their line items
    return {
      projects: data.orders.flatMap(order => {
        return order.lineItems.flatMap((lineItem, index) => {
          // Find the variant for this line item
          const variant = data.variants[lineItem.variant?.product.id]
          if (variant && variant.projects) {
            const both = lineItem.variant.title.includes('Both') || lineItem.variant.title.includes('Pair')
            // Add all project IDs from this variant
            return variant.projects.map(projectId => {
              const hours = data.projects[projectId]?.hours ? data.projects[projectId]?.hours * lineItem.quantity * (both ? 2 : 1) : 0
              totals.hours += hours
              return {
                orderId: order.id,
                order: order.name,
                created: order.createdAt,
                lineItem: lineItem.title + (lineItem.variant?.title ? ' – ' + lineItem.variant?.title : ''),
                quantity: lineItem.quantity,
                project: data.projects[projectId]?.name,
                hours,
                skills: data.projects[projectId]?.skills,
                first: index === 0
              }
            })
          }
          return {
            orderId: order.id,
            order: order.name,
            created: order.createdAt,
            lineItem: lineItem.title + (lineItem.variant?.title ? ' – ' + lineItem.variant?.title : ''),
            quantity: lineItem.quantity,
            project: null as string,
            hours: null as number,
            skills: null as Array<string>,
            first: index === 0
          }
        })
      }),
      totals
    }
  })
</script>

<table>
  <thead>
    <tr>
      <th>Order</th>
      <!-- <th>Customer</th> -->
      <th>Created</th>
      <th>Item</th>
      <th>Quantity</th>
      <th>Project</th>
      <th>Hours</th>
      <th>Skills</th>
    </tr>
  </thead>
  <tbody>
    {#each projects as project}
      <tr>
        <td>{#if project.first}<a href="https://admin.shopify.com/store/foxes-and-ravens/orders/{project.orderId.split('/Order/')[1]}" target="_blank">{project.order}</a>{/if}</td>
        <td>{#if project.first}{relativeDate(project.created)}{/if}</td>
        <td>{project.lineItem}</td>
        <td>{project.quantity}</td>
        <td>{project.project}</td>
        <td>{project.hours ? project.hours : ''}</td>
        <td>{project.skills ? project.skills.join(', ') : ''}</td>
      </tr>
    {/each}
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{roundToDecimals(totals.hours, 2)}</td>
      <td></td>
    </tr>
  </tfoot>
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
