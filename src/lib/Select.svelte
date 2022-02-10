<script context="module">
  let counter = 0;
</script>

<script>
  export let text;
  export let options = [];
  export let selected = null;

  const selectId = "select_" + counter++;

  let show = false;

  function select(option) {
    selected = option;
  }

  export function clickOutside(node) {
    const handleClick = (event) => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(new CustomEvent("click_outside", node));
      }
    };

    document.addEventListener("click", handleClick, true);

    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }

  function handleClickOutside(event) {
    if (show) show = false;
  }
</script>

<div
  class="mb-4"
  on:click={() => (show = !show)}
  use:clickOutside
  on:click_outside={handleClickOutside}
>
  <label for={selectId} class="block text-sm font-medium text-gray-700">
    {text}
  </label>
  <div id={selectId} class="mt-1 relative">
    <button
      type="button"
      class="relative w-full bg-white border rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
    >
      <span class="flex items-center">
        <span class="ml-3 block truncate">{selected}</span>
      </span>
      <span
        class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
      >
        <!-- Heroicon name: solid/selector -->
        <svg
          class="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </button>

    <ul
      class="{show
        ? ''
        : 'hidden'} absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      tabindex="-1"
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-option-3"
    >
      {#each options as option}
        {#if option === "divider"}
          <div class="border-b border-gray-200" />
        {:else}
          <li
            class="hover:bg-gray-200 text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
            role="option"
            on:click={select(option)}
          >
            <div class="flex items-center">
              <span
                class="{option === selected
                  ? 'font-semibold'
                  : 'font-normal'} ml-3 block truncate">{option}</span
              >
            </div>

            {#if option === selected}
              <span
                class="text-gray-600 absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <!-- Heroicon name: solid/check -->
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            {/if}
          </li>
        {/if}
      {/each}
    </ul>
  </div>
</div>
