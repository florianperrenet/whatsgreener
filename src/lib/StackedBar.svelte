<script>
  import { dec, chartColors } from "$lib/utils";

  // import { tooltip } from "$lib/tooltip";

  // import { createPopper } from "@popperjs/core";
  import {
    computePosition,
    flip,
    shift,
    offset,
    arrow as flarrow,
  } from "@floating-ui/dom";

  export let values;
  export let colors;
  export let height = "h-3";

  export let title = null;

  export let tooltip = null;
  export let arrow = null;

  export let highlightKey = null;
  export let activeKey = null;

  import { onMount } from "svelte";

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

  // let tooltip;
  let bar;

  // createPopper(bar, tooltip, {
  //   placement: "top",
  //   modifiers: [
  //     {
  //       name: "offset",
  //       options: {
  //         offset: [0, 8],
  //       },
  //     },
  //   ],
  // });

  // onMount(() => {
  //   if (!tooltip) return;

  //   computePosition(bar, tooltip).then(({ x, y }) => {
  //     Object.assign(tooltip.style, {
  //       left: `${x}px`,
  //       top: `${y}px`,
  //     });
  //   });
  // });

  function onMouseEnter(e, key, values) {
    if (!tooltip) return;

    tooltip.style.display = "block";

    let trs = "";
    let index = 0;
    for (const [valkey, valval] of Object.entries(values)) {
      const color = colors[index++];
      const _opacity = opacity(valkey, key, null, 0.4);
      trs += `<tr style="opacity: ${_opacity};">
          <td style="background-color: ${color}; width: 10px; height: 10px; display: inline-block; margin-right: 2px;"></td>
            <td style="padding-right: 0.8em;">${valkey}</td>
            <td style="text-align: right; white-space: nowrap;">${valval.toFixed(
              2
            )}</td>
          </tr>`;
    }

    const tooltip_html_el = tooltip.querySelector("#tooltip-html");

    tooltip_html_el.innerHTML = `<table><thead><tr><td colspan="3" style="padding-bottom: 5px;"><strong>${title}</strong></td></tr></thead><tbody>${trs}</tbody></table>`;

    computePosition(e.target, tooltip, {
      placement: "top",
      middleware: [
        offset(6),
        flip(),
        shift({ padding: 5 }),
        flarrow({ element: arrow }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[placement.split("-")[0]];

      Object.assign(arrow.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-4px",
      });
    });
  }

  function onMouseLeave(e) {
    if (!tooltip) return;

    tooltip.style.display = "";
  }

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
</script>

<div class="overflow-hidden">
  <div class="flex flex-row w-full bg-gray-100 {height}">
    {#each Object.entries(values) as [key, value], index}
      {#if show(key)}
        <div
          class={height}
          style="background-color: {colors[index]}; opacity: {opacity(
            key,
            highlightKey,
            activeKey,
            0.1
          )}; width: {value}%"
          on:mouseenter={(e) => onMouseEnter(e, key, values)}
          on:mouseleave={onMouseLeave}
        />
      {/if}
    {/each}
  </div>
</div>
