<script>
  export let grid;
  export let full = false;
  export let bordered = false;
  export let label = null;
  export let overflow = false;

  // const options = {
  //   full,
  //   bordered,
  //   label,
  // };

  const align_map = {
    l: "left",
    c: "center",
    r: "right",
  };
  const align = Array.from(grid.align).map((x) => align_map[x]);

  const columns_len = grid.columns.length;
</script>

<table
  class="not-prose leading-none border-collapse {bordered
    ? ''
    : 'border border-slate-300'} {overflow
    ? 'whitespace-nowrap overflow-x-auto block'
    : ''}"
>
  <thead class="bg-slate-900">
    <tr>
      {#each grid.columns as column, index}
        <th
          class="{bordered ? 'border' : ''} border-slate-300 text-{align[
            index
          ]} text-slate-200">{column}</th
        >
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each grid.rows as row}
      <tr>
        {#if typeof row === "string"}
          <td
            colspan={columns_len}
            class="bg-slate-200 font-semibold {bordered
              ? 'border'
              : 'border-t'} border-slate-300 text-center">{row}</td
          >
        {:else}
          {#each row as col, index}
            <td
              class="{bordered
                ? 'border'
                : 'border-t'} border-slate-300 text-{align[index]}">{col}</td
            >
          {/each}
        {/if}
      </tr>
    {/each}
  </tbody>
  <caption class="py-2">Table 1: <slot /></caption>
</table>

<style>
  table {
    caption-side: bottom;
  }
</style>
