import * as d3 from "d3";

const LABELS_SPACE = 25;
const INDICATOR_SPACE = 2;
const TOOLTIP_SPACE = 10;


function descendingOnKey(key) {
  return function (a, b) {
    return b[key] - a[key];
  };
}

export function chart(conf) {
  const el = d3.select(conf.el);
  // first clear the div, in case of redraw
  el.selectAll("svg").remove();
  el.selectAll(".tooltip").remove();

  // chart columns / keys
  const keys = Object.keys(conf.series);
  const keys_len = keys.length;
  const keys_rev = keys.slice().reverse();

  // color palette
  const color = d3.scaleOrdinal()
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




  if (conf.type === 'area') {
    areaChart(el, conf, keys, keys_len, svg, color);
  } else if (conf.type === 'bar_vertical') {
    barVert(el, conf, keys, keys_len, svg, color);
  }



}


function barVert(el, conf, keys, keys_len, svg, color) {
  const data = [];
  for (const [serie_key, serie_value] of Object.entries(conf.series)) {
    data.push({
      id: serie_key,
      x: serie_value,
    });
  }

  data.sort(descendingOnKey('x'));

  svg.attr("transform",
    "translate(" + 100 + "," + -30 + ")")

  console.log(d3.schemeTableau10)

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, conf.x])
    .range([0, conf.width]);
  svg.append("g")
    .attr("transform", `translate(0, ${conf.height})`)
    .call(d3.axisBottom(x))

  // Y axis
  var y = d3.scaleBand()
    .range([0, conf.height])
    .domain(data.map(function (d) { return d.id; }))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))

  //Bars
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function (d) { return y(d.id); })
    .attr("width", function (d) { return x(d.x); })
    .attr("height", y.bandwidth())
    .attr("fill", d3.schemeTableau10[3])

}



function areaChart(el, conf, keys, keys_len, svg, color) {

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
  const stackedData = d3.stack()
    .keys(keys)
    (data)

  // find overall max of stackedData
  const maxY = d3.max(stackedData, function (d) {
    return d3.max(d, function (v) {
      return v[1];
    })
  });

  //////////
  // HIGHLIGHT GROUP //
  //////////

  // What to do when one group is hovered
  const highlight = function (e, d) {
    // reduce opacity of all groups
    svg.selectAll(".area").style("opacity", .1)
    // except the one that is hovered
    svg.select(".area." + d).style("opacity", 1)

    svg.selectAll(".item-label").style("opacity", .3);
    svg.select(".item-label." + d).style("opacity", 1)
    svg.selectAll(".item-indicator").style("opacity", .3);
    svg.select(".item-indicator." + d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  const noHighlight = function (e) {
    svg.selectAll(".area").style("opacity", 1)
    svg.selectAll(".item-label").style("opacity", 1);
    svg.selectAll(".item-indicator").style("opacity", 1);
  }


  // Add one dot in the legend for each name.
  const legendItems = svg.append("g").attr("class", "legend").selectAll("mylabels")
    .data(keys)
    .enter()
    .append("g")
    .attr("class", "legend-item")

  legendItems.append("g")
    .attr("class", d => "item-indicator " + d)
    .append("path")
    .attr("stroke", "#999")
    .attr("stroke-width", "0.5")
    .attr("fill", "none")

  legendItems.append("text")
    .attr("class", d => "item-label " + d)
    .style("fill", function (d) { return color(d) })
    .text(function (d) { return d })
    .attr("text-anchor", "start")
    .style("alignment-baseline", "middle")
    .style("cursor", "default")
    .attr("font-size", "70%")

  const legend = svg.select(".legend");
  let labelWidthMax = legend.node().getBBox().width;
  const labelHeight = legendItems.select('.item-label')._groups[0][0].getBBox().height;

  legendItems.append("rect")
    .attr("class", d => "item-rect " + d)
    .attr("width", labelWidthMax + LABELS_SPACE + INDICATOR_SPACE)
    .attr("height", labelHeight)
    .attr("opacity", 0)
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight)




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


  // label and indicator placement
  let min_place = null;
  for (const key of keys) {
    const index = keys.indexOf(key);
    const index_inv = keys_len - index - 1;

    const label = legendItems.select(`.item-label.${key}`);
    const item_rect = legendItems.select(`.item-rect.${key}`);
    const item_ind = legendItems.select(`.item-indicator.${key} path`);

    // default place (top)
    const def_place = index_inv * labelHeight;

    // find the middle of area
    const items = stackedData[index];
    const [y_lower, y_upper] = items[items.length - 1];
    let between = y_lower + (y_upper - y_lower) / 2;
    const mid_place = y(between);

    // set min place to bottom label
    if (min_place === null) {
      min_place = mid_place;
    }

    let placeY;

    if (mid_place <= def_place) {
      // place it on def_place
      placeY = def_place;
    } else if (mid_place > min_place) {
      // place it on min_place
      placeY = min_place;
    } else {
      // place it on mid_place
      placeY = mid_place;
    }


    const labelX = width + LABELS_SPACE;
    label
      .attr("x", labelX)
      .attr("y", placeY)
    item_rect
      .attr("x", width + INDICATOR_SPACE)
      .attr("y", placeY - labelHeight / 2)


    // indicator path vals
    const indic_start = width + INDICATOR_SPACE;
    const indic_end = width + LABELS_SPACE - INDICATOR_SPACE;
    const indic_diff = indic_end - indic_start;

    const indic_mult = mid_place > placeY ? index_inv + 1 : index + 1;
    const indic_mid = indic_start + (indic_diff / (keys_len + 1)) * indic_mult;

    item_ind
      .attr("d", `M${indic_start},${mid_place} H${indic_mid} V${placeY} H${indic_end}`)

    min_place = placeY - labelHeight;
  }





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
    tooltip.style("opacity", 1);
    mouseLine.style("opacity", 1);
  }


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
    for (const key of keys) {
      let value = data[xindex][key];
      values_sorted.push({
        id: key,
        color: color(key),
        value: value,
      });
    }

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
      .style("left", xpos + margin.left + TOOLTIP_SPACE + "px")
      .style("top", pointer[1] + margin.top + "px");
  }

  function mouseout() {
    tooltip.style("opacity", 0);
    mouseLine.style("opacity", 0);
  }
}