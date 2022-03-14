<script>
  import { clickOutside } from "$lib/clickOutside";

  export let show = false;
  export let search = "";
  export let search_result;

  let input_el;

  $: if (show && input_el) {
    input_el.focus();
  }

  function reset() {
    search = "";
    search_result = null;
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      show = false;
      reset();
    }
  }

  // jumpTo
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if show}
  <div
    class="fixed top-0 left-0 z-50 flex h-full w-full bg-[rgb(0,0,0,0.2)] p-[12vh] backdrop-blur-sm"
  >
    <div
      class="mx-auto w-full max-w-[47rem] rounded-xl bg-white"
      use:clickOutside
      on:click_outside={() => (show = false)}
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
      <div class="px-4 py-6">
        {#if search_result}
          {#if search_result.nbHits}
            <div class="mb-4 text-lg font-semibold">
              {search_result.hits[0].parent}
            </div>

            <div class="divide-y">
              {#each search_result.hits as hit}
                <div class="cursor-pointer py-4 hover:bg-gray-100">
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
                </div>
              {/each}
            </div>
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
    color: blue;
    /* border-bottom: 2px solid blue; */
    text-decoration: underline;
  }
</style>
