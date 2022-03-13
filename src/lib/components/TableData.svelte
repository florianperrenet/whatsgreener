<script>
  import { clickOutside } from "$lib/clickOutside";

  let open = false;
</script>

<caption>
  <div class="relative text-right">
    <div
      class="inline-flex cursor-pointer"
      on:click={() => (open = !open)}
      use:clickOutside
      on:click_outside={() => (open = false)}
    >
      <div class="text-xs text-gray-500">Data</div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ml-1 h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
        />
      </svg>
    </div>

    {#if open}
      <div
        class="not-prose absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white text-left shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <div
            class="px-4 pt-2 text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            json
          </div>
          <a
            href="#"
            class="block px-4 pt-1 pb-2 text-sm text-gray-700 hover:text-gray-900"
            role="menuitem"
            tabindex="-1">Save to clipboard</a
          >
          <a
            href="#"
            class="block px-4 pb-2 text-sm text-gray-700 hover:text-gray-900"
            role="menuitem"
            tabindex="-1">Save to file</a
          >
        </div>
        <div class="py-1" role="none">
          <div
            class="px-4 pt-2 text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            csv
          </div>
          <a
            href="#"
            class="block px-4 pt-1 pb-2 text-sm text-gray-700 hover:text-gray-900"
            role="menuitem"
            tabindex="-1">Save to clipboard</a
          >
          <form method="POST" action="#" role="none">
            <button
              type="submit"
              class="block w-full px-4 pb-2 text-left text-sm text-gray-700 hover:text-gray-900"
              role="menuitem"
              tabindex="-1">Save to file</button
            >
          </form>
        </div>
      </div>
    {/if}
  </div>
</caption>
