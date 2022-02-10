<script context="module">
	export const prerender = true;
</script>

<script>
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="relative w-full">
	<!-- <div
		class="relative w-full"
		style="background: url('https://nachhaltig-vorsorgen.zurich.de/static/media/start.b4042ca8.svg'); background-position-y: 70%; background-repeat: no-repeat;"
		> -->
	<!-- <div class="relative w-full"> -->
	<div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-40 z-10">
		<h1 class="font-extrabold text-5xl text-slate-900 text-center">
			<!-- A proper footprint comparison tool. -->
			A proper footprint calculator.
		</h1>
		<div class="flex justify-center mt-6">
			<ul class="text-2xl list-disc list-inside">
				<li class="mb-2">
					<a href="#" class="after:content-['_↗']">Open source</a>
				</li>
				<li>
					<a href="/calculations" class="after:content-['_↗']"
						>No bias, pure facts</a
					>
				</li>
				<!-- <li class="after:content-['_↗']">Fact checkable.</li> -->
				<!-- <li>Community driven research.</li> -->
			</ul>
		</div>
		<div class="mt-12 flex justify-center space-x-6 text-sm">
			<a
				sveltekit:prefetch
				href="/travel"
				class="bg-sky-500 font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto text-white"
				>Travel</a
			>
			<a
				sveltekit:prefetch
				href="/food"
				class="bg-sky-500 font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto text-white"
				>Food</a
			>
		</div>
	</div>
	<div
		class="absolute top-0 left-0 h-full w-full"
		style="z-index: -1; background: url('https://images.unsplash.com/photo-1500314144216-35ed69e42b7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'); background-position-y: 70%; background-repeat: no-repeat; background-size: cover;"
	/>
</div>
