<script>
  import { dec, chartColors } from "$lib/utils";

  export let values;
  export let colors;
  export let height = "h-3";

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
</script>

<div class="overflow-hidden">
  <div class="flex w-full bg-gray-100 {height}">
    {#each Object.entries(values) as [key, value], index}
      <div
        class={height}
        style="background-color: {colors[index]}; width: {value}%"
      />
    {/each}
  </div>
</div>
