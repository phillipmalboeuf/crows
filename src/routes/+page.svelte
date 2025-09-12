<script lang="ts">
  import { type Material, type Project } from '$lib/clients/schema'
  import { money, relativeDate, roundToDecimals } from '$lib/formatters'
  import type { LineItem } from '$lib/services/orders'

  let { data } = $props()

  let { projects, totals } = $derived.by(() => {

    let totals = {
      cost: 0,
      materials: data.materialsList.reduce<Record<string, { totalAmounts: {[option: string]: number} }>>((acc, material) => {
        acc[material.id] = {
          totalAmounts: {},
          // totalCost: 0,
        }
        return acc;
      }, {} as Record<string, { totalAmounts: {[option: string]: number} }>)
    }


    // Iterate through all orders and their line items
    return {
      projects: data.orders.flatMap(order => {
        return order.lineItems.flatMap((lineItem, index) => {
          // Find the variant for this line item
          const variant = data.variants[lineItem.variant?.product.id]
          if (variant && variant.projects) {
            const both = lineItem.variant.title.includes('Both')
            // Add all project IDs from this variant
            return variant.projects.map(projectId => {
              let cost = 0
              const materials = data.projects[projectId]?.materials.reduce((acc, material) => {
                const option = (lineItem.variant?.title && data.materials[material.material.key]?.options.find(option => lineItem.variant?.title.toLowerCase().includes(option.name))) || data.materials[material.material.key]?.options[0]
                const amount = roundToDecimals(material.amount * lineItem.quantity * (both ? 2 : 1), 3)
                acc[material.material.key] = {
                  ...material,
                  option,
                  amount
                }
                cost += roundToDecimals(amount * option.cost_per_unit, 2)
                totals.cost += roundToDecimals(amount * option.cost_per_unit, 2)
                totals.materials[material.material.key].totalAmounts[option.name] ? totals.materials[material.material.key].totalAmounts[option.name] = roundToDecimals(totals.materials[material.material.key].totalAmounts[option.name] + amount, 3) : totals.materials[material.material.key].totalAmounts[option.name] = amount
                return acc
              }, {} as Record<string, { amount: number; material: { key: string; }; option: { name: string; cost_per_unit: number } }>)
              return {
                orderId: order.id,
                order: order.name,
                created: order.createdAt,
                lineItem: lineItem.title + (lineItem.variant?.title ? ' – ' + lineItem.variant?.title : ''),
                quantity: lineItem.quantity,
                project: data.projects[projectId]?.name,
                materials,
                cost,
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
            materials: null as Record<string, { amount: number; material: { key: string; }; option: { name: string; cost_per_unit: number } }>,
            cost: null as number,
            first: index === 0
          }
        })
      }),
      totals
    }
  })
</script>

<!-- <pre>{JSON.stringify(data.variants, null, 2)}</pre>
<pre>{JSON.stringify(data.projects, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify(data.materials, null, 2)}</pre> -->

<!-- Debug: Show derived projects -->
<!-- <div>
  <h3>Projects from Order Line Items ({projects.length} total)</h3>
  <p>Orders: {data.orders.length}, Variants: {Object.keys(data.variants).length}, Projects: {Object.keys(data.projects).length}</p>
  <pre>{JSON.stringify(projects, null, 2)}</pre>
</div> -->

<!-- {#snippet item(lineItem: LineItem)}
<td>{lineItem.title}{lineItem.variant?.title ? ` – ${lineItem.variant?.title}` : ''}</td>
<td>{lineItem.quantity}</td>
<td>
  {#each data.variants[lineItem.variant?.product?.id]?.projects as project}
    {@render projects(data.projects[project])}
  {/each}
</td>
{/snippet}

{#snippet projects(project: Project)}
<td>{project.name}</td>
{/snippet} -->

<table>
  <thead>
    <tr>
      <th>Order</th>
      <!-- <th>Customer</th> -->
      <th>Created</th>
      <th>Item</th>
      <th>Quantity</th>
      <th>Project</th>
      {#each data.materialsList as material}
        <th>{material.name}</th>
      {/each}
      <th>Cost</th>
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
        {#each data.materialsList as material}
          <td class="mono">{#if project.materials && project.materials[material.id]?.amount}
            {project.materials[material.id]?.amount}<br>{project.materials[material.id]?.option?.name === 'default' ? '' : project.materials[material.id]?.option?.name}
            {/if}</td>
        {/each}
        <td class="mono">{money(project.cost)}</td>
      </tr>
    {/each}
    <!-- {#each data.orders as order}
      <tr>
        <td>{order.name}</td>
        <td>{relativeDate(order.createdAt)}</td>
        {@render item(order.lineItems[0])}
      </tr>
      {#if order.lineItems.length > 1}
      {#each order.lineItems.slice(1) as lineItem}
        <tr>
          <td></td>
          <td></td>
          {@render item(lineItem)}
        </tr>
      {/each}
      {/if}
    {/each} -->
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      {#each data.materialsList as material}
        <td class="mono">{#each Object.entries(totals.materials[material.id].totalAmounts) as [option, amount]}
          {amount} {option === 'default' ? '' : option}<br>
        {/each}</td>
      {/each}
      <td class="mono">{money(totals.cost)}</td>
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
