
//Thomas van Dooren, 10625488, dataprocessing. This file is responsible for creating the javascript element on the website.
var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 60, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

svg.append("text")
  .attr("x", (width / 2))             
  .attr("y", margin.top)
  .attr("text-anchor", "middle")  
  .style("font-size", "25px") 
  .style("text-decoration", "bold")  
  .text("Country indexes (2016)");

var x0 = d3.scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.1);

var x1 = d3.scaleBand()
  .padding(0.05);

var y = d3.scaleLinear()
  .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// Parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x2 = d3.scaleLinear().range([0, width]);
var y2 = d3.scaleLinear().range([height, 0]);

// Keep track of when the barchart is clicked.
var clicked = 0;

// Define the line
var valueline = d3.line()
  .x(function(d) { return x2(d.date); })
  .y(function(d) { return y2(d.close); });

var svgline = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
// Load data with queue.
queue()
  .defer(d3.json, 'data2json.json')
  .defer(d3.csv, 'dataown2.txt')
  .await(loading);

function loading(error, data,d){
 

// These variables are used for making the first linechart.
var useCountry = "Denmark"
var useKey = "quality of life index"
var useColor = "rgb(152, 171, 197)"
newFunction(data,d)


// This function loads the linechart.
function newerFunction(useCountry,data){
    
  // format the data change the countryname to get different data sets!!!!!!
  var data = data["countries"][useCountry][useKey]

  
  
  data.forEach(function(d) {
        
    d.date = d.date;
    d.close = +d.close})

  // Scale the range of the data
 
  clicked += 1;

  if (clicked == 1)
  {
    x2.domain(d3.extent(data, function(d) { return d.date; }));
    y2.domain([0, 250]);
    
    
    // Add the X Axis
    svgline.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x2))
      .append("text")
      .attr("x", 888)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .attr("font-size", 15)
      .text("Year");

    // Add the Y Axis
    svgline.append("g")
      .call(d3.axisLeft(y2))
      .append("text")
      .attr("x", 2)
      .attr("y", y2(y2.ticks().pop()))
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .attr("font-size", 15)
      .text("Index score");
  }

  
  

  svgline.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", valueline)
    .attr("stroke-width", 4)
    .style("stroke",useColor)
    .on("mouseover", function(d) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
         

      div.html(useCountry)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
       })
        .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
       })  
  
}

// This function loads the barchart.
function newFunction(d,data){

  // remember the data without changing it.
  var rememberthis = d;
  var keys = data.columns.slice(1);
  // Make the domains.
  x0.domain(data.map(function(d) { return d.country;  }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, data[0]["quality of life index"]]).nice();

  // Append the bars.
  g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.country) + ",0)"; })
      .attr("id", function(d) { return d.country })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); })
      // Make the bars interactive by hovering over them.
      .on("mouseover", function(d) {
       div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html(d.key+": " + d.value)
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       })
     .on("mouseout", function(d) {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       })
      .on("click",function(d){
                
        useKey = d.key
        useCountry = this.parentNode.id
        useColor = d3.select(this).style("fill")
        
        // Make a line on clicking, by calling newerfunction.
        newerFunction(useCountry, rememberthis);
    });

    // Delete all lines when button is clicked.
    d3.selectAll("#button").on("click", function() {d3.selectAll(".line").remove()})

    // Explanation of my charts.
    d3.selectAll("#button1").on("click", function() {alert("Mijn barchart weergeeft indexen over de welgesteldheid van verschillende landen." 
      +"Verschillende indexen worden weergeven: safety index,"
      +"purchasing power index en quality of life index."
      +"Om per land een beter inzicht te krijgen over het verloop van deze indexen in tijd,"
      +"is er een line chart toegevoegd dat tussen 2012 en 2017 de scores op de verschillende indexen weergeeft."
      +"Hieruit kan afgelezen worden of er een groei zit in de verschillende indexen per land. "
      +"Ook kan het interessant zijn om verschillende index lijnen met elkaar te vergelijken, "
      +"om uit te zoeken of er eventueel een hypothetische correlatie kan zijn."
      +"Ik heb bijvoorbeeld het sterke vermoeden dat de quality of life index en de purchasing power index van Denemarken, qua stijging dezelfde vorm hebben. See for yourself!")})
  
  // X axis.    
  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x0));

  // y axis.
  g.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Index score")
      .attr("font-size", 15);

  var legend = g.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", width - 19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", z);

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function(d) { return d; });
}
}