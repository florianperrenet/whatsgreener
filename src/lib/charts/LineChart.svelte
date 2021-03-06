<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let data;
  export let xlabel;
  export let ylabel;

  let chart;

  export let margin = { top: 20, right: 110, bottom: 35, left: 30 };
  export let height = 560;
  export let width = 700;

  function descendingOnKey(key) {
    return function (a, b) {
      return b[key] - a[key];
    };
  }

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
            .attr("x", width - margin.right)
            // .attr("x", (width - margin.right) / 2)
            .attr("y", margin.bottom)
            .attr("font-weight", "bold")
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
            .attr("font-weight", "bold")
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(`↑ ${ylabel}`)
        );
    svg.append("g").call(yAxis);

    const grid = (g) =>
      g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.2)
        // .call((g) =>
        //   g
        //     .append("g")
        //     .selectAll("line")
        //     .data(x.ticks())
        //     .join("line")
        //     .attr("x1", (d) => 0.5 + x(d))
        //     .attr("x2", (d) => 0.5 + x(d))
        //     .attr("y1", margin.top)
        //     .attr("y2", height - margin.bottom)
        // )
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
            .style("stroke-dasharray", 3)
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
    var tooltip = d3
      .select(chart)
      .append("div")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("background-color", "rgba(255, 255, 255, 0.95)")
      .style(
        "box-shadow",
        "rgb(0 0 0 / 12%) 0px 2px 2px, rgb(0 0 0 / 35%) 0px 0px 1px"
      )
      .style("border-radius", 2)
      .style("text-align", "left")
      .style("font-size", "0.9em")
      .style("white-space", "nowrap")
      .style("padding", "0.3em");

    var mouseLine = svg
      .append("g")
      .append("path") // create vertical line to follow mouse
      .attr("id", "mouse-line")
      .style("stroke", "#A9A9A9")
      .style("stroke-width", 1)
      .style("opacity", 0);

    lines
      .append("path")
      .style("fill", "none")
      .style("stroke-width", 1.5)
      .style("stroke", (d) => {
        return color(d.id);
      })
      .attr("d", function (d) {
        return line(d.values);
      });

    lines
      .append("circle")
      // .attr("stroke", (d) => color(d))
      .style("fill", (d) => color(d.id))
      .attr("r", 5)
      .style("opacity", 0)
      .attr("class", "focus-circle");

    lines
      .append("text")
      .style("font-size", "0.7em")
      .style("fill", (d) => color(d.id))
      .datum(function (d) {
        return {
          id: d.id,
          value: d.values[d.values.length - 1],
        };
      })
      .attr("transform", function (d) {
        return (
          "translate(" +
          (x(d.value.distance) + 10) +
          "," +
          (y(d.value.measurement) + 5) +
          ")"
        );
      })
      .attr("x", 5)
      .text((d) => d.id);

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
      // focus.style("opacity", 1);
      tooltip.style("opacity", 1);
      mouseLine.style("opacity", 1);

      d3.selectAll(".focus-circle").style("opacity", 1);
    }

    function mousemove(e) {
      const pointer = d3.pointer(e);
      const x0 = x.invert(pointer[0]);

      const value_index = bisect(slices[0].values, x0);
      const len = slices[0].values.length;

      if (value_index >= len) return;

      const selectedData = slices[0].values[value_index];

      const x_val = x(selectedData.distance);
      const y_val = y(selectedData.measurement);

      mouseLine.attr("d", () => {
        let s = `M${x_val},${height}`;
        s += ` ${x_val},0`;
        return s;
      });

      const pointerRel = d3.pointer(e, d3.select(chart).node());
      const pointermouseline = d3.pointer(e, d3.select("#mouse-line").node());

      // focus.attr("cx", x_val).attr("cy", y_val);

      const circles = d3
        .selectAll(".focus-circle")
        .attr("cx", x_val)
        .attr("cy", (d) => y(d.values[value_index].measurement));

      const values_sorted = [];
      for (const slice of slices) {
        const val = slice.values[value_index];
        values_sorted.push({
          id: slice.id,
          color: color(slice.id),
          ...val,
        });
      }
      values_sorted.sort(descendingOnKey("measurement"));

      let trs = "";
      for (const item of values_sorted) {
        trs += `<tr style="color: ${item.color}">
          <td style="background-color: ${
            item.color
          }; width: 10px; height: 10px; border-radius: 5px; display: inline-block; margin-right: 2px;"></td>
            <td style="padding-right: 0.8em; font-weight: 700;">${item.id}</td>
            <td style="text-align: right; white-space: nowrap; font-weight: 700;">${item.measurement.toFixed(
              2
            )}</td>
          </tr>`;
      }

      tooltip
        .html(
          `<table style="font-size: 0.7em"><thead><tr><td colspan="3"><strong>${selectedData.distance}</strong></td></tr></thead><tbody>${trs}</tbody></table>`
        )
        .style("left", pointerRel[0] + 40 + "px")
        .style("top", pointerRel[1] + "px");
      // .attr("y", height / 3);
    }
    function mouseout() {
      // focus.style("opacity", 0);
      tooltip.style("opacity", 0);
      mouseLine.style("opacity", 0);
      d3.selectAll(".focus-circle").style("opacity", 0);
    }
  });
</script>

<div
  style="position: relative;"
  class="shadow ring-1 ring-gray-900 ring-opacity-5 rounded"
>
  <div class="flex items-center border-b border-gray-200 mb-3 p-3">
    <div class="grow">
      <div class="leading-none text-gray-900 mb-1">
        Travel impact over distance
      </div>
      <div class="text-sm max-w-lg">Some description</div>
    </div>
    <div class="flex-none">
      <img src="/whatsgreener-logo-site.png" alt="" width="125" />
    </div>
  </div>

  <div bind:this={chart} class="relative p-3" />
  <div class="pl-3 pb-3 text-xs">
    <div>Source: <a href="/calculations">Calculations</a></div>
    <div>Note: Something</div>
  </div>
</div>
