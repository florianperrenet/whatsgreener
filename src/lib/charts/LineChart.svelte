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

    // This allows to find the closest X index of the mouse:
    var bisect = d3.bisector(function (d) {
      return d.distance;
    }).left;

    // Create the circle that travels along the curve of chart
    var focus = svg
      .append("g")
      .append("circle")
      .style("fill", "none")
      .attr("stroke", "black")
      .attr("r", 8.5)
      .style("opacity", 0);

    // Create the text that travels along the curve of chart
    var focusText = svg
      .append("g")
      .append("text")
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle");

    var mouseLine = svg
      .append("g")
      .append("path") // create vertical line to follow mouse
      .style("stroke", "#A9A9A9")
      .style("stroke-width", 1)
      .style("opacity", 0);

    lines
      .append("path")
      .style("fill", "none")
      .style("stroke", (d) => color(d))
      .attr("d", function (d) {
        return line(d.values);
      });

    lines
      .append("circle")
      // .attr("stroke", (d) => color(d))
      .style("fill", (d) => color(d))
      .attr("r", 5)
      .style("opacity", 0)
      .attr("class", "focus-circle");

    svg
      .append("rect")
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseout", mouseout);

    // What happens when the mouse move -> show the annotations at the right positions.
    function mouseover() {
      focus.style("opacity", 1);
      focusText.style("opacity", 1);
      mouseLine.style("opacity", 1);

      d3.selectAll(".focus-circle").style("opacity", 1);
    }

    function mousemove(e) {
      const pointer = d3.pointer(e);
      const x0 = x.invert(pointer[0]);

      const value_index = bisect(slices[0].values, x0);
      const selectedData = slices[0].values[value_index];

      const x_val = x(selectedData.distance);
      const y_val = y(selectedData.measurement);

      // focus.attr("cx", x_val).attr("cy", y_val);

      const circles = d3
        .selectAll(".focus-circle")
        .attr("cx", x_val)
        .attr("cy", (d) => y(d.values[value_index].measurement));

      mouseLine.attr("d", () => {
        let s = `M${x_val},${height}`;
        s += ` ${x_val},0`;
        return s;
      });

      focusText
        .html("test")
        .attr("x", x_val)
        .attr("y", height / 2);
    }
    function mouseout() {
      focus.style("opacity", 0);
      focusText.style("opacity", 0);
      mouseLine.style("opacity", 0);
      d3.selectAll(".focus-circle").style("opacity", 0);
    }

    const items = [];
    for (const item of color.domain()) {
      if (typeof item === "string") {
        console.log(item);
        items.push([item, color({ id: item })]);
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
