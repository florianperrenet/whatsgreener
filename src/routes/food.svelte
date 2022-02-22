<script>
  import SidebarLayout from "$lib/SidebarLayout.svelte";
  import { food } from "$lib/vars";
</script>

<svelte:head>
  <title>Food</title>
</svelte:head>

<SidebarLayout>
  <div slot="sidebar" />
  <div slot="content">
    <div class="mb-10 text-4xl font-extrabold text-slate-900">Food impact</div>
    <ul>
      {#each Object.values(food) as item}
        <li>{item.name}</li>
      {/each}
    </ul>
  </div>
</SidebarLayout>
