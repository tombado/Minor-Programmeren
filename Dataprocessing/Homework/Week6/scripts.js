// Thomas van Dooren, 10625488, Dataprocessing. 
// This file is responsible for loading javascript on linegraph.html.
// I had no time to make the code pretty. There is alot of
// Double code in this file. Sorry.
// Inspiration for this file: https://bl.ocks.org/mbostock/3902569

// Make some variables, selfexplanetory.
var margin = {
    top: 45,
    right: 250,
    bottom: 200,
    left: 50
  };

var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse,

bisectDate = d3.bisector(function(d) { return d.Month; }).left;

var color = d3.scale.category10();

// Set range of xaxis and yaxis.
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]); 
    z = d3.scale.ordinal(d3.schemeCategory10);

// Define xaxis:
var xAxis = d3.svg.axis().scale(x).orient("bottom");

// Define yaxis:
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// Here the 6 lines are made.
var	line1 = d3.svg.line()
	.x(function(d) { return x(d.Month); })
	.y(function(d) { return y(d.average2016); });
	
var	line2 = d3.svg.line()
	.x(function(d) { return x(d.Month); })
	.y(function(d) { return y(d.experts2017); });

var	line3 = d3.svg.line()
	.x(function(d) { return x(d.Month); })
	.y(function(d) { return y(d.nitwit2017); });
    
var	line4 = d3.svg.line()
	.x(function(d) { return x(d.Month); })
	.y(function(d) { return y(d.average2015); });
	
var	line5 = d3.svg.line()
	.x(function(d) { return x(d.Month); })
	.y(function(d) { return y(d.experts2016); });
   
var	line6 = d3.svg.line()
	.x(function(d) { return x(d.Month); })
	.y(function(d) { return y(d.nitwit2016); });

 
// Append svg.
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");     
    
// Define the div for the tooltip.
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);    

var focus = svg.append("g")                                
    .style("display", "none");


