<script>
  import Ref from "$lib/components/Ref.svelte";
  import { tooltip } from "$lib/tooltip";

  export let to;
  export let value;

  if (value === undefined) {
    to = "edit";
  }

  const content = `
    <a href="#" target="_blank" class="flex items-center text-sm text-blue-600">${to}
      <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </a>
  `;
</script>

{#if value === undefined}
  <span
    class="cursor-default border-b-2 border-dotted border-gray-400 no-underline"
    use:tooltip={{
      content,
      interactive: true,
    }}>?</span
  >
{:else}
  <Ref {to}>{value}</Ref>
{/if}
