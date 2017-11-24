// Thomas van Dooren, 10625488 dataprocessing. 
// This file loads javascript on the html page. It is responsible for drawing a scatterplot.


// This function loads the tooltip, making the chart interactive.
var margin = {top: 20, right: 15, bottom: 60, left: 60}
    , width = 960 - margin.left - margin.right
    , height = 500 - margin.top - margin.bottom;

window.onload = function() 
{
  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
  return "<strong>Total CO2 emission:</strong> <span style='color:white'>" 
  + d.totalco2 + "</span> metric tons";
})

// Load the data for the chart.
d3.json("codebeautify.json", function(error, data) 
{  
  
  // Scale the x axis.
  var x = d3.scale.linear()
  .domain([d3.min(data, function(d) { return d.lifeexpectancy; }) - 5, 
  d3.max(data, function(d) { return d.lifeexpectancy; }) + 5])
  .range([ 0, width ]);
    
  // Scale the y axis.
  var y = d3.scale.linear()
  .domain([0, d3.max(data, function(d) { return d.c02percapita; })])
  .range([ height, 0 ]);
  

  // Scale the size of the dot to the total co2.
  var rangedot = d3.scale.linear()
  .domain([d3.min(data, function(d) { return d.totalco2; }) , d3.max(data, function(d) { return d.totalco2; })])
  .range([ 3, 35 ]);

  // Give every country a different color.
  var color = d3.scale.category20();

  // Add svg element.
  
  var chart = d3.select('body')
  .append('svg:svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .attr('class', 'chart')

  // Create the chart.
  var main = chart.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr('width', width)
  .attr('height', height)
  .attr('class', 'main')   

          
  // Draw the x axis.
  var xAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom');

  // Give xaxis text.
  main.append('g')
  .attr('transform', 'translate(0,' + height + ')')
  .attr('class', 'main axis date')
  .call(xAxis)
  .append("text")
  .attr("class", "label")
  .attr("x", width)
  .attr("y", -6)
  .style("text-anchor", "end")
  .style("font-size", "20px")
  .text("Life expectancy (years)");

  // Draw the y axis.
  var yAxis = d3.svg.axis()
  .scale(y)
  .orient('left');

  // Give the yaxis text.
  main.append('g')
  .attr('transform', 'translate(0,0)')
  .attr('class', 'main axis date')
  .call(yAxis)
  .append("text")
  .attr("class", "label")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .style("font-size", "20px")
  .text("C02 emission (metric tons per capita)");

  
  // Call the tooltip.  
  chart.call(tip);

  // Create the chart.
  var g = main.append("svg:g"); 
  g.selectAll("scatter-dots")
  .data(data)
  .enter().append("svg:circle")
  .attr("cx", function (d,i) { return x(d.lifeexpectancy); } )
  .attr("cy", function (d) { return y(d.c02percapita); } )
  .attr("r", function (d,i) { return rangedot(d.totalco2); })
  .style("fill", function(d) { return color(d.Country); })
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide)

  // Create legend.
  var legend = chart.selectAll(".legend")
  .data(color.domain())
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // Give legend form.
  legend.append("rect")
  .attr("x", width + 60 )
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color);

  // Give legend text.
  legend.append("text")
  .attr("x", width + 54)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(function(d) { return d; });  

});

};


  









  
      

    









