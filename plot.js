// set the dimensions and margins of the graph
var margin = {top: 30, right: 500, bottom: 100, left: 75},
width = 950 - margin.left - margin.right,
height = 475 - margin.top - margin.bottom;

// set the ranges
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Tooltip
var divTooltip = d3.select("body").append("div").attr("class", "toolTip").style("opacity", 0);

// append the svg object
var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScaleLinear = d3.scaleLinear().range([0, width]);
var yScaleLinear = d3.scaleLinear().range([height, 0]);

var xScaleTime = d3.scaleTime().range([0, width]);
var yScaleTime = d3.scaleTime().range([height, 0]);

var x_variable = 'commit_count';
var y_variable = 'account_age';

function update_plot(data, x_var, y_var) {
  // Get the correct axis
  var xScale;
  var yScale;
  if(varTypes[x_var].type == 'num') {
    xScale = xScaleLinear;
  } else {
    xScale = xScaleTime;
  }

  if(varTypes[y_var].type == 'num') {
    yScale = yScaleLinear;
  } else {
    yScale = yScaleTime;
  }

  // Scale the range of the data
  xScale.domain(d3.extent(data, function(d) { return d[x_var]; }));
  yScale.domain(d3.extent(data, function(d) { return d[y_var]; }));

  // Add the scatterplot
  var dots = svg.selectAll("circle").data(data)

  dots.enter().append("circle")
  .attr("r", 4)
  .attr("fill", function(d) { return color(d.next_step); })
  .attr("opacity", 0.70)
  .on("mouseover", function(d) {
    divTooltip.transition().duration(200).style("opacity", .9);
    divTooltip.style("left", d3.event.pageX+"px");
    divTooltip.style("top", d3.event.pageY+"px");
    divTooltip.style("position", "absolute");
    divTooltip.style("display", "inline-block");
    divTooltip.html(d.user + "/" + d.repo);
  })
  .on("mouseout", function(d){
    divTooltip.transition().duration(500).style("opacity", 0);
  })
  .merge(dots).transition()
  .attr("cx", function(d) { return xScale(d[x_var]); })
  .attr("cy", function(d) { return yScale(d[y_var]); });

  dots.exit().remove();

  svg.selectAll(".axis").remove()

  // Add the X Axis
  svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale))
  .selectAll("text")
  .attr("transform", "rotate(35)")
  .attr("y", 12)
  .attr("x", 0)
  .attr("dy", ".35em")
  .style("text-anchor", "start");
  svg.append("text")
  .attr("class", "axis")
  .attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 25) + ")")
  .style("text-anchor", "middle")
  .text(varTypes[x_var].label);

  // Add the Y Axis
  svg.append("g").attr("class", "axis").call(d3.axisLeft(yScale));
  svg.append("text")
  .attr("class", "axis")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text(varTypes[y_var].label);

  var legendRectSize = 10;
  var legendSpacing = 10;

  // Add the legend
  var legend = svg.selectAll(".legend")
  .data(color.domain())
  .enter()
  .append("g")
  .attr("class", "legend")
  .attr('transform', function(d, i) {
    var horz = width + 10;
    var vert = margin.top + i * 20;
    return 'translate(' + horz + ',' + vert + ')';
  })
  legend.append("rect")
  .attr("width", legendRectSize)
  .attr("height", legendRectSize)
  .attr("fill", color)
  .attr("opacity", ".70");
  legend.append("text")
  .text(function(d) { return stepDescriptions[d];})
  .attr("x", "20px")
  .attr("y", "10px");
}

// Get the data
var data;

d3.csv("data.csv", format, function(d) {
  data = d;

  update_plot(data, 'commit_count', 'account_age');

  keys = Object.keys(data[0]);

  var x_selector = d3.select("#x_variable");
  var y_selector = d3.select("#y_variable");

  // Put in the dropdown menus
  x_selector.selectAll("option")
  .data(keys.filter (function(d) { return varTypes[d].type != 'string'}))
  .enter()
  .append("option")
  .attr("value", function(d) { return d;})
  .text( function(d) { return varTypes[d].label;});

  x_selector.attr("value", x_variable)
  .on("change", function() {
    var selectValue = d3.select("#x_variable").property("value");
    x_variable = selectValue;
  });

  // Put in the dropdown menus
  y_selector.selectAll("option")
  .data(keys.filter (function(d) { return varTypes[d].type != 'string'}))
  .enter()
  .append("option")
  .attr("value", function(d) { return d;})
  .text( function(d) { return varTypes[d].label;});

  y_selector.attr("value", y_variable)
  .on("change", function() {
    var selectValue = d3.select("#y_variable").property("value");
    y_variable = selectValue;
  });

});
