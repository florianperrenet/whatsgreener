<script>
  import { onMount } from "svelte";
  import ContainerLayout from "$lib/ContainerLayout.svelte";
  import Select from "$lib/Select.svelte";
  import {
    energy_footprint_per_kwh,
    energy_source_efficiency,
  } from "$lib/energy/energy.js";

  import { chart } from "$lib/chart";
  import Chart from "$lib/Chart.svelte";
  import Toggle from "$lib/Toggle.svelte";

  let energyMix = {};
  let entities = [];
  let selected = null;

  let year = "2019";

  let chartEl;

  let series = {};

  let chartData = null;

  let barData = null;

  onMount(async () => {
    const response = await fetch(
      "/resources/ourworldindata-energy-mix-per-capita.json"
    );
    const data = await response.json();
    energyMix = data;
    entities = energyMix.entities.map((entity) => [entity, entity]);
    selected = entities[0][0];

    const barSeries = {};
    for (const entity of energyMix.entities) {
      barSeries[entity] = Math.floor(Math.random() * 100);
    }

    barData = {
      type: "bar_vertical",
      title: `Country impact scoring`,
      description: "Some description",
      source: "Calculations",
      series: barSeries,
      x: 100,
      height: 1200,
      xlabel: "Year",
      ylabel: "TWh",
    };

    // chart({
    //   el: chartEl,
    //   series: series,
    //   x: energyMix.years,
    //   xlabel: "year",
    //   ylabel: "TWh",
    //   margin: { top: 60, right: 230, bottom: 50, left: 50 },
    //   width: 660,
    //   height: 400,
    // });
  });

  $: if (selected) {
    const d = {};
    for (const [year, year_value] of Object.entries(energyMix.data[selected])) {
      for (const [key, value] of Object.entries(year_value)) {
        if (key === "total") continue;
        if (!(key in d)) d[key] = [];
        d[key].push(value.a);
      }
    }

    series = d;

    chartData = {
      type: "area",
      title: `Energy usage mixture of, ${selected}`,
      description: "Some description",
      source: "Calculations",
      series: series,
      x: energyMix.years,
      xlabel: "Year",
      ylabel: "TWh",
    };
  }
</script>

<ContainerLayout>
  <div class="prose lg:prose-lg prose-slate">
    <h1>Energy footprint</h1>

    <h2>Energy usage mixture per capita</h2>
    <div class="not-prose">
      <Select text="Capita" bind:selected options={entities} />
    </div>

    {#if selected}
      <Chart data={chartData} />
    {/if}

    <h2>Per capita energy usage by source, 2019</h2>
    {#if energyMix.entities}
      <Chart data={barData} />
    {/if}

    <h2>Footprint to produce 1kwh per source</h2>
    <!-- source footprint per kwh -->

    {#each Object.values(energy_footprint_per_kwh()) as source}
      <div>
        <div>name: {source.name}</div>
        <div>impact: {source.impact}</div>
        <div>cost: &euro;xx</div>
        <hr />
      </div>
    {/each}

    <h2>Energy source efficiency</h2>
    <Toggle text="toggle">
      {#each Object.entries(energy_source_efficiency) as [key, value]}
        <div>
          <div>name: {key}</div>
          <div>efficiency: {value}%</div>
          <hr />
        </div>
      {/each}
    </Toggle>

    <!-- cost -->
    <h2>Country impact scoring</h2>

    <div>Worst score possible is: xx</div>
    {#if energyMix.entities}
      <Chart data={barData} />
    {/if}

    <h2>Energy sources</h2>
    <ul>
      <li>Oil</li>
      <li>Coal</li>
      <li>Natural gas</li>
      <li>Nuclear</li>
      <li>Hydro</li>
      <li>Wind</li>
      <li>Solar</li>

      <li />
      <li>Geothermal</li>
      <li>Tide/Wave/Ocean</li>
      <li>Biofuels and waste</li>
    </ul>
  </div>
</ContainerLayout>
