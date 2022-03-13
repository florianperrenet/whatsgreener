<script>
  import Header from "$lib/header/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import "../app.css";

  import { tooltip } from "$lib/store";
</script>

<Header />

<main class="flex flex-auto">
  <slot />

  {#if $tooltip.show}
    <svelte:component this={$tooltip.content} data={$tooltip.data} />
  {/if}
</main>

<Footer />
