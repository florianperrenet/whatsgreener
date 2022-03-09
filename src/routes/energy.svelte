<script>
  import { onMount } from "svelte";
  import ContainerLayout from "$lib/ContainerLayout.svelte";
  import Select from "$lib/Select.svelte";
  import StackedBar from "$lib/StackedBar.svelte";
  import Input from "$lib/Input.svelte";
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
    descending,
    descendingOnKey,
    descendingOnKey2,
    descendingOnKey3,
  } from "$lib/utils";
  import { stringify } from "postcss";

  let energyMix = {};
  let entities = [];
  let selected = null;

  let _years = [];

  let tableYear = "2019";

  const energySources = [
    {
      name: "Oil",
      url: "/calculations#oil",
      img: "https://iea.imgix.net/32746c27-a6f7-44a4-bebc-3e8b15c07c7e/oil2012.png?auto=compress%2Cformat&fit=min&q=80&rect=1163%2C443%2C3087%2C2058&w=600&fit=crop&fm=jpg&q=70&auto=format&h=400",
    },
    {
      name: "Coal",
      url: "/calculations#coal",
      img: "https://iea.imgix.net/0f8115b4-76a4-4882-a441-5e46778d694f/shutterstock_1185961420.jpg?auto=compress%2Cformat&fit=min&q=80&rect=0%2C21%2C4048%2C2701&w=600&fit=crop&fm=jpg&q=70&auto=format&h=400",
    },
    {
      name: "Natural gas",
      url: "/calculations#natural gas",
      img: "https://iea.imgix.net/cf6d619d-e3e5-4fac-944b-7d9d7f4dded2/CoverGasMarketReport2022.jpg?auto=compress%2Cformat&fit=min&q=80&rect=0%2C0%2C4996%2C3326&w=600&fit=crop&fm=jpg&q=70&auto=format&h=399",
    },
    {
      name: "Nuclear",
      url: "/calculations#nuclear",
      img: "https://iea.imgix.net/1d5c97e0-168b-4631-93db-697540c71b7f/nuclear.jpg.jpg?auto=compress%2Cformat&fit=min&q=80&rect=0%2C0%2C3000%2C2000&w=1460&fit=crop&fm=jpg&q=70&auto=format&h=973",
    },
    {
      name: "Hydro",
      url: "/calculations#hydro",
      img: "https://iea.imgix.net/acded788-87f6-4092-bb2a-9ec1ed864d9f/shutterstock_475746370.jpg?auto=compress%2Cformat&fit=min&q=80&rect=0%2C0%2C3800%2C2533&w=600&fit=crop&fm=jpg&q=70&auto=format&h=400",
      // img: "https://iea.imgix.net/584bbbbc-879b-4854-aa75-1df457e9ea54/GettyImages-619758910.jpg?auto=compress%2Cformat&fit=min&q=80&rect=653%2C0%2C4681%2C3119&w=600&fit=crop&fm=jpg&q=70&auto=format&h=400",
    },
    {
      name: "Wind",
      url: "/calculations#wind",
      img: "https://iea.imgix.net/60dc2ee0-6d77-4812-8078-31210ed0b670/wind_tall.jpg?auto=compress%2Cformat&fit=min&q=80&rect=0%2C3062%2C4500%2C3006&w=1460&fit=crop&fm=jpg&q=70&auto=format&h=975",
    },
    {
      name: "Solar",
      url: "/calculations#solar",
      img: "https://iea.imgix.net/1d5c97e0-168b-4631-93db-697540c71b7f/solar.jpg.jpg?auto=compress%2Cformat&fit=min&q=80&rect=0%2C0%2C3000%2C2000&w=1460&fit=crop&fm=jpg&q=70&auto=format&h=973",
    },
    {
      name: "Geothermal",
      url: "/calculations#geothermal",
      img: "https://iea.imgix.net/1d5c97e0-168b-4631-93db-697540c71b7f/other_renewables.jpg.jpg?auto=compress%2Cformat&fit=min&q=80&rect=0%2C0%2C3000%2C2000&w=1460&fit=crop&fm=jpg&q=70&auto=format&h=973",
    },
    {
      name: "Tide/Wave/Ocean",
      url: "/calculations#tide/wave/ocean",
      img: "https://images.unsplash.com/photo-1508624217470-5ef0f947d8be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Biofuels and waste",
      url: "/calculations#biofuels and waste",
      img: "https://images.unsplash.com/photo-1567547921486-f280c2f53b5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  ];

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
    const __years = energyMix.years.slice(1).reverse();
    _years = __years.map((year) => [year, year]);

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
      const lastItem = country_value[tableYear];
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

  let highlightSource = null;
  let activeSource = null;

  function handleClick(source) {
    if (source === activeSource) {
      activeSource = null;
      // items = items.sort(descendingOnKey("total"));
      return;
    }

    activeSource = source;
  }

  function handleMouseOver(source) {
    highlightSource = source;
  }

  function handleMouseOut(e) {
    highlightSource = null;
  }

  let stackedBarKey = "armr";

  // let sortOnSource = null;
  // function sortOnSource(source) {
  //   items = items.sort(descendingOnKey2("values", source));
  // }

  function sortedItems(arr) {
    if (sortOnSource) {
      arr.sort(descendingOnKey2("values", sortOnSource));
    } else {
      arr.sort(descendingOnKey("total"));
    }

    return arr;
  }

  let tooltip;
  let arrow;

  let relative = false;
  function toggleRelative() {
    relative = !relative;
  }

  let filterCountry = null;

  $: getOpacity = (source) => {
    const isHighlighted = source === highlightSource;
    const isActive = source === activeSource;
    if (isActive) return 1;
    if (isHighlighted && activeSource) return 0.8;
    if (isHighlighted) return 1;
    if (!highlightSource && !activeSource) return 1;
    return 0.5;
  };

  $: sortOnSource = (source) => {
    if (source === null) {
      items = items.sort(descendingOnKey("total"));
    } else {
      items = items.sort(descendingOnKey3("values", source, stackedBarKey));
    }
  };

  // let filteredItems = null;

  // $: if (filterCountry === null) {
  //   filteredItems = items;
  //   const _items = [];
  //   for (const item of items) {
  //     if (item.country.startsWith(filterCountry)) {
  //       _items.push(item);
  //     }
  //   }

  //   items = _items;
  // }

  $: stackedBarKey = relative ? "pr" : "armr";
</script>

<ContainerLayout>
  <div class="max-w-container prose prose-slate lg:prose-lg">
    <h1>Energy footprint</h1>
    <!-- sources, efficiency, footprint, table -->

    <h2>Energy sources</h2>

    <div class="flex w-full snap-x gap-6 overflow-x-auto pb-5">
      {#each energySources as source, index}
        <div class="shrink-0 snap-center">
          <div
            class="relative h-60 w-96 shrink-0 overflow-hidden rounded-lg bg-white bg-cover bg-no-repeat shadow-lg"
            style="background-image: url('{source.img}');"
          >
            <div
              class="absolute inset-0 h-full w-full bg-gradient-to-b from-[rgba(0,0,0,.3)] to-[rgba(0,0,0,.1)]"
            >
              <!-- style="background-color: rgba(0,0,0,0.2);" -->
              <div class="p-5">
                <div class="mb-1 text-xs font-semibold text-gray-300">
                  {index + 1} / {energySources.length}
                </div>
                <div class="text-2xl font-bold text-white">{source.name}</div>
                <a
                  href={source.url}
                  class="absolute left-0 bottom-0 m-5 rounded-md bg-white py-2 px-3 text-xs font-medium no-underline"
                  >Everything about {source.name} -></a
                >
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <h2>Energy sources efficiency</h2>
    <!-- with btu example? -->
    <table class="not-prose">
      <thead>
        <th>Source</th>
        <th>Efficiency</th>
      </thead>
      <tbody>
        {#each Object.entries(energy_source_efficiency) as [key, value]}
          <tr>
            <td>{key}</td>
            <td>{value}%</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <h2>Energy sources scarcity</h2>
    <table class="not-prose">
      <thead>
        <th>Source</th>
        <!-- <th>Available</th> -->
        <th>Proven reserves</th>
        <th>Used</th>
        <th>Use rate</th>
        <th>Regain rate</th>
        <th>Left</th>
        <th>Time till depletion</th>
      </thead>
      <tbody>
        {#each Object.entries(energy_source_efficiency) as [key, value]}
          <tr>
            <td>{key}</td>
            <td>{value} xx</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <h2>Energy sources total energy supply</h2>

    <!-- <h2>Footprint to produce 1kwh per source</h2> -->
    <h2>Energy sources footprint to produce 1kwh</h2>
    <!-- source footprint per kwh -->

    {#each Object.values(energy_footprint_per_kwh()) as source}
      <div>
        <div>name: {source.name}</div>
        <div>impact: {source.impact}</div>
        <div>cost: &euro;xx</div>
        <hr />
      </div>
    {/each}

    <!-- <h2>Per capita energy usage by source, 2019</h2> -->
    <h2>Energy usage per country "per capita", {tableYear}</h2>

    <!-- legenda -->
    <!-- add on hover -->
    <!-- add on click -->
    <div class="mb-4 flex select-none flex-wrap gap-4">
      {#if energyMix.entities}
        {#each energyMix.sources as source, index}
          <div
            class="flex cursor-pointer items-center"
            style="opacity: {getOpacity(source)}"
            on:mouseenter={() => handleMouseOver(source)}
            on:mouseleave={handleMouseOut}
            on:click={() => handleClick(source)}
          >
            <div
              class="mr-2 h-2 w-2"
              style="background-color: {chartColors[index]};"
            />
            <span>{source}</span>
          </div>
        {/each}
      {/if}
    </div>

    <div class="not-prose">
      <Select text="Year" bind:selected={tableYear} options={_years} />
    </div>

    <div class="not-prose mb-4">
      <Input
        label="Filter on country"
        type="text"
        placeholder="country"
        bind:value={filterCountry}
        autocomplete={false}
      />
    </div>

    <div class="flex items-center gap-4">
      <button
        class="rounded-md border bg-white px-4 py-2 text-sm font-medium"
        on:click={sortOnSource(activeSource)}
      >
        Sort energy mixture descending {#if activeSource}on {activeSource}{/if}
      </button>
      <button
        class="rounded-md border bg-white px-4 py-2 text-sm font-medium"
        on:click={sortOnSource(activeSource)}
      >
        Sort actual impact descending {#if activeSource}on {activeSource}{/if}
      </button>

      <label class="inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          on:click={toggleRelative}
          class="
            h-3
            w-3
            rounded
            border-gray-300
            text-blue-600
            shadow-sm
            focus:ring-transparent
            "
        />
        <span class="ml-1">Relative</span>
      </label>

      <label class="inline-flex cursor-pointer select-none items-center">
        <!-- on:click={toggleRelative} -->
        <input
          type="checkbox"
          class="
            h-3
            w-3
            rounded
            border-gray-300
            text-blue-600
            shadow-sm
            focus:ring-transparent
            "
        />
        <span class="ml-1">Per capita</span>
      </label>
    </div>

    <table
      class="not-prose table-auto border-collapse divide-y divide-gray-200"
    >
      <thead class="bg-gray-100">
        <th
          class="cursor-pointer select-none border-b border-gray-200 p-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100"
          >Country</th
        >
        <th
          class="cursor-pointer select-none border-b border-gray-200 p-3 text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100"
          >Energy mixture / actual impact</th
        >
        <th
          class="cursor-pointer select-none border-b border-gray-200 p-3 text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100"
          >Amount</th
        >
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#if energyMix.entities}
          {#each items as item}
            {#if filterCountry === null || item.country.startsWith(filterCountry)}
              <tr
                class="cursor-pointer hover:bg-gray-100"
                on:click={() => toggleDetails(item.country)}
              >
                <td
                  class="whitespace-nowrap py-1 px-2 text-right"
                  style="width: 1%;">{item.country}</td
                >
                <td class="py-1 px-2">
                  <div class="mb-1">
                    <StackedBar
                      values={unpack(item.values, stackedBarKey)}
                      colors={chartColors}
                      highlightKey={highlightSource}
                      activeKey={activeSource}
                      title={item.country}
                      {tooltip}
                      {arrow}
                    />
                  </div>
                  <div class="opacity-50">
                    <StackedBar
                      height="h-1"
                      values={unpack(item.values, stackedBarKey)}
                      colors={grayColors.slice(1).slice(-5)}
                    />
                  </div>
                </td>
                <td
                  class="whitespace-nowrap py-1 px-2 text-xs"
                  style="width: 1%;"
                >
                  <div>{item.total.toFixed(2)} kwh</div>
                  <div class="opacity-50">80 points</div>
                </td>
              </tr>
              {#if showDetails[item.country]}
                <tr class="">
                  <td colspan="3">
                    <div class="p-5">
                      <div class="mb-5">
                        <StackedBar
                          values={unpack(item.values, stackedBarKey)}
                          colors={chartColors}
                        />
                      </div>
                      <div class="mb-5">
                        <StackedBar
                          values={unpack(item.values, stackedBarKey)}
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
            {/if}
          {/each}
        {/if}
      </tbody>
    </table>

    <!-- <h2>Energy usage mixture per capita</h2>
    <div class="not-prose">
      <Select text="Capita" bind:selected options={entities} />
    </div> -->

    <!-- {#if selected}
      <Chart data={chartData} />
    {/if} -->

    <!-- <h2>Per capita energy usage by source, 2019</h2> -->
    <!-- {#if energyMix.entities}
      <Chart data={barData} />
    {/if} -->

    <!-- <h2>Energy source efficiency</h2>
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

    <!-- {#each Object.values(energy_footprint_per_kwh()) as source}
      <div>
        <div>name: {source.name}</div>
        <div>impact: {source.impact}</div>
        <div>cost: &euro;xx</div>
        <hr />
      </div>
    {/each} -->

    <!-- cost -->
    <!-- <h2>Country impact scoring</h2>

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
-->
  </div>
</ContainerLayout>

<div
  class="pointer-events-none absolute hidden rounded-sm bg-white shadow-md"
  bind:this={tooltip}
>
  <div id="tooltip-html" class="p-3 text-xs" />
  <div
    class="absolute bg-white"
    style="width: 8px; height: 8px; transform: rotate(45deg);"
    bind:this={arrow}
  />
</div>
