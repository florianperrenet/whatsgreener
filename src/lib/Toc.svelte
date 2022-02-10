<script>
  export let toc;
  export let root = false;
  export let activeHeading = null;
</script>

<ul class={root ? "" : "pl-8 border-l border-slate-300"}>
  {#each toc as item}
    <li>
      <div
        class="truncate level{item.level} {item.item === activeHeading
          ? 'bg-slate-300'
          : 'hover:bg-slate-100'}"
      >
        <a
          href="#{item.id}"
          on:click={(e) => {
            e.preventDefault();
            let el = document.querySelector(`#${item.id}`);
            el.scrollIntoView({
              behavior: "smooth",
            });
          }}>{item.item.innerText}</a
        >
      </div>
      {#if item.children.length}
        <svelte:self toc={item.children} {activeHeading} />
      {/if}
    </li>
  {/each}
</ul>
