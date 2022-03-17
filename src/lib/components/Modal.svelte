<script>
  import { clickOutside } from "$lib/clickOutside";

  import Input from "$lib/Input.svelte";
  import Button from "$lib/components/Button.svelte";

  export let show = false;

  let suggestion_input_focus = true;

  $: if (show) {
    document.body.classList.add("overflow-hidden");
  }

  function reset() {
    show = false;
    document.body.classList.remove("overflow-hidden");
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      reset();
    }
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
      <div class="flex items-center border-b border-gray-100 px-4 py-4">
        <div class="grow text-lg font-semibold">Make a suggestion for: xx</div>
        <div class="rounded-md border p-1 text-xs font-bold shadow-sm">esc</div>
      </div>
      <div class="px-4 py-6">
        <div class="mb-5">It's also possible to give feedback on <a href="#">Github</a> or on our <a href="#">Community chat</a>.</div>

        <!-- <div class="mb-5 block text-md font-medium text-gray-700">Current value is xx</div> -->

        <div class="mb-3">
          <Input type="text" label="What do you suggest?" focus={suggestion_input_focus} />
        </div>

        <div class="mb-3">
          <span class="mb-1 block text-sm font-medium text-gray-700">Provide some details</span>
          <textarea class="
                      mt-1
                      block
                      w-full
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                    " rows="3"></textarea>
        </div>

        <div class="mb-3">
          <Input type="text" label="Sources" placeholder="Link or text" />
          <div class="text-sm text-blue-600 mt-2 mb-3">add +</div>
        </div>

        <div class="mb-5">
          <Input type="email" label="Email" placeholder="Optional" />
        </div>

        <!-- <div>Thank you for your contribution</div> -->

        <div>
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  </div>
{/if}
