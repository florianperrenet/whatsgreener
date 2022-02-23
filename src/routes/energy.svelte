<script>
  import { onMount } from "svelte";
  import ContainerLayout from "$lib/ContainerLayout.svelte";
  import Select from "$lib/Select.svelte";

  let energyMix = {};
  let countries = [];
  let selected = null;

  let year = "2019";

  onMount(async () => {
    const response = await fetch("/static/iea_country_energy_mix.json");
    const data = await response.json();
    energyMix = data;
    countries = energyMix.countries.map((country) => [country, country]);
    selected = countries[0][0];
  });
</script>

<ContainerLayout>
  <div class="prose lg:prose-lg prose-slate">
    <div class="text-7xl font-bold text-gray-900 mb-20">Energy footprint</div>

    <h1>Energy mixture per country</h1>
    <div class="not-prose">
      <Select text="Country" bind:selected options={countries} />
    </div>

    {#if energyMix.data}
      {#each Object.entries(energyMix.data[selected][year]) as [key, value]}
        <li>{key}: {value.amount} PJ = {value.percentage_r}%</li>
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
