<script>
  import { onMount } from "svelte";
  import ContainerLayout from "$lib/ContainerLayout.svelte";
  import Select from "$lib/Select.svelte";
  import StackedBar from "$lib/StackedBar.svelte";
  import {
    energy_footprint_per_kwh,
    energy_source_efficiency,
  } from "$lib/energy/energy.js";

  import { chart } from "$lib/chart";
  import Chart from "$lib/Chart.svelte";
  import Toggle from "$lib/Toggle.svelte";

  import {
    chartColors,
    redColors,
    grayColors,
    dec,
    descendingOnKey,
  } from "$lib/utils";
  import { stringify } from "postcss";

  let energyMix = {};
  let entities = [];
  let selected = null;

  let year = "2019";

  let chartEl;

  let series = {};

  let chartData = null;

  let barData = null;

  let latestYear = null;

  let items = [];

  onMount(async () => {
    const response = await fetch(
      "/resources/ourworldindata-energy-mix-per-capita.json"
    );
    const data = await response.json();
    energyMix = data;
    entities = energyMix.entities.map((entity) => [entity, entity]);
    selected = entities[0][0];

    // for (const [year, year_value] of Object.entries(energyMix.data[country])) {
    //   for (const [key, value] of Object.entries(year_value)) {
    //     if (key === "total") continue;
    //     if (!(key in d)) d[key] = [];
    //     d[key].push(value.a);
    //   }
    // }

    const _items = [];
    latestYear = energyMix.years[energyMix.years.length - 1];

    for (const [country, country_value] of Object.entries(energyMix.data)) {
      const lastItem = country_value[latestYear];
      const values = {};
      for (const source of energyMix.sources) {
        values[source] = lastItem[source];
      }
      _items.push({
        country,
        total: lastItem.total,
        values,
      });
    }

    _items.sort(descendingOnKey("total"));
    items = _items;

    const barSeries = [];
    for (const entity of energyMix.entities) {
      let total = 0;
      const d = {
        oil: Math.floor(Math.random() * 10),
        coal: Math.floor(Math.random() * 10),
        gas: Math.floor(Math.random() * 10),
        nuclear: Math.floor(Math.random() * 10),
        hydro: Math.floor(Math.random() * 10),
        wind: Math.floor(Math.random() * 10),
        solar: Math.floor(Math.random() * 10),
      };

      for (const value of Object.values(d)) {
        total += value;
      }

      d.total = total;
      d.key = entity;

      barSeries.push(d);
    }

    barSeries.sort(descendingOnKey("total"));

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

  function chData(country) {
    const d = {};
    for (const [year, year_value] of Object.entries(energyMix.data[country])) {
      for (const [key, value] of Object.entries(year_value)) {
        if (key === "total") continue;
        if (!(key in d)) d[key] = [];
        d[key].push(value.a);
      }
    }

    return {
      type: "area",
      title: `Energy usage mixture of, ${country}`,
      description: "Some description",
      source: "Calculations",
      series: d,
      x: energyMix.years,
      xlabel: "Year",
      ylabel: "TWh",
    };
  }

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

  let showDetails = {};
  function toggleDetails(c) {
    showDetails[c] = !showDetails[c];
  }

  function bData(value) {
    return {
      coal: value["coal"],
      gas: value["gas"],
      hydro: value["hydro"],
      nuclear: value["nuclear"],
      oil: value["oil"],
      solar: value["solar"],
      wind: value["wind"],
    };
  }

  function unpack(dict, on) {
    const d = {};
    for (const [key, value] of Object.entries(dict)) {
      d[key] = value[on];
    }
    return d;
  }
</script>

<ContainerLayout>
  <div class="prose lg:prose-lg prose-slate">
    <h1>Energy footprint</h1>

    <div>per capita = per person</div>
    <div>per country</div>
    <table
      class="not-prose border-collapse table-fixed divide-y divide-gray-200"
    >
      <thead class="bg-gray-100">
        <th>Country</th>
        <th>Energy mixture</th>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#if energyMix.entities}
          {#each items as item}
            <tr
              class="cursor-pointer"
              on:click={() => toggleDetails(item.country)}
            >
              <td class="py-1">{item.country}</td>
              <td class="py-1">
                <div class="mb-1">
                  <StackedBar
                    values={unpack(item.values, "armr")}
                    colors={chartColors}
                  />
                </div>
                <div class="opacity-50">
                  <StackedBar
                    height="h-1"
                    values={unpack(item.values, "armr")}
                    colors={grayColors.slice(1).slice(-5)}
                  />
                </div>
              </td>
            </tr>
            {#if showDetails[item.country]}
              <tr class="">
                <td colspan="2">
                  <div class="p-5">
                    <div class="mb-5">
                      <StackedBar
                        values={unpack(item.values, "armr")}
                        colors={chartColors}
                      />
                    </div>
                    <div class="mb-5">
                      <StackedBar
                        values={unpack(item.values, "armr")}
                        colors={grayColors.slice(1).slice(-5)}
                      />
                    </div>
                    <div>
                      <Chart data={chData(item.country)} />
                    </div>
                  </div>
                </td>
              </tr>
            {/if}
          {/each}
        {/if}
      </tbody>
    </table>

    <h2>Energy usage mixture per capita</h2>
    <div class="not-prose">
      <Select text="Capita" bind:selected options={entities} />
    </div>

    {#if selected}
      <Chart data={chartData} />
    {/if}

    <h2>Per capita energy usage by source, 2019</h2>
    <!-- {#if energyMix.entities}
      <Chart data={barData} />
    {/if} -->

    <h2>Energy source efficiency</h2>
    <ul>
      {#each Object.entries(energy_source_efficiency) as [key, value]}
        <li>
          <div>name: {key}</div>
          <div>efficiency: {value}%</div>
        </li>
      {/each}
    </ul>

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
