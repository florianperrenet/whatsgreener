<script context="module">
  let idCounter = 0;
</script>

<script>
  import { chart } from "$lib/chart";
  import { onMount } from "svelte";

  export let data;

  if (!("relative" in data)) data.relative = false;

  let chartEl;

  const chartId = `chart-${idCounter++}`;

  let mounted = false;
  onMount(async () => {
    mounted = true;
  });

  function toggleRelative() {
    data.relative = !data.relative;
  }

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
        {#if data.description}
          <div class="text-sm max-w-lg">{data.description}</div>
        {/if}
      </div>
      <div class="flex-none">
        <img src="/whatsgreener-logo-site.png" alt="" width="125" />
      </div>
    </div>

    <div class="p-3 text-sm">
      <label class="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          on:click={toggleRelative}
          class="
          w-3
          h-3
        rounded
        border-gray-300
        text-blue-600
        shadow-sm
        focus:ring-transparent
        "
        />
        <span class="ml-1">Relative</span>
      </label>
    </div>

    <div id={chartId} bind:this={chartEl} class="relative p-3" />

    <div class="pl-3 pb-3 text-xs">
      <div>Source: {data.source}</div>
      <div>Note: {data.note}</div>
    </div>
  </div>
</div>
