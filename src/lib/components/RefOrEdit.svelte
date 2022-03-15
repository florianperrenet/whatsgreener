<script>
  import Ref from "$lib/components/Ref.svelte";
  import { tooltip } from "$lib/tooltip";

  export let to;
  export let value;

  if (value === undefined) {
    to = "value missing";
  }

  const content = `
    <a href="#" target="_blank" class="flex items-center text-sm text-blue-600">${to}
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
