<script>
  export let toc;
  export let root = false;
  export let activeHeading = null;
</script>

<ul class="i {root ? '' : 'space-y-2 pl-6 border-l border-slate-300'}">
  {#each toc as item}
    <li class="i {item.level > 2 ? '' : 'mt-8'}">
      <div
        class="{item.children.length ? 'mb-3' : ''} {root
          ? 'font-semibold'
          : 'text-gray-700'} truncate level{item.level} {item.item ===
        activeHeading
          ? 'text-gray-900 bg-slate-300'
          : 'hover:text-gray-900'}"
      >
        <a
          href="#{item.id}"
          class="flex items-center"
          on:click={(e) => {
            e.preventDefault();
            let el = document.querySelector(`#${item.id}`);
            el.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <span>{item.item.innerText}</span>

          {#if item.id === "energy"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          {:else if item.id === "travel"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          {:else if item.id === "food"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          {/if}
        </a>
      </div>
      {#if item.children.length}
        <svelte:self toc={item.children} {activeHeading} />
      {/if}
    </li>
  {/each}
</ul>
