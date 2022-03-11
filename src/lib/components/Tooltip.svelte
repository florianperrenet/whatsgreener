<script>
  import {
    computePosition,
    flip,
    shift,
    offset,
    arrow as flarrow,
  } from "@floating-ui/dom";

  export let pointer_events = true;

  let element;
  let popover;
  let popover_arrow;

  let show_popover = false;

  $: if (popover && popover_arrow) {
    computePosition(element, popover, {
      placement: "top",
      middleware: [
        offset(6),
        flip(),
        shift({ padding: 5 }),
        flarrow({ element: popover_arrow }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(popover.style, {
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

      Object.assign(popover_arrow.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-6px",
      });
    });
  }
</script>

<span
  bind:this={element}
  on:mouseenter={() => (show_popover = true)}
  on:mouseleave={() => (show_popover = false)}
>
  <slot name="element" />

  {#if show_popover}
    <div
      bind:this={popover}
      class="{pointer_events
        ? ''
        : 'pointer-events-none'} absolute rounded bg-white shadow-md ring-1 ring-gray-900 ring-opacity-5"
    >
      <div
        class="absolute h-[12px] w-[12px] bg-gray-300 after:absolute after:bottom-[1px] after:left-[1px] after:h-[12px] after:w-[12px] after:bg-white"
        style="transform: rotate(-45deg);"
        bind:this={popover_arrow}
      />
      <div class="bg-red -mb-2 px-3 pt-2 pb-4">
        <slot name="content" />
      </div>
    </div>
  {/if}
</span>
