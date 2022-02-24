<script>
  import { onMount } from "svelte";
  import ContainerLayout from "$lib/ContainerLayout.svelte";
  import Select from "$lib/Select.svelte";

  import { chart } from "$lib/chart";
  import Chart from "$lib/Chart.svelte";

  let energyMix = {};
  let entities = [];
  let selected = null;

  let year = "2019";

  let chartEl;

  let series = {};

  let chartData = null;

  onMount(async () => {
    const response = await fetch(
      "/resources/ourworldindata-energy-mix-per-capita.json"
    );
    const data = await response.json();
    energyMix = data;
    entities = energyMix.entities.map((entity) => [entity, entity]);
    selected = entities[0][0];

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
      title: `Energy mixture of ${selected}`,
      series: series,
      x: energyMix.years,
      xlabel: "year",
      ylabel: "TWh",
      margin: { top: 60, right: 230, bottom: 50, left: 50 },
      width: 660,
      height: 400,
    };
  }
</script>

<ContainerLayout>
  <div class="prose lg:prose-lg prose-slate">
    <div class="text-7xl font-bold text-gray-900 mb-20">Energy footprint</div>

    <h1>Energy mixture per capita</h1>
    <div class="not-prose">
      <Select text="Capita" bind:selected options={entities} />
    </div>

    {#if energyMix.data}
      <ul>
        {#each Object.entries(energyMix.data[selected][year]) as [key, value]}
          {#if key === "total"}
            <li>Total: {value}</li>
          {:else}
            <li>{key}: {value.a} TWh = {value.pr}%</li>
          {/if}
        {/each}
      </ul>
    {/if}

    {#if selected}
      <Chart data={chartData} />
    {/if}

    <!-- <div class="not-prose">
      <div
        style="position: relative;"
        class="bg-white shadow ring-1 ring-gray-900 ring-opacity-5 rounded"
      >
        <div class="flex items-center border-b border-gray-200 mb-3 p-3">
          <div class="grow">
            <div class="leading-none text-gray-900 mb-1">
              Travel impact over distance
            </div>
            <div class="text-sm max-w-lg">Some description</div>
          </div>
          <div class="flex-none">
            <img src="/whatsgreener-logo-site.png" alt="" width="125" />
          </div>
        </div>

        <div bind:this={chartEl} class="relative p-3" />
        <div class="pl-3 pb-3 text-xs">
          <div>Source: <a href="/calculations">Calculations</a></div>
          <div>Note: Something</div>
        </div>
      </div>
    </div> -->

    <h2>All sources</h2>
    <ul>
      <li>Coal</li>
      <li>Natural gas</li>
      <li>Nuclear</li>
      <li>Hydro</li>
      <li>Geothermal</li>
      <li>Wind</li>
      <li>Solar</li>
      <li>Tide/Wave/Ocean</li>
      <li>Biofuels and waste</li>
      <li>Oil</li>
    </ul>
  </div>
</ContainerLayout>
