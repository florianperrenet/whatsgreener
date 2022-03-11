<script>
  import {
    computePosition,
    flip,
    shift,
    offset,
    arrow as flarrow,
  } from "@floating-ui/dom";

  let element;
  let popover;
  let popover_arrow;

  let show_popover = false;
  let popover_focus = false;

  let going_to_remove = false;

  let time_showed;

  function onMouseEnter() {
    going_to_remove = false;

    time_showed = new Date();

    show_popover = true;
    if (!popover) return;
    popover.style.display = "block";

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

  function hide() {
    show_popover = false;
    if (!popover) return;
    popover.style.display = "";
  }

  function removeWithTimeout() {
    going_to_remove = true;
    setTimeout(() => {
      if (going_to_remove && show_popover && !popover_focus) {
        hide();
      }
    }, 200);
  }

  function onMouseLeave(e) {
    removeWithTimeout();
  }

  function contentEnter(e) {
    popover_focus = true;
  }

  function contentLeave(e) {
    popover_focus = false;
    removeWithTimeout();
  }
</script>

<span
  bind:this={element}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
>
  <slot name="element" />
</span>

<div
  bind:this={popover}
  class="absolute hidden rounded bg-white shadow-md ring-1 ring-gray-900 ring-opacity-5"
>
  <div
    class="pointer-events-none absolute h-[12px] w-[12px] bg-gray-300 after:absolute after:bottom-[1px] after:left-[1px] after:h-[12px] after:w-[12px] after:bg-white"
    style="transform: rotate(-45deg);"
    bind:this={popover_arrow}
  />
  <div
    class="bg-red -mb-2 px-3 pt-2 pb-4"
    on:mouseenter={contentEnter}
    on:mouseleave={contentLeave}
  >
    <slot name="content" />
  </div>
</div>
