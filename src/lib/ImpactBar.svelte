<script>
  import Decimal from "decimal.js";

  function dec(s) {
    return new Decimal(s);
  }

  export let value;

  function getColor(value) {
    let color;
    if (value.lte(dec("10"))) color = "green";
    else if (value.lte(dec("50"))) color = "orange";
    else color = "red";
    return color;
    return `bg-${color}-600`;
  }
</script>

<div class="flex items-center overflow-hidden">
  <!-- <div class="flex-none mr-2 text-sm">Impact: {value.toFixed(2)}</div> -->
  <div class="flex-initial w-full bg-gray-200 rounded-full h-2.5">
    <div
      class="h-2.5 rounded-full"
      style="background-color: {getColor(value)}; width: {value}%"
    />
  </div>
</div>
