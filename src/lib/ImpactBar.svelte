<script>
  import { dec } from "$lib/utils";

  export let value;

  function getColor(value) {
    let color;
    if (value.lte(dec("10"))) color = "green";
    else if (value.lte(dec("50"))) color = "orange";
    else color = "red";
    return color;
    return `bg-${color}-600`;
  }

  function getBars(val) {
    let valueRem = value;

    const bars = [];

    while (valueRem.gt(dec("0"))) {
      const gt100 = valueRem.gt(dec("100"));
      const width = gt100 ? dec("100") : valueRem;

      bars.push([width, gt100]);

      valueRem = valueRem.minus(dec("100"));
    }

    return bars;
  }
</script>

{#each getBars(value) as [width, gt100], index}
  <div class="overflow-hidden mt-1">
    <div class="flex-initial w-full bg-gray-200 h-2.5 rounded-full">
      <div
        class="h-2.5 {index === 0 ? 'rounded-l-full' : ''} {gt100
          ? ''
          : 'rounded-r-full'}"
        style="background-color: {getColor(value)}; width: {width}%"
      />
    </div>
  </div>
{/each}

<!-- <div class="flex items-center overflow-hidden">
  <div class="flex-none mr-2 text-sm">Impact: {value.toFixed(2)}</div>
  <div class="flex-initial w-full bg-gray-200 h-2.5 rounded-full">
    <div
      class="h-2.5 rounded-full"
      style="background-color: {getColor(value)}; width: {value}%"
    />
  </div>
</div> -->
