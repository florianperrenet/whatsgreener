<script>
  export let text;
  export let placeholder = null;
  export let value = null;
  export let type = "text";
</script>

<label class="block">
  <span class="block text-sm font-medium text-gray-700">{text}</span>
  {#if type === "number"}
    <!-- {:else if type === "number"} -->
    <input
      type="number"
      bind:value
      class="text-sm mt-1 mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      {placeholder}
    />
  {:else}
    <input
      type="text"
      bind:value
      class="text-sm mt-1 mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      {placeholder}
    />
  {/if}
</label>
