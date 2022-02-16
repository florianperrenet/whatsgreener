<script>
  import SidebarLayout from "$lib/SidebarLayout.svelte";
  import Input from "$lib/Input.svelte";
  import Select from "$lib/Select.svelte";
  import Toggle from "$lib/Toggle.svelte";
  import ImpactBar from "$lib/ImpactBar.svelte";
  import { diets, food, travel } from "$lib/vars";

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
    <div class="font-bold">Terminology</div>
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
    </div>

    <table class="not-prose border-collapse	">
      <thead>
        <th class="pb-1 border-b-2 border-gray-900">Activity</th>
        <th class="pb-1 text-center border-b-2 border-gray-900">Impact</th>
        <th class="pb-1 text-center border-b-2 border-gray-900">Speed</th>
        <th class="pb-1 text-center border-b-2 border-gray-900">Travel time</th>
        <th class="pb-1 text-right border-b-2 border-gray-900">CTT</th>
        <th class="pb-1 text-right border-b-2 border-gray-900">CTC</th>
      </thead>
      {#each travelValues(base.distance, base.weight, base.diet, base.sort) as option}
        <tbody class="hover:bg-gray-100 hover:cursor-pointer">
          <tr>
            <td class="font-semibold pt-3">{option.name}</td>
            <td class="text-center pt-3">{option.impact.toFixed(2)}</td>
            <td class="text-center pt-3">{option.speedKmh} km/h</td>
            <td class="text-center pt-3">
              {option.travelTime.toFixed(2)} hours
            </td>
            <td class="text-right pt-3">$2</td>
            <td class="text-right pt-3">$40</td>
          </tr>
          <tr>
            <td colspan="6" class="py-1 pb-4 border-b border-gray-300">
              <ImpactBar value={option.impact} />
            </td>
          </tr>
          <tr>
            <td colspan="6" class="text-sm mb-5 pb-3 pt-2">
              <Toggle text="details">
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
              </Toggle>
            </td>
          </tr>
        </tbody>
      {/each}
    </table>

    <!-- <div>
        <pre>{JSON.stringify(
          travel(base.distance, base.weight, base.diet),
          null,
            2
        )}</pre>
    </div> -->
  </div>
</SidebarLayout>
