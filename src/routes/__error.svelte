<script context="module">
  /** @type {import('@sveltejs/kit').ErrorLoad} */
  export function load({ error, status }) {
    return {
      props: {
        title: `${status}: ${error.message}`,
      },
    };
  }
</script>

<script>
  import ContainerLayout from "$lib/ContainerLayout.svelte";
  export let title;
</script>

<ContainerLayout>
  <h1 class="font-medium text-4xl">{title}</h1>
</ContainerLayout>
