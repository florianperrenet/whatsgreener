import * as d3 from "d3";

export function chart(conf) {
  // chart size
  const width = conf.width - conf.margin.left - conf.margin.right;
  const height = conf.height - conf.margin.top - conf.margin.bottom;

  const el = d3.select(conf.el);

  // first clear the div, in case of redraw
  el.selectAll("svg").remove();

  // append the svg object to the body of the page
  const svg = el
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${conf.width} ${conf.height}`)
    // .attr("width", conf.width)
    // .attr("height", conf.height)
    .append("g")
    .attr("transform",
      "translate(" + conf.margin.left + "," + conf.margin.top + ")")

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

  // color palette
  var color = d3.scaleOrdinal()
    .domain(keys)
    // .range(d3.schemeSet2);
    .range(d3.schemeTableau10);

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


  //////////
  // AXIS //
  //////////

  // Add X axis
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function (d) { return d.x; }))
    .range([0, width]);

  var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")))

  // Add X axis label:
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 40)
    .text(conf.xlabel);

  // Add Y axis label:
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", -20)
    .attr("text-anchor", "start")
    .text(conf.ylabel)

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, maxY])
    .range([height, 0]);

  const yTicks = d3.axisLeft(y).ticks(5);
  if (conf.relative)
    yTicks.tickFormat(d3.format(".0%"));

  svg.append("g")
    .call(yTicks)



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
    .attr("class", function (d) { return "myArea " + d.key })
    .style("fill", function (d) { return color(d.key); })
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



  //////////
  // HIGHLIGHT GROUP //
  //////////

  // What to do when one group is hovered
  var highlight = function (e, d) {
    // reduce opacity of all groups
    svg.selectAll(".myArea").style("opacity", .1)
    // except the one that is hovered
    svg.select("." + d).style("opacity", 1)

    svg.selectAll(".label").style("opacity", .3);
    svg.select(".label." + d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  var noHighlight = function (e) {
    svg.selectAll(".myArea").style("opacity", 1)
    svg.selectAll(".label").style("opacity", 1);
  }



  //////////
  // LEGEND //
  //////////

  // Add one dot in the legend for each name.
  var size = 10
  svg.selectAll("myrect")
    .data(keys)
    .enter()
    .append("rect")
    .attr("x", 400)
    .attr("y", function (d, i) { return 10 + i * (size + 5) }) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function (d) { return color(d) })
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight)

  // Add one dot in the legend for each name.
  svg.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("class", d => "label " + d)
    .attr("x", 400 + size * 1.2)
    .attr("y", function (d, i) { return 10 + i * (size + 5) + (size / 2) }) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function (d) { return color(d) })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .style("cursor", "default")
    .attr("font-size", "70%")
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight)

}