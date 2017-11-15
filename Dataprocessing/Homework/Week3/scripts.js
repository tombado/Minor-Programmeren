// Thomas van Dooren, 10625488 dataprocessing. 
// This file loads javascript on the html page. It is responsible for drawing a barchart.


window.onload = function() {
  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Raintime:</strong> <span style='color:yellow'>" 
    + d.Rain + "</span> hours";
  })

// Set the dimensions of the canvas.
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Set the ranges.
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// Define the axis.
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    

// Add the SVG element.
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// Use tooltip to make the chart interactive.
svg.call(tip);

d3.json("data.json", function(error, data) 
{   
    console.log(data);
    x.domain(data.map(function(d) { return d.Date; }));
  y.domain([0, d3.max(data, function(d) { return d.Rain; })]);

  // Add x axis.
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  // Add label for x axis.
  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Month");

  // Add y axis.
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

   // Add label for y axis.
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Hours");      

  // Add a title.    
  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 5 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Total raintime in De Bilt per month in 2016");

  // Add bar chart.
  svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Date); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Rain); })
      .attr("height", function(d) { return height - y(d.Rain); })

      // When hovering over the Bars, show tooltip.
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
});

}



  
      

    









