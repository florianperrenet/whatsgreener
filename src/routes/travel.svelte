<script>
  import SidebarLayout from "$lib/SidebarLayout.svelte";
  import Input from "$lib/Input.svelte";
  import Select from "$lib/Select.svelte";
  import Toggle from "$lib/Toggle.svelte";
  import { diets, food, travel } from "$lib/vars";

  const base = {
    distance: 1,
    weight: 70,
    diet: "meat_fish",
    sort: "Highest impact",
  };
</script>

<SidebarLayout>
  <div slot="sidebar">
    <Input text="Distance (km)" type="number" bind:value={base.distance} />
    <Input text="Weight (kg)" type="number" bind:value={base.weight} />
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
    <Toggle text="Advanced">text</Toggle>
  </div>
  <div slot="content">
    <div class="mb-10 text-4xl font-extrabold text-slate-900">Travel</div>
    <div>Terminology</div>
    <div class="mb-5">
      MET: Metabolic Equivalent of Task (exercise intensity)
    </div>

    {#each Object.values(travel(base.distance, base.weight, base.diet)) as option}
      <div class="mb-2" impact={option.impact} travelTime={option.travelTime}>
        <div class="text-base flex gap-x-5">
          <div class="font-semibold">{option.name}</div>
          <div>Speed: {option.speedKmh} km/h</div>
          <div>MET: {option.met}</div>
          <div>
            Travel time: {option.travelTime} hours
          </div>
        </div>

        <div class="text-sm pl-10">
          <div class="mb-2">
            {#each Object.values(option.footprint) as value}
              <div>{value.name} ({value.activity})</div>
            {/each}
          </div>
          {#each ["consumes", "emits"] as content}
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

          <!-- <Toggle text="in depth">
            <div>Footprint</div>
            <div>
              {#each Object.values(option.footprint) as footprint}
                <pre>{JSON.stringify(footprint, null, 2)}</pre>
              {/each}
            </div>
          </Toggle> -->
        </div>
      </div>
    {/each}

    <div>
      <pre>{JSON.stringify(
          travel(base.distance, base.weight, base.diet),
          null,
          2
        )}</pre>
    </div>
  </div>
</SidebarLayout>
