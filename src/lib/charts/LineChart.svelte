<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let data;

  let el;

  // const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  //   width = 460 - margin.left - margin.right,
  //   height = 400 - margin.top - margin.bottom;

  onMount(() => {
    const width = 1000;
    const height = 500;
    const margin = 5;
    const padding = 5;
    const adj = 100;

    const svg = d3
      .select(el)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr(
        "viewBox",
        "-" +
          adj +
          " -" +
          adj +
          " " +
          (width + adj * 3) +
          " " +
          (height + adj * 3)
      )
      .style("padding", padding)
      .style("margin", margin)
      .classed("svg-content", true);

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

    //----------------------------SCALES----------------------------//
    const xScale = d3.scaleLinear().range([0, width]);

    const yScale = d3.scaleLinear().rangeRound([height, 0]);

    xScale.domain(
      d3.extent(data.rows, function (d) {
        return d.distance;
      })
    );

    yScale.domain([
      0,
      d3.max(slices, function (c) {
        return d3.max(c.values, function (d) {
          return d.measurement + 4;
        });
      }),
    ]);

    //-----------------------------AXES-----------------------------//
    const yaxis = d3.axisLeft().ticks(slices[0].values.length).scale(yScale);

    const xaxis = d3.axisBottom().ticks(slices[0].values.length).scale(xScale);

    //----------------------------LINES-----------------------------//
    const line = d3
      .line()
      .x(function (d) {
        return xScale(d.distance);
      })
      .y(function (d) {
        return yScale(d.measurement);
      });

    let id = 0;
    const ids = function () {
      return "line line-" + id++;
    };

    //-------------------------2. DRAWING---------------------------//
    //-----------------------------AXES-----------------------------//
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xaxis)
      .append("text")
      .attr("x", width / 2 + 100)
      .attr("y", 50)
      .style("text-anchor", "end")
      .text("Distance");

    svg
      .append("g")
      .attr("class", "axis")
      .call(yaxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("dy", ".75em")
      .attr("y", 6)
      .style("text-anchor", "end")
      .text("Impact");

    //----------------------------LINES-----------------------------//
    const lines = svg.selectAll("lines").data(slices).enter().append("g");

    let dasharray = 0;
    const dasharrayFunc = () => {
      return dasharray++;
    };

    var myColor = d3
      .scaleSequential()
      .domain([1, 10])
      .interpolator(d3.interpolateViridis);

    lines
      .append("path")
      .style("fill", "none")
      .style("stroke", (d, i) => myColor(i))
      // .style("stroke", (d, i) => {
      //   return myColor(i);
      // })
      // .style("stroke-dasharray", dasharrayFunc)
      .attr("d", function (d) {
        return line(d.values);
      });

    lines
      .append("text")
      .attr("class", "serie_label")
      .datum(function (d) {
        return {
          id: d.id,
          value: d.values[d.values.length - 1],
        };
      })
      .attr("transform", function (d) {
        return (
          "translate(" +
          (xScale(d.value.distance) + 10) +
          "," +
          (yScale(d.value.measurement) + 5) +
          ")"
        );
      })
      .attr("x", 5)
      .text(function (d) {
        return d.id;
      });
  });
</script>

<div bind:this={el} />
