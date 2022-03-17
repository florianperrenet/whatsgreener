<script>
  import ContainerLayout from "$lib/ContainerLayout.svelte";
  import RefOrEdit from "$lib/components/RefOrEdit.svelte";
  import { earth_resources } from "$lib/earth_resources/index.js";

  import Input from "$lib/Input.svelte";

  // function display_value(value) {
  //   if (value === "?") return value;
  // }
</script>

<!-- chloropleth with where the main reserves are located -->
<!-- dont forget the lifetime (and recyclability) of solar, wind -->
<!-- proven reserves over time (and adjusted (minus the use with increase rate)) -->

<ContainerLayout>
  <div class="prose max-w-full">
    <h1>Earth resources</h1>
    <!-- <p>
      This excludes unproven reserves. It is likely to find some more reserves
      and so the time till depletion could increase slighty chart with prove.
    </p> -->

    <h2>Natural resources</h2>
    <Input placeholder="Filter source" />

    <table class="">
      <thead class="border-b-2">
        <th>Source</th>
        <!-- <th>Available</th> -->
        <th class="text-right">Time till depletion</th>
        <th>Unit</th>
        <th>Already used</th>
        <th>Proven reserves (left)</th>
        <th>Estimated reserves</th>
        <th>Use rate (per year)</th>
        <th>Regain rate (per year)</th>
        <th>Recyclability</th>
        <!-- or -->
        <th>Reusability</th>
        <th>Extraction impact</th>
        <th>Peak reached</th>
        <th>Resources in use</th>
        <th>Resources available</th>
        <!-- in omloop -->
      </thead>
      <tbody class="divide-y">
        {#each Object.entries(earth_resources) as [key, value]}
          <tr class="cursor-pointer hover:bg-gray-100">
            <td class="font-medium">{key}</td>
            <td
              class="{value.time_till_depletion.lt(100)
                ? 'font-medium text-red-500'
                : ''} text-right">{value.time_till_depletion_readable} years</td
            >
            <td><RefOrEdit to="calculations-ref" value={value.unit} /></td>
            <td><RefOrEdit to="calculations-ref" value={value.used} /></td>
            <td><RefOrEdit to="calculations-ref" value={value.proven_reserves} /></td>
            <td><RefOrEdit to="calculations-ref" value={undefined} /></td>
            <td><RefOrEdit to="calculations-ref" value={value.use_rate} /></td>
            <td><RefOrEdit to="calculations-ref" value={value.regain_rate} /></td>
          </tr>
        {/each}
        <!-- {#each Object.entries(energy_source_efficiency) as [key, value]}
          <tr>
            <td>{key}</td>
            <td>{value} xx</td>
          </tr>
          {/each} -->
      </tbody>
    </table>

    <h2>Derived resources</h2>
    <p>for example aluminum from bauxite etc.</p>
  </div>
</ContainerLayout>
