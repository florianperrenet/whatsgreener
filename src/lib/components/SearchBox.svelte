<script>
  import { clickOutside } from "$lib/clickOutside";

  export let show = false;
  export let search = "";
  export let search_result;

  let input_el;

  $: if (show && input_el) {
    input_el.focus();

    document.body.classList.add("overflow-hidden");
  }

  function reset() {
    show = false;
    search = "";
    search_result = null;

    document.body.classList.remove("overflow-hidden");
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      reset();
    }
  }

  function relevantPart(s) {
    const pos = s.indexOf("<em>");
    if (!pos) return s;
    s = "..." + s.substring(pos - 20, s.length);
    return s;
  }

  // jumpTo
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if show}
  <div
    class="fixed top-0 left-0 z-50 flex h-full w-full flex-col bg-[rgb(0,0,0,0.2)] p-[12vh] backdrop-blur-sm"
  >
    <div
      class="mx-auto w-full max-w-[47rem] flex-col overflow-y-auto rounded-xl bg-white"
      use:clickOutside
      on:click_outside={reset}
    >
      <div class="flex items-center border-b border-gray-100 px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          bind:this={input_el}
          bind:value={search}
          type="text"
          placeholder="Search calculations"
          class="h-14 grow border-0 text-sm placeholder:text-gray-400 focus:ring-0"
        />

        <div class="rounded-md border p-1 text-xs font-bold shadow-sm">esc</div>
      </div>
      <div class="py-6">
        {#if search && search_result}
          {#if search_result.nbHits}
            <div class="mb-4 px-4 text-lg font-semibold">
              <!-- {search_result.hits[0].parent} -->
              Results
            </div>

            <ul class="">
              {#each search_result.hits as hit, index}
                <li>
                  <a
                    href="#test"
                    class="mx-4 mt-2 flex cursor-pointer items-center justify-between overflow-x-hidden rounded-lg bg-gray-100 py-2 px-5 hover:bg-gray-200"
                    on:click={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div
                      class="mr-5 rounded-lg border border-gray-300 bg-white p-1 text-gray-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="grow overflow-x-hidden">
                      <div class="hidden">{hit.id}</div>
                      <div
                        class="meilisearch-formatted mb-0.5 truncate text-gray-700"
                      >
                        {@html hit._formatted.title}
                      </div>
                      <div class="hidden">{hit.parent}</div>
                      <div
                        class="meilisearch-formatted truncate text-sm text-gray-400"
                      >
                        {@html relevantPart(hit._formatted.content)}
                      </div>
                    </div>
                    <div class="ml-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </a>
                  <!-- <a
                    href="#"
                    class="{index === 0
                      ? 'bg-gray-50'
                      : ''} block cursor-pointer py-2 px-4 hover:bg-gray-100"
                  >
                    <div class="hidden">{hit.id}</div>
                    <div class="meilisearch-formatted mb-1 font-medium">
                      {@html hit._formatted.title}
                    </div>
                    <div class="hidden">{hit.parent}</div>
                    <div
                      class="meilisearch-formatted truncate text-sm text-gray-400"
                    >
                      {@html hit._formatted.content}
                    </div>
                  </a> -->
                </li>
              {/each}
            </ul>
          {:else}
            <div class="text-center text-lg text-gray-500">
              No results for "<strong>{search}</strong>"
            </div>
          {/if}
        {:else}
          <div class="text-center text-lg text-gray-500">
            No results for "<strong>{search}</strong>"
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  :global(.meilisearch-formatted em) {
    /* color: blue; */
    font-weight: bold;
    /* border-bottom: 2px solid blue; */
    text-decoration: underline;
    text-decoration-thickness: 2px;
    font-style: normal;
    color: black;
  }
</style>
