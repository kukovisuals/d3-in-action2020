const data =  [14, 68, 24500, 430, 19, 1000, 5555]

//const yScale = d3.scaleLinear().domain([0,24500]).range([0,500])
// const yScale = d3.scaleLinear().domain([0,100,1000,24500]).range([0,50,75,500])
// const yScale = d3.scaleLinear().domain([0,100,500]).range([0,50,500]);

//if you want to set all such values to a maximum use the .clamp() function
var yScale = d3.scaleLinear()
             .domain([0,100,500])
             .range([0,50,500])
             .clamp(true);


d3.select("svg")
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("width", 50)                      
  .attr("height", d => yScale(d))
  .style("fill","blue")
  .style("stroke", "red")
  .style("stroke-width", "1px")
  .style("opacity", .25)
  	.attr("x", (d, i) => i * 50)
  	.attr('y', d => 500 - yScale(d));
