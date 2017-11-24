
// Thomas van Dooren, 10625488. Dataprocessing. Test.js is responsible for drawing some rectangles on a svg element on a website.

d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;    
    document.body.appendChild(xml.documentElement);

   
    	// Maak nieuwe vierkanten aan.
	    d3.select("svg").append("rect").attr("height", 29)
	    .attr("width", 22).attr("x", 13).attr("y", 138.7)
	    .style("fill", "#41ae76").style("stroke", "black")

	    d3.select("svg").append("rect").attr("height", 29)
	    .attr("width", 22).attr("x", 13).attr("y", 138.7 + 41.9)
	    .style("fill", "#238b45").style("stroke", "black")

	    d3.select("svg").append("rect").attr("height", 29)
	    .attr("width", 22).attr("x", 13).attr("y", 138.7 + 41.9 * 2)
	    .style("fill", "#005824").style("stroke", "black")

	     
	    // Kleur de al bestaande vierkanten in.
	    d3.select("#kleur1").style("fill", "#ccece6")

	    d3.select("#kleur2").style("fill", "#99d8c9")

	    d3.select("#kleur3").style("fill", "#66c2a4")


	    // Maak nieuwe rechthoeken.
	    d3.select("svg").append("rect").attr("height", 29)
	    .attr("width", 119.1).attr("x", 46.5).attr("y", 138.7 + 41.9)
	    .style("fill", "white").style("stroke", "black")
	     
	    d3.select("svg").append("rect").attr("height", 29)
	    .attr("width", 119.1).attr("x", 46.5).attr("y", 138.7 + 41.9 * 2)
	    .style("fill", "white").style("stroke", "black")
	    
	    // Zet tekst in de rechthoeken.
	    d3.select("svg").append("text").attr("x", 73).attr("y", 33)
	    .style("text-anchor", "end").text("100")

	    d3.select("svg").append("text").attr("x", 73 + 8).attr("y", 33 + 41.9)
	    .style("text-anchor", "end").text("1000")

	    d3.select("svg").append("text").attr("x", 73 + 8 * 2).attr("y", 33 + 41.9 * 2)
	    .style("text-anchor", "end").text("10000")

	    d3.select("svg").append("text").attr("x", 73 + 8 * 3).attr("y", 33 + 41.9 * 3)
	    .style("text-anchor", "end").text("100000")

	    d3.select("svg").append("text").attr("x", 73 + 8 * 4).attr("y", 33 + 41.9 * 4)
	    .style("text-anchor", "end").text("1000000")

	    d3.select("svg").append("text").attr("x", 73 + 8 * 5).attr("y", 33 + 41.9 * 5)
	    .style("text-anchor", "end").text("10000000")
});