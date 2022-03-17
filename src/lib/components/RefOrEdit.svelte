<script>
  import Ref from "$lib/components/Ref.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Tooltip from "$lib/components/Tooltip.svelte";
  import { tooltip } from "$lib/tooltip";

  export let to;
  export let value;

  let show_modal = false;

  if (value === undefined) {
    to = "suggest a value";
  }

  const content = `
    <a class="flex items-center text-sm text-blue-600">${to}
      <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </a>
  `;
</script>

<Modal bind:show={show_modal} />

{#if value === undefined}
  <Tooltip>
    <span
      slot="trigger"
      class="cursor-default border-b-2 border-dotted border-gray-400 no-underline {show_modal
        ? 'bg-yellow-300'
        : ''}">?</span
    >

    <div slot="content">
      <div
        class="flex cursor-pointer items-center text-sm text-blue-600"
        on:click={() => (show_modal = true)}
      >
        {to}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ml-1 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </div>
    </div>
  </Tooltip>
{:else}
  <Ref {to}>{value}</Ref>
{/if}
