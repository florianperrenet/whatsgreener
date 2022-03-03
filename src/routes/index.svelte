<script context="module">
	export const prerender = true;
</script>

<script>
	import { onMount } from "svelte";

	import * as d3 from "d3";
	import * as topojson from "topojson-client";

	const size = 600;

	onMount(async () => {
		const el = document.getElementById("my_dataviz");

		const width = size;
		const height = size;

		const projection = d3
			.geoOrthographic()
			.scale(300)
			.translate([width / 2, height / 2]);
		const path = d3.geoPath(projection);
		const graticule = d3.geoGraticule10();

		const svg = d3
			.select(el)
			.append("svg")
			.attr("class", "map")
			.attr("width", size)
			.attr("height", size);

		svg
			.append("defs")
			.append("path")
			.datum({ type: "Sphere" })
			.attr("id", "sphere")
			.attr("d", path);

		svg
			.append("use")
			.attr("class", "fill")
			.attr("fill", "#fff")
			.attr("xlink:href", "#sphere");

		svg
			.append("path")
			.datum(graticule)
			.attr("class", "graticule")
			.attr("fill", "none")
			.attr("stroke", "#ccc")
			.attr("stroke-width", ".5px")
			// .attr("stroke-opacity", ".5")
			.attr("d", path);

		const response = await fetch("/world-110m.json");
		const world = await response.json();

		const land = topojson.feature(world, world.objects.land),
			// countries = topojson.feature(world, world.objects.countries).features;
			borders = topojson.mesh(world, world.objects.countries, function (a, b) {
				return a !== b;
			});

		// add land
		svg
			.append("path", ".graticule")
			.datum(land)
			.attr("class", "land")
			.attr("fill", "black")
			.attr("d", path);

		// add borders
		svg
			.append("path", ".graticule")
			.datum(borders)
			.attr("class", "boundary")
			.attr("d", path)
			.attr("fill", "none")
			.attr("stroke", "#fff")
			.attr("stroke-width", "0.5")
			.attr("stroke-opacity", "0.3")
			.attr("d", path);

		svg
			.append("use")
			.attr("class", "stroke")
			.attr("fill", "none")
			.attr("stroke", "#000")
			.attr("stroke-width", "1")
			.attr("xlink:href", "#sphere");

		d3.timer((elapsed) => {
			projection.rotate([0.002 * elapsed, 0, 0]);
			svg.selectAll("path").attr("d", path);
		});
	});
</script>

<svelte:head>
	<title>whatsgreener</title>
</svelte:head>

<div class="relative w-full bg-white">
	<div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 lg:pt-40 pt-20">
		<div class="mb-20 lg:mb-80">
			<h1
				class="font-extrabold md:text-6xl sm:text-5xl text-4xl text-slate-900 mb-10 leading-tight"
			>
				A proper footprint <br /> comparison tool.
			</h1>
			<div class="flex mt-6">
				<ul class="text-2xl list-disc list-inside">
					<li class="mb-2">
						<a
							href="https://github.com/florianperrenet/whatsgreener"
							target="_blank">Open source</a
						>
					</li>
					<li>
						<a href="/calculations">No bias; pure facts</a>
					</li>
				</ul>
			</div>
			<div class="mt-16 text-sm">
				<a href="/energy" class="font-bold text-lg">
					Compare Energy &nbsp;&rightarrow;
					<div class="border-b-4 border-gray-900 w-10 h-3" />
				</a>
				<div class="h-10" />
				<a href="/travel" class="font-bold text-lg">
					Compare Travel &nbsp;&rightarrow;
					<div class="border-b-4 border-gray-900 w-12 h-3" />
				</a>
				<div class="h-10" />
				<a href="/food" class="font-bold text-lg">
					Compare Food &nbsp;&rightarrow;
					<div class="border-b-4 border-gray-900 w-14 h-3" />
				</a>
				<div class="h-10" />
				<a href="/calculations" class="font-bold text-lg">
					View Calculations &nbsp;&rightarrow;
					<div class="border-b-4 border-gray-900 w-16 h-3" />
				</a>
			</div>
		</div>

		<div
			class="hidden lg:flex lg:absolute lg:top-60 lg:bottom-0 lg:right-0 lg:w-1/2 overflow-hidden"
		>
			<div class="w-full">
				<div id="my_dataviz" width={size} height={size} />
			</div>
		</div>
	</div>
</div>
