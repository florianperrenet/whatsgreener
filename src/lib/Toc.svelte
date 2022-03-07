<script>
  export let toc;
  export let root = false;
  export let activeHeading = null;
</script>

<ul class="i {root ? '' : 'space-y-2 border-l border-slate-300 pl-6'}">
  {#each toc as item}
    <li class="i {item.level > 2 ? '' : 'mt-8'}">
      <div
        class="{item.children.length ? 'mb-3' : ''} {root
          ? 'font-semibold'
          : 'text-gray-700'} truncate level{item.level} {item.item ===
        activeHeading
          ? 'bg-slate-300 text-gray-900'
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
        </a>
      </div>
      {#if item.children.length}
        <svelte:self toc={item.children} {activeHeading} />
      {/if}
    </li>
  {/each}
</ul>
