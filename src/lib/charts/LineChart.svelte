<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let data;
  export let xlabel;
  export let ylabel;

  let chart;
  let legend = [];

  const margin = { top: 20, right: 20, bottom: 35, left: 40 };

  const height = 560;
  const width = 1000;

  onMount(() => {
    const svg = d3
      .select(chart)
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);

    var slices = data.columns.map(function (id) {
      return {
        id: id,
        values: data.rows.map(function (d) {
          return {
            distance: d.distance,
            measurement: +d[id],
          };
        }),
      };
    });

    //-------------------------2. DRAWING---------------------------//
    //-----------------------------AXES-----------------------------//
    const x = d3.scaleLinear(
      d3.extent(data.rows, function (d) {
        return d.distance;
      }),
      [margin.left, width - margin.right]
    );
    const y = d3.scaleLinear(
      [
        0,
        d3.max(slices, function (c) {
          return d3.max(c.values, function (d) {
            return d.measurement;
          });
        }),
      ],
      [height - margin.bottom, margin.top]
    );

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80))
        // .call(xaxis)
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .append("text")
            .attr("x", width)
            .attr("y", margin.bottom - 4)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(`${xlabel} →`)
        );
    svg.append("g").call(xAxis);

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        // .call(yaxis)
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(`↑ ${ylabel}`)
        );
    svg.append("g").call(yAxis);

    const grid = (g) =>
      g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call((g) =>
          g
            .append("g")
            .selectAll("line")
            .data(x.ticks())
            .join("line")
            .attr("x1", (d) => 0.5 + x(d))
            .attr("x2", (d) => 0.5 + x(d))
            .attr("y1", margin.top)
            .attr("y2", height - margin.bottom)
        )
        .call((g) =>
          g
            .append("g")
            .selectAll("line")
            .data(y.ticks())
            .join("line")
            .attr("y1", (d) => 0.5 + y(d))
            .attr("y2", (d) => 0.5 + y(d))
            .attr("x1", margin.left)
            .attr("x2", width - margin.right)
        );
    svg.append("g").call(grid);

    //----------------------------LINES-----------------------------//
    const line = d3
      .line()
      .x(function (d) {
        return x(d.distance);
      })
      .y(function (d) {
        return y(d.measurement);
      });

    const lines = svg.selectAll("lines").data(slices).enter().append("g");
    const color = d3.scaleOrdinal(
      slices.map((d) => d.id),
      d3.schemeCategory10
    );

    lines
      .append("path")
      .style("fill", "none")
      .style("stroke", (d) => color(d))
      .attr("d", function (d) {
        return line(d.values);
      });

    const items = [];
    for (const item of color.domain()) {
      if (typeof item === "string") {
        items.push([item, color(item)]);
      }
    }
    legend = items;
  });
</script>

<div bind:this={chart} />
<div class="flex flex-wrap gap-x-3 ml-10 mt-5">
  {#each legend as [item, color]}
    <div class="flex items-center text-xs">
      <div class="w-2 h-2 mr-2" style="background: {color};" />
      {item}
    </div>
  {/each}
</div>
