d3.json("tweets.json",(error, data) => {dataViz(data.tweets)});       

function dataViz(incomingData) {
incomingData.forEach(d => {
  // Creates an impact score by totalling the number of favorite tweets
  d.impact = d.favorites.length + d.retweets.length;                     
  // transform the ISO 8906-COMPLIANT STRING INTO A DATE DATATYPE 
  d.tweetTime = new Date(d.timestamp);                                   
})

var maxImpact = d3.max(incomingData, d => d.impact);
// Returns the earliest and lates times for a scale
var startEnd = d3.extent(incomingData, d => d.tweetTime);                
// StartEnd is an array 
var timeRamp = d3.scaleTime().domain(startEnd).range([20,480]);          
var yScale = d3.scaleLinear().domain([0,maxImpact]).range([0,460]);
var radiusScale = d3.scaleLinear()
                    .domain([0,maxImpact]).range([1,20]);
var colorScale = d3.scaleLinear()
                  // Builds a scale that maps impact to a ramp from white to dark red
                   .domain([0,maxImpact]).range(["white","#75739F"]);   

d3.select("svg")
  .selectAll("circle")
  .data(incomingData)
  .enter()
  .append("circle")
  // Size, color and vertical position will all be based on impact 
  .attr("r", d => radiusScale(d.impact))                                 
  .attr("cx", d => timeRamp(d.tweetTime))
  .attr("cy", d => 480 - yScale(d.impact))
  .style("fill", d => colorScale(d.impact))
  .style("stroke", "black")
  .style("stroke-width", "1px");


var tweetG = d3.select("svg")
  .selectAll("g")
  .data(incomingData)
  .enter()
  .append("g")
  .attr("transform", d =>
  "translate(" +
    timeRamp(d.tweetTime) + "," + (480 - yScale(d.impact))        
    + ")"
  );

tweetG.append("circle")
  .attr("r", d => radiusScale(d.impact))
  .style("fill", "#75739F")
  .style("stroke", "black")
  .style("stroke-width", "1px");
tweetG.append("text")
  .text(d => d.user + "-" + d.tweetTime.getHours());  

  
};




