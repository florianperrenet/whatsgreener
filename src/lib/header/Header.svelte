<script>
	import { page } from "$app/stores";

	const urls = [
		["Travel", "/travel"],
		["Food", "/food"],
		["View calculations", "/calculations"],
	];
</script>

<header
	class="sticky top-0 flex-none relative z-50 text-lg font-semibold ring-1 ring-gray-900 ring-opacity-5 shadow-sm py-3 bg-white"
>
	<nav aria-label="Global" class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center flex-wrap sm:flex-nowrap">
			<a href="/" class="mr-3 text-4xl font-bold">
				<img src="whatsgreener-logo-site.png" alt="whatsgreener" width="220" />
			</a>
			<a
				href="https://github.com/florianperrenet/whatsgreener"
				class="text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5"
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
				class="hidden w-full mt-4 sm:mt-0 sm:w-auto sm:ml-auto md:flex items-center"
			>
				<nav class="text-sm leading-6 font-semibold text-slate-700">
					<a
						sveltekit:prefetch
						href="/energy"
						class={$page.url.pathname === "/energy"
							? "text-blue-500"
							: "hover:text-blue-500/90"}>Energy</a
					>
					<a
						sveltekit:prefetch
						href="/travel"
						class="ml-6 {$page.url.pathname === '/travel'
							? 'text-blue-500'
							: 'hover:text-blue-500/90'}">Travel</a
					>
					<a
						sveltekit:prefetch
						href="/food"
						class="mx-6 {$page.url.pathname === '/food'
							? 'text-blue-500'
							: 'hover:text-blue-500/90'}">Food</a
					>
					<a
						sveltekit:prefetch
						href="/calculations"
						class="border-l border-gray-200 pl-6 {$page.url.pathname ===
						'/calculations'
							? 'text-blue-500'
							: 'hover:text-blue-500/90'}">View calculations</a
					>
				</nav>
			</div>

			<div class="md:hidden ml-auto">
				<button
					type="button"
					class="flex items-center justify-center text-slate-700"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</nav>
</header>
