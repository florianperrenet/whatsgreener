<script>
  import { onMount } from "svelte";
  import ContainerLayout from "$lib/ContainerLayout.svelte";
  import Select from "$lib/Select.svelte";

  let energyMix = {};
  let entities = [];
  let selected = null;

  let year = "2019";

  onMount(async () => {
    const response = await fetch(
      "/resources/ourworldindata-energy-mix-per-capita.json"
    );
    const data = await response.json();
    energyMix = data;
    entities = energyMix.entities.map((entity) => [entity, entity]);
    selected = entities[0][0];
  });
</script>

<ContainerLayout>
  <div class="prose lg:prose-lg prose-slate">
    <div class="text-7xl font-bold text-gray-900 mb-20">Energy footprint</div>

    <h1>Energy mixture per capita</h1>
    <div class="not-prose">
      <Select text="Capita" bind:selected options={entities} />
    </div>

    {#if energyMix.data}
      {#each Object.entries(energyMix.data[selected][year]) as [key, value]}
        {#if key === "total"}
          <li>Total: {value}</li>
        {:else}
          <li>{key}: {value.a} kWh = {value.pr}%</li>
        {/if}
      {/each}
    {/if}

    <h1>Options</h1>
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
