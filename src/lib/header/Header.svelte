<script>
  import { page } from "$app/stores";

  const urls = [
    ["Travel", "/travel"],
    ["Food", "/food"],
    ["View calculations", "/calculations"],
  ];

  let menu_open = false;
</script>

<header
  class="relative sticky top-0 z-50 flex-none bg-white py-3 text-lg font-semibold shadow-sm ring-1 ring-gray-900 ring-opacity-5"
>
  <nav aria-label="Global" class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-wrap items-center sm:flex-nowrap">
      <a href="/" class="mr-3 text-4xl font-bold">
        <img src="whatsgreener-logo-site.png" alt="whatsgreener" width="220" />
      </a>
      <a
        href="https://github.com/florianperrenet/whatsgreener"
        class="dark:highlight-white/5 hidden items-center space-x-2 rounded-full bg-slate-400/10 py-1 px-3 text-xs font-semibold leading-5 hover:bg-slate-400/20 sm:flex"
        target="_blank"
      >
        <img
          src="GitHub-Mark-32px.png"
          alt="github mark"
          width="16"
          class="mr-1"
        />
        v0.0.1-BETA
      </a>

      <div
        class="mt-4 hidden w-full items-center sm:mt-0 sm:ml-auto sm:w-auto md:flex"
      >
        <nav class="text-sm font-semibold leading-6 text-slate-700">
          <a sveltekit:prefetch href="/energy">Energy</a>
          <a sveltekit:prefetch href="/travel" class="ml-6">Travel</a>
          <a sveltekit:prefetch href="/food" class="mx-6">Food</a>
          <a
            sveltekit:prefetch
            href="/calculations"
            class="border-l border-gray-200 pl-6">View calculations</a
          >
        </nav>
      </div>

      <div class="ml-auto md:hidden">
        <button
          type="button"
          class="flex items-center justify-center text-slate-700"
          on:click={() => (menu_open = true)}
        >
          <!-- Heroicon name: outline/menu -->
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>

  {#if menu_open}
    <div class="absolute inset-x-0 top-0 z-20 p-2">
      <div
        class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div class="px-5 pt-5 pb-6">
          <div class="flex items-center justify-between">
            <div>
              <a href="/" on:click={() => (menu_open = false)}>
                <img
                  src="whatsgreener-logo-site.png"
                  alt="whatsgreener"
                  width="220"
                />
              </a>
            </div>
            <div class="-mr-2">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                on:click={() => (menu_open = false)}
              >
                <span class="sr-only">Close menu</span>
                <!-- Heroicon name: outline/x -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="mt-6">
            <nav class="grid gap-y-8">
              <a
                href="/energy"
                class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                on:click={() => (menu_open = false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
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
                <span class="ml-3 text-base font-medium text-gray-900">
                  Energy
                </span>
              </a>

              <a
                href="/travel"
                class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                on:click={() => (menu_open = false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
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
                <span class="ml-3 text-base font-medium text-gray-900">
                  Travel
                </span>
              </a>

              <a
                href="/food"
                class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                on:click={() => (menu_open = false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
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
                <span class="ml-3 text-base font-medium text-gray-900">
                  Food
                </span>
              </a>

              <a
                href="/calculations"
                class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                on:click={() => (menu_open = false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8"
                  />
                </svg>
                <span class="ml-3 text-base font-medium text-gray-900">
                  Calculations
                </span>
              </a>
            </nav>
          </div>
        </div>
        <div class="space-y-6 py-6 px-5">
          <div class="grid grid-cols-2 gap-y-4 gap-x-8">
            <a
              href="https://github.com/florianperrenet/whatsgreener"
              target="_blank"
              class="flex items-center text-base font-medium text-gray-900 hover:text-gray-700"
            >
              <svg width="24" height="24" fill="currentColor"
                ><path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                /></svg
              >
              <span class="ml-3 text-base font-medium text-gray-900">
                Source code
              </span>
            </a>

            <a
              href="https://community.whatsgreener.xyz"
              target="_blank"
              class="flex items-center text-base font-medium text-gray-900 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span class="ml-3 text-base font-medium text-gray-900">
                Community chat
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div
      class="z-10"
      style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.15);"
      on:click={() => (menu_open = false)}
    />
  {/if}
</header>

<div class="z-10 bg-gray-900">
  <div class="max-w-container mx-auto px-4 py-1 sm:px-6 lg:px-8">
    <div class="flex flex-wrap items-center justify-between">
      <div class="flex w-0 flex-1 items-center">
        <span class="flex rounded-lg bg-gray-800 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
        <p class="ml-3 truncate font-medium text-white">
          <span>
            Data is not complete, therefore conclusions can not be made yet.</span
          >
        </p>
      </div>
      <!-- <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
				<button
					type="button"
					class="-mr-1 flex p-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
				>
					<span class="sr-only">Dismiss</span>
					<svg
						class="h-6 w-6 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div> -->
    </div>
  </div>
</div>
