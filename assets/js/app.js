// @TODO: YOUR CODE HERE!
var svgWidth = 800;
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
        stuff.poverty = +stuff.poverty;
        stuff.healthcare = +stuff.healthcare;
    });

    var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(stateData, data => data.poverty)])
    .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, data => data.healthcare)])
    .range([chartHeight, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.selectAll("circle").data(stateData).enter().append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 10)
    .style("fill", "lightblue");

    chartGroup.selectAll("text").data(stateData).enter()
    .append("text")
    .text(d => d.abbr)
    .attr("dx", d => xLinearScale(d.poverty)-7)
    .attr("dy", d => yLinearScale(d.healthcare)+3)
    .attr("fill", "white")
    .style("font-size", 10);

    chartGroup.append("g").call(leftAxis);
    chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis);

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartHeight/2)-70)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks in Healthcare (%)");

    chartGroup.append("text")
    .attr("transform", `translate(${(chartWidth / 2)-20}, ${chartHeight + (margin.top-20)})`)
    .attr("class", "axisText")
    .text("Poverty (%)");


});