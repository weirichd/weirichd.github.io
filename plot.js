// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 75, left: 75},
width = 450 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Tooltip
var divTooltip = d3.select("body").append("div").attr("class", "toolTip").style("opacity", 0);

// append the svg object
var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function update_plot(data, x_var, y_var) {
  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d[x_var]; }));
  y.domain(d3.extent(data, function(d) { return d[y_var]; }));

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
  .attr("cx", function(d) { return x(d[x_var]); })
  .attr("cy", function(d) { return y(d[y_var]); });

  dots.exit().remove();

  // Add the X Axis
  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "rotate(90)")
  .attr("y", 0)
  .attr("x", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start");

  // Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));
}

// Get the data
var data;
d3.csv("data.csv", format, function(d) {
  data = d;
  update_plot(data, 'commit_count', 'account_age');
});
