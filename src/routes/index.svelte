<script context="module">
	export const prerender = true;
</script>

<script>
	import { onMount } from "svelte";

	import * as d3 from "d3";
	import * as topojson from "topojson-client";

	const size = 600;

	onMount(async () => {
		// 	.stroke {
		//   fill: none;
		//   stroke: #000;
		//   stroke-width: 1px;
		// }

		// .fill {
		//   fill: #f2f2f2;
		// }

		// .graticule {
		//   fill: none;
		//   stroke: #777;
		//   stroke-width: .5px;
		//   stroke-opacity: .5;
		// }

		// .land {
		//   fill: darkgrey;
		// }
		// .boundary {
		//   fill: none;
		//   stroke: #fff;
		//   stroke-width: .5px;
		// }

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

		// var canvas = document.getElementById("my_dataviz");
		// const projection = d3
		// 	// .geoEqualEarth()
		// 	.geoOrthographic();
		// // .geoNaturalEarth1()
		// // .scale(width / 1.3 / Math.PI)
		// // .translate([width / 2, height / 2]);
		// const context = canvas.getContext("2d");
		// const path = d3.geoPath(projection, context);
		// const response = await fetch("/land-50m.json");
		// const world = await response.json();
		// const outline = { type: "Sphere" };
		// const graticule = d3.geoGraticule10();
		// const land = topojson.feature(world, world.objects.land);
		// const width = size;
		// const height = (() => {
		// 	const [[x0, y0], [x1, y1]] = d3
		// 		.geoPath(projection.fitWidth(width, outline))
		// 		.bounds(outline);
		// 	const dy = Math.ceil(y1 - y0),
		// 		l = Math.min(Math.ceil(x1 - x0), dy);
		// 	projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
		// 	return dy;
		// })();
		// // const context = canvas.context2d(width, height);
		// function render() {
		// 	context.clearRect(0, 0, width, height);
		// 	context.save();
		// 	context.beginPath(),
		// 		path(outline),
		// 		context.clip(),
		// 		(context.fillStyle = "#fff"),
		// 		context.fillRect(0, 0, width, height);
		// 	context.beginPath(),
		// 		path(graticule),
		// 		(context.strokeStyle = "#ccc"),
		// 		context.stroke();
		// 	context.beginPath(),
		// 		path(land),
		// 		(context.fillStyle = "#333"),
		// 		context.fill();
		// 	context.restore();
		// 	context.beginPath(),
		// 		path(outline),
		// 		(context.strokeStyle = "#000"),
		// 		context.stroke();
		// }
		// render();
		// for (let x = 0; true; ++x) {
		// 	projection.rotate([x / 10, 0, 0]);
		// 	render();
		// 	// context.beginPath(), path(land), context.fill();
		// 	// context.beginPath(), path(sphere), context.stroke();
		// 	// await visibility();
		// 	await new Promise((r) => setTimeout(r, 100));
		// }
		// d3.timer((elapsed) => {
		// 	projection.rotate([0.001 * elapsed, 0, 0]);
		// 	render();
		// });
		// 			const projection = d3.geoOrthographic().fitExtent([[1, 1], [width - 1, height - 1]], sphere);
		//   const path = d3.geoPath(projection, context);
		//   const figure = html`<figure>
		//   ${context.canvas}
		//   <figcaption>Rotating lambda (+λ).</figcaption>
		// </figure>`;
		// 			for (let x = 0; true; ++x) {
		//     projection.rotate([x / 10, 0, 0]);
		//     context.clearRect(0, 0, width, height);
		//     context.beginPath(), path(land), context.fill();
		//     context.beginPath(), path(sphere), context.stroke();
		//     yield figure;
		//     await visibility();
		//   }
		// // select the canvas element created in the html.
		// var canvas = document.getElementById("my_dataviz");
		// // Actual width and height. No idea if clienWidth would be a better option..?
		// var width = canvas.offsetWidth;
		// var height = canvas.offsetHeight;
		// // Set a projection for the map. Projection = transform a lat/long on a position on the 2d map.
		// var projection = d3
		// 	.geoEqualEarth()
		// 	// .geoNaturalEarth1()
		// 	.scale(width / 1.3 / Math.PI)
		// 	.translate([width / 2, height / 2]);
		// // Get the 'context'
		// var ctx = canvas.getContext("2d");
		// // geographic path generator for given projection and canvas context
		// const pathGenerator = d3.geoPath(projection, ctx);
		// // Draw a background
		// // ctx.fillStyle = '#ddd';
		// // ctx.fillRect(0, 0, width, height);
		// // Load external data and boot
		// const response = await fetch(
		// 	"https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
		// );
		// const data = await response.json();
		// // initialize the path
		// ctx.beginPath();
		// // Got the positions of the path
		// pathGenerator(data);
		// // Fill the paths
		// ctx.fillStyle = "#999";
		// ctx.fill();
		// // Add stroke
		// // ctx.strokeStyle = "#69b3a2";
		// // ctx.stroke();
	});
</script>

<svelte:head>
	<title>whatsgreener</title>
</svelte:head>

<div class="relative w-full bg-white">
	<div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-40">
		<div class="mb-20">
			<h1 class="font-extrabold text-6xl text-slate-900 mb-10 leading-tight">
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

		<!-- <div class="xl:absolute xl:top-20 xl:bottom-0 xl:right-0 xl:w-1/2">
			<div
				class="w-full bg-gray-100 rounded-lg shadow-lg"
				style="height: 700px;"
			/>
		</div> -->
		<!-- style="background: url('/screenshot.png'); background-size: cover; height: 700px;" -->

		<div class="xl:absolute xl:top-60 xl:bottom-0 xl:right-0 xl:w-1/2">
			<div class="w-full">
				<div id="my_dataviz" width={size} height={size} />
			</div>
		</div>
		<!-- <div class="h-40" />

		<hr class="mt-10 mb-10" />

		<div class="mb-10">
			<h2 class="font-bold text-4xl text-slate-900">Compare Food</h2>
		</div>

		<div
			class="w-full bg-gray-200 rounded-lg shadow-lg mb-20"
			style="height: 700px;"
		/>

		<hr class="my-10" />

		<div class="mb-10">
			<h2 class="font-bold text-4xl text-slate-900">View Calculations</h2>
		</div>

		<div
			class="w-full bg-gray-200 rounded-lg shadow-lg mb-20"
			style="height: 700px;"
		/> -->
	</div>

	<!-- <div
		style="background: url(''); background-size: cover; height: 100%; width: 100%; position: absolute; top: 0; left: 0; opacity: 1; z-index: 0;"
	/> -->

	<div class="py-20" />
</div>