// Open the jsonfile.   
d3.json("data.json", function(error, data) {
    if (error) throw error;    
    
	data.forEach(function(d) {
        
        d.Month = parseDate(d.Month);
        d.average2016 = +d.average2016;
        d.nitwit2017 = +d.nitwit2017;
        d.experts2017 = +d.experts2017;
        d.average2015 = +d.average2015;
        d.nitwit2016 = +d.nitwit2016;
        d.experts2016 = +d.experts2016;      
    });
    
    // Make the domains.
    x.domain(d3.extent(data, function(d) { return d.Month; }));
    y.domain([0, d3.max(data, function(d) { return Math.max(d.nitwit2017, d.experts2017); })]);

    // These counters will track how often the dropdown button is clicked.
    var counter2015 = 0;
    var counter2016 = 0;

    // Enter this function when the dropdown menu is clicked.
    d3.selectAll(".dropdown-menu li a").on("click", function() {
        
    
    // Give the lines a nice opacity.    
    var opacityVar = .9;
    
    // Make all the lines! Sorry for hardcoding this!
    // **********************************************************BEGIN
    svg.append("path")		
		.attr("class", "line1")
		.style("stroke", "black")
        .style("fill", "none")
		.attr("d", line1(data))
        .style("opacity", opacityVar);
        
    svg.append("path")	
		.attr("class", "line1")
		.style("stroke", "red")
        .style("fill", "none")
		.attr("d", line2(data))
        .style("opacity", opacityVar);
    
    svg.append("path")		
		.attr("class", "line1")
		.style("stroke", "blue")
        .style("fill", "none")
		.attr("d", line3(data))
        .style("opacity", opacityVar);

    svg.append("path")      
        .attr("class", "line2")
        .style("stroke", "black")
        .style("fill", "none")
        .attr("d", line4(data))
        .style("opacity", opacityVar);
    
    svg.append("path")  
        .attr("class", "line2")
        .style("stroke", "red")
        .style("fill", "none")
        .attr("d", line5(data))
        .style("opacity", opacityVar);
     
    svg.append("path")      
        .attr("class", "line2")
        .style("stroke", "blue")
        .style("fill", "none")
        .attr("d", line6(data))
        .style("opacity", opacityVar);

    // Make the chart interactive.            
    svg.append("rect")                                     
        .attr("width", width)                              
        .attr("height", height)                            
        .style("fill", "none")                             
        .style("pointer-events", "all")                    
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);    
    //**********************************************************************************END   

    // Make circles and tekst for the interactivity. 
    // All circles are given a class, this comes in handy later on.
    // I made a block to make it look more organised.

    //************************************************************BEGIN
    focus.append("circle")                                 
        .attr("class", "y")  
        .attr("id","y")                              
        .style("fill", "none")                             
        .style("stroke", "white")                           
        .attr("r", 4);                                     
      
    focus.append("text")
        .attr("class", "y")
        .attr("id","y")
        .attr("dx", 8)
        .attr("dy", "-.3em");
                        
    focus.append("circle")                                 
        .attr("class", "y1")  
        .attr("id","y1")                              
        .style("fill", "none")                             
        .style("stroke", "white")                           
        .attr("r", 4);                                     
      
    focus.append("text")
        .attr("class", "y1")
        .attr("id","y1")
        .attr("dx", 8)
        .attr("dy", "-.3em");
                  
    focus.append("circle")                                 
        .attr("class", "y2")  
        .attr("id","y2")                              
        .style("fill", "none")                             
        .style("stroke", "white")                           
        .attr("r", 4);                                     
      
    focus.append("text")
        .attr("class", "y2")
        .attr("id","y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");
                  
    focus.append("circle")                                 
        .attr("class", "yy")  
        .attr("id","yy")                              
        .style("fill", "none")                             
        .style("stroke", "white")                           
        .attr("r", 4);                                     
    
    focus.append("text")
        .attr("class", "yy")
        .attr("id","yy")
        .attr("dx", 8)
        .attr("dy", "-.3em");
                   
    focus.append("circle")                                 
        .attr("class", "yy1")  
        .attr("id","yy1")                              
        .style("fill", "none")                             
        .style("stroke", "white")                           
        .attr("r", 4);                                     
    
    focus.append("text")
        .attr("class", "yy1")
        .attr("id","yy1")
        .attr("dx", 8)
        .attr("dy", "-.3em");
               
    focus.append("circle")                                 
        .attr("class", "yy2")  
        .attr("id","yy2")                              
        .style("fill", "none")                             
        .style("stroke", "white")                           
        .attr("r", 4);                                     
    
    focus.append("text")
        .attr("class", "yy2")
        .attr("id","yy2")
        .attr("dx", 8)
        .attr("dy", "-.3em");
    //****************************************************************END  


    // This function tracks your mousemovement.
    function mousemove() {                                 
        var x0 = x.invert(d3.mouse(this)[0]),              
            i = bisectDate(data, x0, 1),                   
            d0 = data[i - 1],                              
            d1 = data[i],                                  
            d = x0 - d0.Month > d1.Month - x0 ? d1 : d0;     

            
        // Add information to the circles with text. Also add colors.
        //*************************************************************BEGIN  
        focus.select("circle.y")                           
            .attr("transform",                             
                  "translate(" + x(d.Month) + "," +         
                                 y(d.average2016) + ")")
            .style('fill', 'black');
  
        focus.select("text.y")
            .attr("transform",
                  "translate(" + x(d.Month) + "," +
                                 y(d.average2016) + ")")
            .text("Average: " + d.average2016 )
            .style("fill", 'black'); 

        focus.select("circle.y1")                           
            .attr("transform",                             
                  "translate(" + x(d.Month) + "," +         
                                 y(d.experts2017) + ")")
            .style('fill', 'red');

        focus.select("text.y1")
            .attr("transform",
                  "translate(" + x(d.Month) + "," +
                                 y(d.experts2017) + ")")
            .text("Experts: " + d.experts2017 )
            .style("fill", 'black');  

        focus.select("circle.y2")                           
            .attr("transform",                             
                  "translate(" + x(d.Month) + "," +         
                                 y(d.nitwit2017) + ")")
            .style('fill', 'blue');
  
        focus.select("text.y2")
            .attr("transform",
                  "translate(" + x(d.Month) + "," +
                                 y(d.nitwit2017) + ")")
            .text("Nitwits: " + d.nitwit2017 )
            .style("fill", 'black');  

        focus.select("circle.yy")                           
            .attr("transform",                             
                  "translate(" + x(d.Month) + "," +         
                                 y(d.average2015) + ")")
            .style('fill', 'black');
   
        focus.select("text.yy")
            .attr("transform",
                  "translate(" + x(d.Month) + "," +
                                 y(d.average2015) + ")")
            .text("Average: " + d.average2015 )
            .style("fill", 'black'); 

        focus.select("circle.yy1")                           
            .attr("transform",                             
                  "translate(" + x(d.Month) + "," +         
                                 y(d.experts2016) + ")")
            .style('fill', 'red');
   
        focus.select("text.yy1")
            .attr("transform",
                  "translate(" + x(d.Month) + "," +
                                 y(d.experts2016) + ")")
            .text("Experts: " + d.experts2016 )
            .style("fill", 'black');  

        focus.select("circle.yy2")                           
            .attr("transform",                             
                  "translate(" + x(d.Month) + "," +         
                                 y(d.nitwit2016) + ")")
            .style('fill', 'blue');
  
        focus.select("text.yy2")
            .attr("transform",
                  "translate(" + x(d.Month) + "," +
                                 y(d.nitwit2016) + ")")
            .text("Nitwits: " + d.nitwit2016 )
            .style("fill", 'black');  
        //************************************************************END
    };  


    // If 2015 is clicked...
    if (d3.select(this).text() == 2016) 
        {      
        // Create a title that only shows when the 2016 chart is shown.
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 5 - (margin.top / 2))
        .attr("id", "year2016")
        .attr("text-anchor", "middle")  
        .style("font-size", "23px") 
        .style("text-decoration", "underline")  
        .text("2016");

        // Counters  ensure removing information at the right time.

        counter2015 = counter2015 + 1;
        counter2016 = 0;

        // Remove everything from the 2017 chart.
        d3.selectAll(".line2").remove();
        d3.selectAll("#yy").remove();
        d3.selectAll("#yy1").remove();
        d3.selectAll("#yy2").remove();
        d3.selectAll("#year2017").remove();

        // If the counter i clicked twice, remove all 2016 information.
        if (counter2015 % 2 == 0)
            {
            d3.selectAll(".line1").remove();
            d3.selectAll("#y").remove();
            d3.selectAll("#y1").remove();
            d3.selectAll("#y2").remove();
            d3.selectAll("#year2016").remove();
            }    
        }

    // If 2016 is clicked...
    if (d3.select(this).text() == 2017) 
        {   
        // Create a title that only shows when the 2017 chart is shown.
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 5 - (margin.top / 2))
        .attr("id", "year2017")
        .attr("text-anchor", "middle")  
        .style("font-size", "23px") 
        .style("text-decoration", "underline")  
        .text("2017");

        counter2016 = counter2016 + 1;
        counter2015 = 0;
        // Remove everything from the 2016 chart.
        d3.selectAll(".line1").remove();
        d3.selectAll("#y").remove();
        d3.selectAll("#y1").remove();
        d3.selectAll("#y2").remove();
        d3.selectAll("#year2016").remove();
            
        // If the counter i clicked twice, remove all 2016 information.
        if (counter2016 % 2 == 0)
            { 
            d3.selectAll(".line2").remove();
            d3.selectAll("#yy").remove();
            d3.selectAll("#yy1").remove();
            d3.selectAll("#yy2").remove();
            d3.selectAll("#year2017").remove();
            }
        }

    })   
   
    // Make a nice xaxis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .attr("dx", "-2.5em")
        .attr("transform", "rotate(-60)" );
    
    // Make a nice yaxis.
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
       .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 11)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "15px") 
        .text("Hype-rating")

    svg.append("g")
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", -100)
        .attr("x", 700)
        .attr("dy", "30em")
        .style("text-anchor", "end")
        .text("Month");
});
$('.dropdown-toggle').dropdown();
