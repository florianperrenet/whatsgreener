<script>
  export let show = false;

  let input;

  $: if (show && input) {
    input.focus();
  }
</script>

{#if show}
  <div
    class="fixed top-0 left-0 z-50 flex h-full w-full bg-[rgb(0,0,0,0.2)] p-[12vh] backdrop-blur-sm"
    on:click={() => (show = false)}
  >
    <div class="mx-auto w-full max-w-[47rem] rounded-xl bg-white">
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
          bind:this={input}
          type="text"
          placeholder="Search calculations"
          class="h-14 grow border-0 text-sm placeholder:text-gray-400 focus:ring-0"
        />

        <div class="rounded-md border p-1 text-xs font-bold shadow-sm">esc</div>
      </div>
      <div class="px-4 py-6">
        <div class="text-lg font-semibold">Title</div>
      </div>
    </div>
  </div>
{/if}
