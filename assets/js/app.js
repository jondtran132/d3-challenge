// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 60,
    bottom: 60,
    left: 60,
    right: 60
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/state-data.csv").then(function(stateData) {
    console.log(stateData);

    stateData.forEach(function(stuff) {
        stuff.age = +stuff.age;
        stuff.poverty = +stuff.poverty;
    });

    var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, data => data.age)])
    .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, data => data.poverty)])
    .range([chartHeight, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g").selectAll("dot").enter().append("circle")
    .attr("cx", function(d) {return x(d.age)})
    .attr("cy", function(d) {return y(d.poverty)})
    .attr("r", 1)
    .style("fill", "blue");

    chartGroup.append("g").classed("axis", true).call(leftAxis);
    chartGroup.append("g").classed("axis", true).attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis);
});