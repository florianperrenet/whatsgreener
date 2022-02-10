<script>
	import { page } from "$app/stores";
</script>

<header
	class="flex-none relative z-50 text-lg font-semibold ring-1 ring-gray-900 ring-opacity-5 shadow-sm py-3 bg-white"
>
	<nav aria-label="Global" class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center flex-wrap sm:flex-nowrap">
			<a href="/" class="logo mr-3 text-4xl font-bold">
				<img src="/whatsgreener-logo-site.png" alt="whatsgreener" width="220" />
			</a>
			<a
				href="#githublink"
				class="text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5"
			>
				v0.0.1-BETA
			</a>

			<div
				class="w-full flex-none mt-4 sm:mt-0 sm:w-auto sm:ml-auto flex items-center"
			>
				<nav class="text-sm leading-6 font-semibold text-slate-700">
					<a
						sveltekit:prefetch
						href="/travel"
						class={$page.url.pathname === "/travel"
							? "text-blue-500"
							: "hover:text-blue-500/90"}>Travel</a
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
		</div>
	</nav>
</header>

<style>
	.logo {
		font-family: "Cardo";
	}
</style>
