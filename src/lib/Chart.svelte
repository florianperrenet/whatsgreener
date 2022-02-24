<script context="module">
  let idCounter = 0;
</script>

<script>
  import { chart } from "$lib/chart";
  import { onMount } from "svelte";

  export let data;

  let chartEl;

  const chartId = `chart-${idCounter++}`;

  let mounted = false;
  onMount(async () => {
    mounted = true;
  });

  $: if (data) {
    // data.el = chartId;
    data.el = chartEl;
    chart(data);
  }
</script>

<div class="not-prose">
  <div
    style="position: relative;"
    class="bg-white shadow ring-1 ring-gray-900 ring-opacity-5 rounded"
  >
    <div class="flex items-center border-b border-gray-200 mb-3 p-3">
      <div class="grow">
        <div class="leading-none text-gray-900 mb-1">
          {data.title}
        </div>
        <div class="text-sm max-w-lg">Some description</div>
      </div>
      <div class="flex-none">
        <img src="/whatsgreener-logo-site.png" alt="" width="125" />
      </div>
    </div>

    <div id={chartId} bind:this={chartEl} class="relative p-3" />

    <div class="pl-3 pb-3 text-xs">
      <div>Source: <a href="/calculations">Calculations</a></div>
      <div>Note: Something</div>
    </div>
  </div>
</div>
