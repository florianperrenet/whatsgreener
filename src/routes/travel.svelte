<script>
  import SidebarLayout from "$lib/SidebarLayout.svelte";
  import Input from "$lib/Input.svelte";
  import Select from "$lib/Select.svelte";
  import Toggle from "$lib/Toggle.svelte";
  import ImpactBar from "$lib/ImpactBar.svelte";
  import { diets, dietOptions, food, travel } from "$lib/vars";
  import { dec } from "$lib/utils";
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import LineChart from "$lib/charts/LineChart.svelte";

  const columns = [
    ["activity", "Activity", "text-left"],
    ["impact", "Impact", "text-center"],
    ["speed", "Speed", "text-center"],
    ["travel_time", "Travel time", "text-center"],
    ["ctt", "CTT", "text-right"],
    ["ctc", "CTC", "text-right"],
  ];

  const sortOptions = [];
  for (const col of columns) {
    sortOptions.push([col[0], col[1]]);
  }

  const sortDirections = ["ascending", "descending", "neutral"];

  function setSort(key) {
    if (key === base.sort) {
      base.sortDescending = !base.sortDescending;
    } else {
      base.sort = key;
      base.sortDescending = true;
    }
  }

  function ascending(a, b, key) {
    return a[key] - b[key];
  }
  function descending(a, b, key) {
    return b[key] - a[key];
  }

  function ascendingOnKey(key) {
    return function (a, b) {
      return a[key] - b[key];
    };
  }
  function descendingOnKey(key) {
    return function (a, b) {
      return b[key] - a[key];
    };
  }

  function sortValues(values, basedict) {
    const keymaps = {
      impact: "impact",
      speed: "speedKmh",
      travel_time: "travelTime",
      ctt: "ctt",
      ctc: "ctc",
    };
    if (basedict.sort in keymaps) {
      const key = keymaps[basedict.sort];
      return values.sort(
        basedict.sortDescending ? descendingOnKey(key) : ascendingOnKey(key)
      );
    }
    return basedict.sortDescending ? values : values.reverse();
  }

  const base = {
    distance: 1,
    weight: 70,
    diet: "meat_fish",
    sort: "impact",
    sortDescending: true,
  };

  function travelValues(basedict) {
    const values = Object.values(
      travel(basedict.distance, basedict.weight, basedict.diet)
    );
    return sortValues(values, basedict);
  }

  const showDetails = {};
  const showDetailIcon = {};

  function toggleDetails(activityName) {
    showDetails[activityName] = !showDetails[activityName];
  }
  function toggleDetailIcon(activityName) {
    showDetailIcon[activityName] = !showDetailIcon[activityName];
  }

  function hoursReadable(hours) {
    const fullhours = hours.floor();
    const minutes = hours.minus(fullhours).times(dec("60")).round();

    function withS(n) {
      if (n.eq(dec("1"))) return "";
      return "s";
    }

    const minuteStr = `${minutes} minute${withS(minutes)}`;
    const hourStr = `${fullhours} hour${withS(fullhours)}`;

    let str = "";
    let hoursadded = false;
    if (fullhours.gte(dec("1"))) {
      str += hourStr;
      hoursadded = true;
    }
    if (minutes.gte(dec("1"))) {
      if (hoursadded) str += " ";
      str += minuteStr;
    }

    return str;
  }

  const val = travel(dec("0"), dec("70"), "meat_fish");
  const chartcolumns = Object.values(val).map((v) => v.name);
  const chartrows = [];

  for (let distance = 0; distance < 1000; distance += 50) {
    const row = {
      distance: dec(distance),
    };

    const res = travel(dec(distance), dec("70"), "meat_fish");

    for (const [key, value] of Object.entries(res)) {
      row[value.name] = value.impact;
    }

    chartrows.push(row);
  }

  const data = {
    columns: chartcolumns,
    rows: chartrows,
  };
</script>

<svelte:head>
  <title>Travel</title>
</svelte:head>

