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
        <div>Github or community chat</div>

        <div>Current value is xx</div>
        <div>Your suggestion:</div>
        <Input type="text" focus={suggestion_input_focus} />

        <div>Add a description</div>
        <Input type="text" />

        <div>Sources to backup your suggestion</div>
        <div>Add as many links as you like</div>
        <Input type="text" />
        <Input type="text" />

        <div>optional: email</div>
        <Input type="email" />

        <div>Thank you for your contribution</div>

        <Button>Submit</Button>
      </div>
    </div>
  </div>
{/if}
