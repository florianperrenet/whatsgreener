import * as d3 from "d3";

const LABELS_SPACE = 10;


function descendingOnKey(key) {
  return function (a, b) {
    return b[key] - a[key];
  };
}

export function chart(conf) {
  console.log(conf.relative)

  const el = d3.select(conf.el);
  // first clear the div, in case of redraw
  el.selectAll("svg").remove();
  el.selectAll(".tooltip").remove();

  // chart columns / keys
  const keys = Object.keys(conf.series);

  // remap data
  const data = [];
  if (conf.relative) {
    for (const [x_index, x_value] of conf.x.entries()) {
      const row = { x: x_value, total: 0 };
      for (const [serie_key, serie_value] of Object.entries(conf.series)) {
        row.total += serie_value[x_index];
      }
      for (const [serie_key, serie_value] of Object.entries(conf.series)) {
        row[serie_key] = serie_value[x_index] / row.total;
      }
      data.push(row);
    }
  } else {
    for (const [x_index, x_value] of conf.x.entries()) {
      const row = { x: x_value };
      for (const [serie_key, serie_value] of Object.entries(conf.series)) {
        row[serie_key] = serie_value[x_index];
      }
      data.push(row);
    }
  }

  // stack the data?
  var stackedData = d3.stack()
    .keys(keys)
    (data)

  // find overall max of stackedData
  const maxY = d3.max(stackedData, function (d) {
    return d3.max(d, function (v) {
      return v[1];
    })
  });

  // color palette
  var color = d3.scaleOrdinal()
    .domain(keys)
    // .range(d3.schemeSet2);
    .range(d3.schemeTableau10);









  // append the svg object to the body of the page
  const svg = el
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${conf.width} ${conf.height}`)
    .append("g")
  // .attr("width", conf.width)
  // .attr("height", conf.height)



  //////////
  // HIGHLIGHT GROUP //
  //////////

  // What to do when one group is hovered
  var highlight = function (e, d) {
    // reduce opacity of all groups
    svg.selectAll(".area").style("opacity", .1)
    // except the one that is hovered
    svg.select(".area." + d).style("opacity", 1)

    svg.selectAll(".label").style("opacity", .3);
    svg.select(".label." + d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  var noHighlight = function (e) {
    svg.selectAll(".area").style("opacity", 1)
    svg.selectAll(".label").style("opacity", 1);
  }





  //////////
  // LEGEND //
  //////////

  // Add one dot in the legend for each name.
  var size = 10
  // svg.append("g").selectAll("myrect")
  //   .data(keys)
  //   .enter()
  //   .append("rect")
  //   .attr("x", conf.width)
  //   .attr("y", function (d, i) { return 10 + i * (size + 5) }) // 100 is where the first dot appears. 25 is the distance between dots
  //   .attr("width", size)
  //   .attr("height", size)
  //   .style("fill", function (d) { return color(d) })
  //   .on("mouseover", highlight)
  //   .on("mouseleave", noHighlight)

  // Add one dot in the legend for each name.
  const legendItems = svg.append("g").attr("class", "legend").selectAll("mylabels")
    .data(keys)
    .enter()
    .append("g")
    .attr("class", "legend-item")

  legendItems.append("g")
    .attr("class", d => "item-indicator " + d)

  legendItems.append("rect")
    .attr("class", d => "item-rect " + d)

  legendItems.append("text")
    .attr("class", d => "item-label " + d)
    // .attr("x", 400 + 5 + size * 1.2)
    // .attr("y", function (d, i) { return 10 + i * (size + 5) + (size / 2) }) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function (d) { return color(d) })
    .text(function (d) { return d })
    .attr("text-anchor", "start")
    .style("alignment-baseline", "middle")
    .style("cursor", "default")
    .attr("font-size", "70%")
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight)

  // const labels = svg.append("g").attr("class", "legend").selectAll("mylabels")
  //   .data(keys)
  //   .enter()
  //   .append("g")
  //   .attr("class", "legend-item")
  //   .append("text")
  //   .attr("class", d => "label " + d)
  //   // .attr("x", 400 + 5 + size * 1.2)
  //   .attr("y", function (d, i) { return 10 + i * (size + 5) + (size / 2) }) // 100 is where the first dot appears. 25 is the distance between dots
  //   .style("fill", function (d) { return color(d) })
  //   .text(function (d) { return d })
  //   .attr("text-anchor", "start")
  //   .style("alignment-baseline", "middle")
  //   .style("cursor", "default")
  //   .attr("font-size", "70%")
  //   .on("mouseover", highlight)
  //   .on("mouseleave", noHighlight)


  const legend = svg.select(".legend");
  let labelWidthMax = legend.node().getBBox().width;
  const labelHeight = legendItems.select('.item-label')._groups[0][0].getBBox().height;

  const margin = {
    top: 30,
    bottom: 50,
    right: labelWidthMax + LABELS_SPACE,
  };


  // chart size
  const height = conf.height - margin.top - margin.bottom;

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, maxY])
    .range([height, 0]);

  const yTicks = d3.axisLeft(y).ticks(5);
  if (conf.relative)
    yTicks.tickFormat(d3.format(".0%"));

  const yAxis = svg.append("g")
    .attr("class", "yAxis")
    .call(yTicks)

  const yAxisWidth = yAxis.node().getBBox().width;
  // update left margin
  margin.left = yAxisWidth;


  svg.attr("transform",
    "translate(" + margin.left + "," + margin.top + ")")


  const width = conf.width - margin.left - margin.right;









  //////////
  // AXIS //
  //////////

  // Add X axis
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function (d) { return d.x; }))
    .range([0, width]);

  var xAxis = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")))

  // Add X axis label:
  svg.append("text")
    .attr("class", "xLabel")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 40)
    .text(conf.xlabel + " →")
    .attr("font-size", "70%");

  // Add Y axis label:
  svg.append("text")
    .attr("class", "yLabel")
    .attr("text-anchor", "start")
    .attr("x", -margin.left)
    .attr("y", -20)
    .text("↑ " + conf.ylabel)
    .attr("font-size", "70%")


  const grid = (g) =>
    g
      .attr("class", "grid")
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
          .data(y.ticks(5).slice(1))
          .join("line")
          .attr("y1", (d) => 0.5 + y(d))
          .attr("y2", (d) => 0.5 + y(d))
          .attr("x1", 0)
          .attr("x2", width)
          .style("stroke-dasharray", 3)
      );
  if (!conf.relative)
    svg.append("g").call(grid);




  //////////
  // BRUSHING AND CHART //
  //////////

  // Add a clipPath: everything out of this area won't be drawn.
  var clip = svg.append("defs").append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0);

  // Add brushing
  var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
    .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

  // Create the scatter variable: where both the circles and the brush take place
  var areaChart = svg.append('g')
    .attr("clip-path", "url(#clip)")

  // Area generator
  var area = d3.area()
    .x(function (d) { return x(d.data.x); })
    .y0(function (d) { return y(d[0]); })
    .y1(function (d) { return y(d[1]); })

  // Show the areas
  areaChart
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
    .attr("class", function (d) { return "area " + d.key })
    .style("stroke", "rgba(0, 0, 0, 0.2)")
    .style("fill", function (d) { return color(d.key); })
    .style("fill-opacity", 0.7)
    .attr("d", area)

  // Add the brushing
  areaChart
    .append("g")
    .attr("class", "brush")
    .call(brush);

  var idleTimeout
  function idled() { idleTimeout = null; }

  // A function that update the chart for given boundaries
  function updateChart(e) {

    let extent = e.selection

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if (!extent) {
      if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
      x.domain(d3.extent(data, function (d) { return d.x; }))
    } else {
      x.domain([x.invert(extent[0]), x.invert(extent[1])])
      areaChart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
    }

    // Update axis and area position
    xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5))
    areaChart
      .selectAll("path")
      .transition().duration(1000)
      .attr("d", area)
  }



  const labels = legendItems.selectAll('.item-label');
  let minplacement = 0;
  labels.attr("x", width + LABELS_SPACE).attr("y", (d, i) => {
    const index = keys.indexOf(d);


    // place the label in the middle
    const items = stackedData[index];
    const [y_lower, y_upper] = items[items.length - 1];
    let between = y_lower + (y_upper - y_lower) / 2;

    let yplacement = y(between);

    console.log(d, yplacement, minplacement)

    if (index !== 0 && yplacement > minplacement) {
      console.log(true)

      yplacement = minplacement;
    }

    minplacement = yplacement - labelHeight;
    return yplacement;






    // let yinverted = y.invert(yplacement)

    // let placementdiff = Math.abs(minplacement - yplacement)

    // console.log(d, yinverted, minplacement)
    // if (yinverted <= minplacement) {
    //   yplacement = minplacement;
    //   console.log(true, yplacement, y.invert(100))
    //   // yinverted = y.invert(yplacement);
    //   // yplacement = spacetaken - labelHeight
    // }
    // minplacement = yinverted + 100;


    // return yplacement;
  });






  const tooltip = el
    .append("div")
    .attr("class", "tooltip")
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
    // .style("stroke", "#A9A9A9")
    .style("stroke", "rgba(180,180,180,.4)")
    .style("stroke-width", 1)
    .style("opacity", 0);

  const rect = svg
    .append("rect")
    .attr("class", "pointer-events")
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseout);





  function mouseover() {
    // focus.style("opacity", 1);
    tooltip.style("opacity", 1);
    mouseLine.style("opacity", 1);
    // d3.selectAll(".focus-circle").style("opacity", 1);
  }

  var bisect = d3.bisector(function (d) {
    return d.distance;
  }).left;

  function mousemove(e) {
    const pointer = d3.pointer(e);
    const x0 = x.invert(pointer[0]);
    const xindex = d3.bisectLeft(conf.x, x0);
    const xval = conf.x[xindex];
    const xpos = x(xval);

    mouseLine.attr("d", () => {
      let s = `M${xpos},${height}`;
      s += ` ${xpos},0`;
      return s;
    });

    const values_sorted = [];
    // for (const [serie_key, serie_value] of Object.entries(conf.series)) {
    //   const value = serie_value[xindex];
    //   values_sorted.push({
    //     id: serie_key,
    //     color: color(serie_key),
    //     value: value,
    //   });
    // }

    // for (const [serie_id, serie_value] of Object.entries(stackedData)) {
    //   const value = serie_value.data[xindex];
    //   values_sorted.push({
    //     id: serie_value.key,
    //     color: color(serie_value.key),
    //     value: value,
    //   })
    // }

    for (const key of keys) {
      let value = data[xindex][key];
      values_sorted.push({
        id: key,
        color: color(key),
        value: value,
      });
    }

    // values_sorted.sort(descendingOnKey("measurement"));
    values_sorted.reverse();

    let trs = "";
    for (const item of values_sorted) {
      trs += `<tr style="color: ${item.color}">
        <td style="background-color: ${item.color
        }; width: 10px; height: 10px; border-radius: 5px; display: inline-block; margin-right: 2px;"></td>
          <td style="padding-right: 0.8em; font-weight: 700;">${item.id}</td>
          <td style="text-align: right; white-space: nowrap; font-weight: 700;">${conf.relative ? `${(item.value * 100).toFixed(2)}%` : item.value.toFixed(
          2
        )}</td>
        </tr>`;
    }


    tooltip
      .html(
        `<table style="font-size: 0.7em"><thead><tr><td colspan="3"><strong>${xval}</strong></td></tr></thead><tbody>${trs}</tbody></table>`
      )
      .style("left", xpos + margin.left + 12 + 10 + "px")
      .style("top", pointer[1] + margin.top + 12 + "px");





    // const value_index = bisect(slices[0].values, x0);
    // const len = slices[0].values.length;

    // if (value_index >= len) return;

    // const selectedData = slices[0].values[value_index];

    // const x_val = x(selectedData.distance);
    // const y_val = y(selectedData.measurement);

    // mouseLine.attr("d", () => {
    //   let s = `M${x_val},${height}`;
    //   s += ` ${x_val},0`;
    //   return s;
    // });

    // const pointerRel = d3.pointer(e, d3.select(chart).node());
    // const pointermouseline = d3.pointer(e, d3.select("#mouse-line").node());

    // // focus.attr("cx", x_val).attr("cy", y_val);

    // const circles = d3
    //   .selectAll(".focus-circle")
    //   .attr("cx", x_val)
    //   .attr("cy", (d) => y(d.values[value_index].measurement));

    // const values_sorted = [];
    // for (const slice of slices) {
    //   const val = slice.values[value_index];
    //   values_sorted.push({
    //     id: slice.id,
    //     color: color(slice.id),
    //     ...val,
    //   });
    // }
    // values_sorted.sort(descendingOnKey("measurement"));

    // let trs = "";
    // for (const item of values_sorted) {
    //   trs += `<tr style="color: ${item.color}">
    //     <td style="background-color: ${item.color
    //     }; width: 10px; height: 10px; border-radius: 5px; display: inline-block; margin-right: 2px;"></td>
    //       <td style="padding-right: 0.8em; font-weight: 700;">${item.id}</td>
    //       <td style="text-align: right; white-space: nowrap; font-weight: 700;">${item.measurement.toFixed(
    //       2
    //     )}</td>
    //     </tr>`;
  }

  // tooltip
  //   .html(
  //     `<table style="font-size: 0.7em"><thead><tr><td colspan="3"><strong>${selectedData.distance}</strong></td></tr></thead><tbody>${trs}</tbody></table>`
  //   )
  //   .style("left", pointerRel[0] + 40 + "px")
  //   .style("top", pointerRel[1] + "px");
  // .attr("y", height / 3);

  function mouseout() {
    // focus.style("opacity", 0);
    tooltip.style("opacity", 0);
    mouseLine.style("opacity", 0);
    // d3.selectAll(".focus-circle").style("opacity", 0);
  }







}