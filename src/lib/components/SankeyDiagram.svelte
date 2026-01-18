<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import type { SankeyDataPoint } from '$lib/services/database';

  let { data }: { data: SankeyDataPoint[] } = $props();

  let chartRoot: any = null;
  let chartContainer: HTMLDivElement;
  let series: any = null;

  onMount(async () => {
    if (!browser || !chartContainer || !data || data.length === 0) return;

    // Import amCharts only on the client side
    const am5 = await import('@amcharts/amcharts5');
    const am5flow = await import('@amcharts/amcharts5/flow');
    // const am5themes_Animated = (await import('@amcharts/amcharts5/themes/Animated')).default;

    // Create root element
    chartRoot = am5.Root.new(chartContainer);
    // chartRoot.setThemes([am5themes_Animated.new(chartRoot)]);

    // Create Sankey series
    series = chartRoot.container.children.push(
      am5flow.Sankey.new(chartRoot, {
        sourceIdField: 'from',
        targetIdField: 'to',
        valueField: 'value',
        paddingRight: 100,
        nodeWidth: 5,
        nodeAlign: "left"
      })
    );

    // Configure tooltips to follow mouse position
    series.links.template.setAll({
      tooltipPosition: "pointer"
    });

    // Set data
    series.data.setAll(data);

    // Remove amCharts copyright/logo
    if (chartRoot._logo) {
      chartRoot._logo.dispose();
    }

    // Animate appearance
    // series.appear(1000, 100);
  });

  onDestroy(() => {
    if (chartRoot) {
      chartRoot.dispose();
      chartRoot = null;
      series = null;
    }
  });
</script>

<div bind:this={chartContainer} id="sankey-chart-container"></div>

<style>
  #sankey-chart-container {
    width: 100%;
    height: 200svh;
    min-height: 400px;
  }
</style>
