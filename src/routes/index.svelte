<script context="module">
  export const prerender = true;
</script>

<script>
  import { onMount } from "svelte";

  import * as d3 from "d3";
  import * as topojson from "topojson-client";

  const size = 600;
  let worldEl;

  onMount(async () => {
    const width = size;
    const height = size;

    const projection = d3
      .geoOrthographic()
      .scale(300)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath(projection);
    const graticule = d3.geoGraticule10();

    const svg = d3
      .select(worldEl)
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
  <div class="max-w-container mx-auto px-4 pt-20 sm:px-6 lg:px-8 lg:pt-40">
    <div class="mb-20 lg:mb-80">
      <h1
        class="mb-10 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl"
      >
        <!-- or estimation tool? -->
        A proper footprint <br /> comparison tool.
      </h1>
      <div class="mt-6 flex">
        <ul class="list-inside list-disc text-2xl">
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
        <a href="/energy" class="text-lg font-bold">
          Compare Energy &nbsp;&rightarrow;
          <div class="h-3 w-10 border-b-4 border-gray-900" />
        </a>
        <div class="h-10" />
        <a href="/travel" class="text-lg font-bold">
          Compare Travel &nbsp;&rightarrow;
          <div class="h-3 w-12 border-b-4 border-gray-900" />
        </a>
        <div class="h-10" />
        <a href="/food" class="text-lg font-bold">
          Compare Food &nbsp;&rightarrow;
          <div class="h-3 w-14 border-b-4 border-gray-900" />
        </a>
        <div class="h-10" />
        <a href="/calculations" class="text-lg font-bold">
          View Calculations &nbsp;&rightarrow;
          <div class="h-3 w-16 border-b-4 border-gray-900" />
        </a>
      </div>
    </div>

    <div
      class="hidden overflow-hidden lg:absolute lg:top-60 lg:bottom-0 lg:right-0 lg:flex lg:w-1/2"
    >
      <div class="w-full">
        <div bind:this={worldEl} width={size} height={size} />
      </div>
    </div>
  </div>
</div>
