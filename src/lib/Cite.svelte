<script>
  import { bibliography } from "$lib/bib.js";
  import Tooltip from "$lib/components/Tooltip.svelte";

  export let to;

  // set an index to each item
  let index = 1;
  for (const value of Object.values(bibliography)) {
    value.index = index;
    ++index;
  }

  const getBibIndex = (to) => {
    if (to in bibliography) return bibliography[to].index;
    return undefined;
  };

  const bibItem = bibliography[to];
</script>

<Tooltip>
  <span
    slot="element"
    class="cite"
    on:click={(e) => {
      e.preventDefault();
      let el = document.querySelector(`#bib-${to}`);
      el.scrollIntoView({
        behavior: "smooth",
      });
    }}><a href="#bib-{to}" class="no-underline">[{getBibIndex(to)}]</a></span
  >

  <div slot="content">
    <a
      href={bibItem.url}
      target="_blank"
      class="flex items-center text-sm text-blue-600"
      >{bibItem.title}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ml-2 h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg></a
    >
  </div>
</Tooltip>
