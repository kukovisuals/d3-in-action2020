// d3.csv("data.csv",(error, data) => {dataViz(data)});

// function dataViz(incomingData) {
//    // change the population value to an integer 
//    var maxPopulation = d3.max(incomingData, d => parseInt(d.population));
//    var yScale = d3.scaleLinear().domain([0,maxPopulation]).range([0,460]);

//    d3.select("svg").attr("style","height: 480px; width: 600px;");

//    d3.select("svg")
//     .selectAll("rect")
//     .data(incomingData)
//     .enter()
//     .append("rect")
//       .attr("width", 50)
//       .attr("height", d => yScale(parseInt(d.population)))
//       .attr("x", (d,i) => i * 60)
//       .attr("y", d => 480 - yScale(parseInt(d.population)))
//       .style("fill", "#FE9922")
//       .style("stroke", "#9A8B7A")
//       .style("stroke-width", "1px");
//    }

// speficy data.tweets where your data array is located 
d3.json("tweets.json",(error, data) => {dataViz(data.tweets)});         
function dataViz(incomingData) {
var nestedTweets = d3.nest()
  .key(d => d.user)
  .entries(incomingData);

nestedTweets.forEach(d => {
   // create a new attribute based on the number of tweets 
  d.numTweets = d.values.length;                                        
})
var maxTweets = d3.max(nestedTweets, d => d.numTweets);
var yScale = d3.scaleLinear().domain([0,maxTweets]).range([0,500]);
d3.select("svg")
  .selectAll("rect")
  .data(nestedTweets)
  .enter()
  .append("rect")
  .attr("width", 50)
  .attr("height", d => yScale(d.numTweets))
  .attr("x", (d,i) => i * 60)
  .attr("y", d => 500 - yScale(d.numTweets))
  .style("fill", "#FE9922")
  .style("stroke", "#9A8B7A")
  .style("stroke-width", "1px");
}