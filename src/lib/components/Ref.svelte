<script>
  import Tooltip from "$lib/components/Tooltip.svelte";

  export let to;
</script>

<Tooltip>
  <span
    slot="element"
    class="border-b-2 border-dotted border-gray-400 no-underline"><slot /></span
  >

  <div slot="content">
    {to}
  </div>
</Tooltip>
