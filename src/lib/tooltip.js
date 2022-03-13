import {
  computePosition,
  flip,
  shift,
  offset,
  arrow as flarrow,
} from "@floating-ui/dom";



export function tooltip(trigger, param) {
  let popper;
  let popper_content;
  let popper_arrow;

  let content = param.content;

  let interactive = param.interactive === true ? true : false;

  let can_add = true;





  function mouseenter(event) {
    if (!can_add) return;

    createElements();

    popper_content.innerHTML = content;

    popper.appendChild(popper_content);
    popper.appendChild(popper_arrow);


    show();


    setPlacement();
  }

  function mouseleave() {
    can_add = false;
    document.addEventListener('mousemove', mousemove);
  }


  function show() {
    document.body.appendChild(popper);
  }

  function hide() {
    document.body.removeChild(popper);
    can_add = true;
  }



  function createElements() {
    popper = document.createElement('div');
    popper.classList.add(
      "absolute",
      "rounded",
      "bg-white",
      "shadow-md",
      "ring-1",
      "ring-gray-900",
      "ring-opacity-5",
    );

    popper_content = document.createElement('div');
    popper_content.classList.add(
      "-mb-2",
      "px-3",
      "pt-2",
      "pb-4",
      "text-gray-700",
    );

    popper_arrow = document.createElement('div');
    popper_arrow.classList.add(
      "absolute",
      "h-[12px]",
      "w-[12px]",
      "bg-gray-300",
      "-rotate-45",
      "after:absolute",
      "after:bottom-[1px]",
      "after:left-[1px]",
      "after:h-[12px]",
      "after:w-[12px]",
      "after:bg-white",
    );
  }



  function setPlacement() {
    computePosition(trigger, popper, {
      placement: "top",
      middleware: [
        offset(8),
        flip(),
        shift({ padding: 5 }),
        flarrow({ element: popper_arrow }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(popper.style, {
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

      Object.assign(popper_arrow.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-6px",
      });
    });
  }



  function mousemove(e) {
    const target = e.target;
    const cursor_on_trigger = trigger.contains(target);
    const cursor_on_popper = popper.contains(target);

    if (interactive) {
      if (cursor_on_trigger || cursor_on_popper) return;
    } else {
      if (cursor_on_trigger) return;
    }

    document.removeEventListener('mousemove', mousemove);

    hide();

  }







  trigger.addEventListener('mouseenter', mouseenter);
  trigger.addEventListener('mouseleave', mouseleave);

  return {
    destroy() {
      trigger.removeEventListener('mouseenter', mouseenter);
      trigger.removeEventListener('mouseleave', mouseleave);
      document.removeEventListener('mousemove', mousemove);
    }
  }
}


