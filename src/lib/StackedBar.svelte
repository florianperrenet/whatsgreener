<script>
  import { tooltip } from "$lib/tooltip";

  export let values;
  export let colors;
  export let height = "h-3";

  export let title = null;

  export let highlightKey = null;
  export let activeKey = null;

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

  $: opacity = (key, _highlightKey, _activeKey, lowestOpacity) => {
    const isHighlighted = key === _highlightKey;
    const isActive = key === _activeKey;
    if (isActive) return 1;
    if (isHighlighted && _activeKey) return 0.8;
    if (isHighlighted) return 1;
    if (!_highlightKey && !_activeKey) return 1;
    return lowestOpacity;
  };

  function getContent(key, values) {
    let trs = "";
    let index = 0;
    for (const [valkey, val] of Object.entries(values)) {
      const color = colors[index++];
      const _opacity = opacity(valkey, key, null, 0.4);

      let tr = `
        <tr
          class="${_opacity === 1 ? "font-semibold" : ""}"
          style="opacity: ${_opacity};"
        >
          <td class="flex items-center pr-2">
            <div
              class="mr-1 h-2 w-2"
              style="background-color: ${color};"
            ></div>
            <span>${valkey}</span>
          </td>
          <td class="text-right">${val.toFixed(2)}</td>
        </tr>
      `;

      trs += tr;
    }

    return `
      <div class="mb-1 text-sm font-bold">${title}</div>
      <table class="text-xs">
      <tbody>
        ${trs}
      </tbody>
    </table>

    `;
  }
</script>

<div class="overflow-hidden">
  <div class="flex w-full flex-row bg-gray-100 {height}">
    {#each Object.entries(values) as [key, value], index}
      {#if show(key)}
        <div
          class={height}
          style="background-color: {colors[index]}; opacity: {opacity(
            key,
            highlightKey,
            activeKey,
            0.1
          )}; width: {value}%;"
          use:tooltip={{ content: getContent(key, values) }}
        />
      {/if}
    {/each}
  </div>
</div>
