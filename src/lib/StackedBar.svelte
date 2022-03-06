<script>
  import { dec, chartColors } from "$lib/utils";

  export let values;
  export let colors;
  export let height = "h-3";

  export let highlightKey = null;
  export let activeKey = null;

  // console.log(values);

  // function getColor(value) {
  //   let color;
  //   if (value.lte(dec("10"))) color = "green";
  //   else if (value.lte(dec("50"))) color = "orange";
  //   else color = "red";
  //   return color;
  //   return `bg-${color}-600`;
  // }

  // function getBars(val) {
  //   let valueRem = value;

  //   const bars = [];

  //   while (valueRem.gt(dec("0"))) {
  //     const gt100 = valueRem.gt(dec("100"));
  //     const width = gt100 ? dec("100") : valueRem;

  //     bars.push([width, gt100]);

  //     valueRem = valueRem.minus(dec("100"));
  //   }

  //   return bars;
  // }

  $: show = (key) => {
    const isActive = key === activeKey;
    const isHighlighted = key === highlightKey;
    if (activeKey) {
      if (highlightKey && !isHighlighted) return false;
      if (isActive) return true;
      if (isHighlighted) return true;
      return false;
    }
    return true;
  };

  $: opacity = (key) => {
    const isHighlighted = key === highlightKey;
    const isActive = key === activeKey;
    if (isActive) return 1;
    if (isHighlighted && activeKey) return 0.8;
    if (isHighlighted) return 1;
    if (!highlightKey && !activeKey) return 1;
    return 0.1;
  };
</script>

<div class="overflow-hidden">
  <div class="flex w-full bg-gray-100 {height}">
    {#each Object.entries(values) as [key, value], index}
      {#if show(key)}
        <div
          class={height}
          style="background-color: {colors[index]}; opacity: {opacity(
            key
          )}; width: {value}%"
        />
        <!-- {:else} -->
      {/if}
    {/each}
  </div>
</div>
