<script>
  import Header from "$lib/header/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import "../app.css";
</script>

<Header />

<main class="flex flex-auto">
  <slot />
</main>

<Footer />
