<script>
  import SidebarLayout from "$lib/SidebarLayout.svelte";
  import Input from "$lib/Input.svelte";
  import Select from "$lib/Select.svelte";
  import Toggle from "$lib/Toggle.svelte";
  import ImpactBar from "$lib/ImpactBar.svelte";
  import { diets, food, travel } from "$lib/vars";
  import Decimal from "decimal.js";

  function dec(s) {
    return new Decimal(s);
  }

  const base = {
    distance: 1,
    weight: 70,
    diet: "meat_fish",
    sort: "Highest impact",
  };

  const sortOn = {
    "Lowest impact": (a, b) => {
      return a.impact - b.impact;
    },
    "Highest impact": (a, b) => {
      return b.impact - a.impact;
    },
    "Fastest travel time": (a, b) => {
      return a.travelTime - b.travelTime;
    },
  };

  function travelValues(distance, weight, diet, sort) {
    const values = Object.values(travel(distance, weight, diet));

    if (sort === "Lowest impact") return values.sort(sortOn["Lowest impact"]);
    else if (sort === "Highest impact")
      return values.sort(sortOn["Highest impact"]);
    else if (sort === "Fastest travel time")
      return values.sort(sortOn["Fastest travel time"]);

    return values;
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
    <Select
      text="Diet"
      bind:selected={base.diet}
      options={[...Object.keys(diets), "divider", ...Object.keys(food)]}
    />
    <Select
      text="Sort on"
      bind:selected={base.sort}
      options={[
        "Activity",
        "Fastest travel time",
        "Lowest impact",
        "Highest impact",
      ]}
    />
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
          <th
            class="p-3 tracking-wider text-xs font-medium text-gray-500 uppercase border-b border-gray-200"
            >Activity</th
          >
          <th
            class="p-3 tracking-wider text-xs font-medium text-gray-500 uppercase text-center border-b border-gray-200"
            >Impact</th
          >
          <th
            class="p-3 tracking-wider text-xs font-medium text-gray-500 uppercase text-center border-b border-gray-200"
            >Speed</th
          >
          <th
            class="p-3 tracking-wider text-xs font-medium text-gray-500 uppercase text-center border-b border-gray-200"
            >Travel time</th
          >
          <th
            class="p-3 tracking-wider text-xs font-medium text-gray-500 uppercase text-right border-b border-gray-200"
            >CTT</th
          >
          <th
            class="p-3 tracking-wider text-xs font-medium text-gray-500 uppercase text-right border-b border-gray-200"
            >CTC</th
          >
        </thead>
        {#each travelValues(base.distance, base.weight, base.diet, base.sort) as option}
          <tbody
            class="hover:bg-gray-50 hover:cursor-pointer border-b border-gray-300"
          >
            <tr on:click={toggleDetails(option.name)}>
              <td class="font-medium pt-3 px-3">{option.name}</td>
              <td class="text-center pt-3 px-3">{option.impact.toFixed(2)}</td>
              <td class="text-center pt-3 px-3">{option.speedKmh} km/h</td>
              <td class="text-center pt-3 px-3">
                {hoursReadable(option.travelTime)}
              </td>
              <td class="text-right pt-3 px-3">$2</td>
              <td class="text-right pt-3 px-3">$40</td>
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

    <!-- <div>
        <pre>{JSON.stringify(
          travel(base.distance, base.weight, base.diet),
          null,
            2
        )}</pre>
    </div> -->
  </div>
</SidebarLayout>
