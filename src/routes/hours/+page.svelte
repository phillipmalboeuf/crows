<script lang="ts">
  import { type Material, type Project } from '$lib/clients/schema'
  import { money, relativeDate, roundToDecimals } from '$lib/formatters'
  import type { LineItem } from '$lib/services/orders'
  import { invalidateAll } from '$app/navigation'

  let { data } = $props()

  const skillsKeys = [
    "Snaps",
    "Staples",
    "Cutting_Soft_Leather",
    "Dryad_Bark_Carving",
    "Belt_Roller",
    "Cutting_Veg_Tan",
    "Saddle_Stitch",
    "X_Stitch",
    "Machine_Sewing",
    "Complex_Assembly",
    "Hand_Stamping",
    "Press_Stamping",
    "Tooling_Lines",
    "Stain_Shading",
    "Tooling_Lines_with_Bevels",
    "Sheridanstyle_Tooling",
  ]

  let { projects, totals, assignedHours, assignedskills } = $derived.by(() => {

    let totals = {
      hours: 0,
    }

    let assignedHours = data.goblins.reduce((acc, goblin) => {
      acc[goblin.id] = 0
      return acc
    }, {} as Record<string, number>)

    let assignedskills = data.goblins.reduce((acc, goblin) => {
      acc[goblin.id] = {}
      return acc
    }, {} as Record<string, { [skill: string]: boolean }>)

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
              totals.hours += hours;
              if (data.assignments[order.name]?.goblin?.key) {
                assignedHours[data.assignments[order.name]?.goblin?.key] += hours;
                if (data.projects[projectId]?.skills) {
                  data.projects[projectId]?.skills.forEach(skill => {
                    assignedskills[data.assignments[order.name]?.goblin?.key][skill] = true
                  })
                }
              }
              
              return {
                orderId: order.id,
                order: order.name,
                created: order.createdAt,
                lineItem: lineItem.title + (lineItem.variant?.title ? ' – ' + lineItem.variant?.title : ''),
                quantity: lineItem.quantity,
                goblin: data.assignments[order.name]?.goblin?.key,
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
            goblin: data.assignments[order.name]?.goblin?.key,
            project: null as string,
            hours: null as number,
            skills: null as Array<string>,
            first: index === 0
          }
        })
      }),
      totals,
      assignedHours,
      assignedskills
    }
  })

  async function updateOrder(name: string, goblin: string) {
    await fetch(`/api/orders`, {
      method: 'PUT',
      body: JSON.stringify({ name, goblin })
    })
    await invalidateAll()
  }
</script>

<section>
<table>
  <thead>
    <tr>
      <th>Order</th>
      <!-- <th>Customer</th> -->
      <th>Created</th>
      <th>Goblin</th>
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
        <td>
          {#if project.first}
          <select oninput={(e) => updateOrder(project.order, e.currentTarget.value)}>
            <option value=""></option>
            {#each data.goblins as goblin}
              <option value={goblin.id} selected={project.goblin === goblin.id}>{goblin.name}</option>
            {/each}
          </select>
          {/if}
        </td>
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
      <td></td>
      <td>{roundToDecimals(totals.hours, 2)}</td>
      <td></td>
    </tr>
  </tfoot>
</table>

<table class="goblins">
  <thead>
    <tr>
      <th>Goblin</th>
      <th>Hours</th>
      <th>Skills</th>
    </tr>
  </thead>
  <tbody>
    {#each data.goblins as goblin}
      <tr>
        <td>{goblin.name}</td>
        <td class:alert={assignedHours[goblin.id] > goblin.available_hours}>{assignedHours[goblin.id]} / {goblin.available_hours}</td>
        <td class="skills">
          {#each skillsKeys.map(skill => goblin[skill]) as skill, index}
          <!-- {skillsKeys[index].replaceAll('_', ' ')} -->
          
          <div title={skillsKeys[index].replaceAll('_', ' ')} class="skill--{skill}" class:active={assignedskills[goblin.id][skillsKeys[index].replaceAll('_', ' ')]} style:--top={`${100 * (skill / 3)}%`}></div>
          {/each}
        </td>
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

      td.skills {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        height: 100%;
        padding: 0;

        div {
          position: relative;
          flex: 1;
          height: 100%;
          
          &:after {
            content: '';
            border-top: 1px solid $noir;
            position: absolute;
            bottom: var(--top);
            left: 0;
            width: 100%;
          }

          &.active {
            background-color: rgba($bleu, 0.5);

            &.skill--0 {
              background-color: rgba($rouge, 0.5);
            }

            &.skill--1 {
              background-color: rgba($jaune, 0.5);
            }

            &.skill--3 {
              background-color: rgba($vert, 0.5);
            }
          }
        }
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
