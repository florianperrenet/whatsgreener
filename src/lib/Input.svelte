<script context="module">
  let counter = 0;
</script>

<script>
  export let label = null;
  export let placeholder = null;
  export let value = null;
  export let type = "text";
  export let min = "1";

  const initialValue = value;
  const inputId = "input_" + counter++;

  function handleNumberChange(e) {
    let val = e.target.value;
    if (val === "" || parseInt(val) < parseInt(min)) {
      value = min;
    } else {
      value = val;
    }
  }
</script>

<label for={inputId} class="block">
  {#if label}
    <span class="block text-sm font-medium text-gray-700">{label}</span>
  {/if}
  {#if type === "number"}
    <!-- {:else if type === "number"} -->
    <input
      id={inputId}
      type="number"
      {min}
      value={initialValue}
      on:input={handleNumberChange}
      class="text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      {placeholder}
    />
  {:else}
    <input
      id={inputId}
      type="text"
      bind:value
      class="text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      {placeholder}
    />
  {/if}
</label>
