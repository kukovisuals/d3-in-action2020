d3.csv("data/cities.csv", (error, data) => dataViz(data));

function dataViz(incomingData) {
  d3.select("body").selectAll("div.cities")            
    .data(incomingData)           
    .enter()                                           
    .append("div")                                
    .attr("class","cities")                         
    .html(d => d.label);                               
}