<SidebarLayout>
  <div slot="sidebar">
    <Input
      text="Distance (km)"
      type="number"
      bind:value={base.distance}
      min="1"
    />
    <Input text="Weight (kg)" type="number" bind:value={base.weight} min="1" />
    <Select text="Diet" bind:selected={base.diet} options={dietOptions} />
    <Select text="Sort on" bind:selected={base.sort} options={sortOptions} />
    <hr class="mt-8 mb-4" />
    <Toggle text="Advanced">todo</Toggle>
  </div>
  <div slot="content">
    <div class="mb-10 text-4xl font-extrabold text-slate-900">Travel</div>
    <div class="lead">Usage impact</div>
    <!-- <div class="font-bold">Terminology</div>
    <div class="text-base b-5 mb-10">
      <div>
        <span class="font-medium">MET:</span>
        <a href="/calculations#ref-met">
          Metabolic Equivalent of Task (exercise intensity)
        </a>
      </div>
      <div>
        <span class="font-medium">WGI:</span>
        <a href="/calculations#impact_score">WhatsGreenerImpact</a>
      </div>
      <div>
        <span class="font-medium">RWGI:</span>
        <a href="/calculations#relativewhatsgreenerimpact"
          >RelativeWhatsGreenerImpact</a
        >
      </div>
      <div>
        <span class="font-medium">CTC:</span>
        <a href="/calculations#costtocompensate">CostToCompensate</a>
      </div>
      <div>
        <span class="font-medium">CTT:</span>
        <a href="/calculations#costtocompensate">CostToTravel</a>
      </div>
      <div>
        <span class="font-medium">carbon_eq:</span>
        <a href="/calculations#ref-co2-eq100">CO2-eq100</a>
      </div>
    </div> -->

    <div class="">
      <table class="not-prose border-collapse">
        <thead class="bg-gray-50">
          {#each columns as [key, name, align]}
            <th
              class="{align} {key === base.sort
                ? 'bg-gray-100'
                : ''} select-none hover:bg-gray-100 cursor-pointer p-3 tracking-wider text-xs font-medium text-gray-500 uppercase border-b border-gray-200"
              on:click={() => setSort(key)}
            >
              <div class="flex items-center">
                <div class="grow">{name}</div>
                {#if key === base.sort}
                  {#if base.sortDescending}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  {:else}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  {/if}
                {:else}
                  <svg
                    class="flex-none h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                {/if}
              </div>
            </th>
          {/each}
        </thead>
        <!-- {#each travelValues(base.distance, base.weight, base.diet, base.sort) as option} -->
        {#each travelValues(base) as option}
          <tbody
            class="hover:bg-gray-50 hover:cursor-pointer border-b border-gray-300"
          >
            <tr on:click={toggleDetails(option.name)}>
              <td class="font-medium pt-3 px-3">{option.name}</td>
              <td class="text-center pt-3 px-3">{option.impact.toFixed(2)}</td>
              <td class="text-center pt-3 px-3">{option.speedKmh} km/h</td>
              <td class="text-center pt-3 px-3">
                {option.travelTimeReadable}
              </td>
              <td class="text-right pt-3 px-3">&euro;{option.ctt.toFixed(2)}</td
              >
              <td class="text-right pt-3 px-3">&euro;{option.ctc.toFixed(2)}</td
              >
            </tr>
            <tr on:click={toggleDetails(option.name)}>
              <td colspan="6" class="px-3 pt-1 pb-4">
                <ImpactBar value={option.impact} />
              </td>
            </tr>

            {#if showDetailIcon[option.name]}
              <tr>
                <td colspan="6">down</td>
              </tr>
            {/if}

            {#if showDetails[option.name]}
              <tr>
                <td colspan="6" class="text-sm mb-5 pb-3 pt-2 px-3">
                  <Toggle text="score details">
                    <div class="mt-1 mb-2">
                      {#each Object.entries(option.rwgi) as [key, value]}
                        <div class="text-sm">
                          {value.toFixed(2)}x better than {key}
                        </div>
                      {/each}
                      <div class="h-2" />
                      {#each Object.entries(option.rtt) as [key, value]}
                        <div class="text-sm">
                          {value.toFixed(2)}x faster than {key}
                        </div>
                      {/each}
                    </div>
                  </Toggle>
                  <Toggle text="footprint details">
                    <div class="text-sm pl-10">
                      <div class="mb-2">
                        {#each Object.values(option.footprint) as value}
                          <div>{value.name} ({value.activity})</div>
                        {/each}
                      </div>
                      {#each ["consumesConv", "emitsConv"] as content}
                        <div>{content}</div>
                        {#each Object.values(option[content]) as value}
                          <div class="pl-5">
                            {value.name}
                            {#if value.state != null}
                              <span class="text-gray-500">{value.state}</span>
                            {/if}
                            : {value.amount.toFixed(value.finalPrecision)}
                            {#if value.unit != null}
                              <span class="text-sm">{value.unit}</span>
                            {/if}
                          </div>
                        {/each}
                      {/each}
                      {#each ["consumesEq", "emitsEq"] as content}
                        <div>{content}</div>
                        {#each Object.values(option[content]) as value}
                          <div class="pl-5">
                            {value.name}
                            {#if value.state != null}
                              <span class="text-gray-500">{value.state}</span>
                            {/if}
                            : {value.amount.toFixed(value.finalPrecision)}
                            {#if value.unit != null}
                              <span class="text-sm">{value.unit}</span>
                            {/if}
                          </div>
                        {/each}
                      {/each}
                    </div>
                  </Toggle>
                </td>
              </tr>
            {/if}
          </tbody>
        {/each}
      </table>
    </div>

    <div class="not-prose">
      <LineChart {data} xlabel="Distance" ylabel="Impact" />
    </div>
  </div>
</SidebarLayout>
