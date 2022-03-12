<script>
  import Tooltip from "$lib/components/Tooltip.svelte";

  export let to;
  // on click instead of on hover
  export let click = false;
</script>

<Tooltip>
  <span
    slot="trigger"
    class="cursor-default border-b-2 border-dotted border-gray-400 no-underline"
    ><slot /></span
  >

  <div slot="content">
    {to}
  </div>
</Tooltip>
