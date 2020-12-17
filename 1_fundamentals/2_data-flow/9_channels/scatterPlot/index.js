d3.json("../../data/tweets.json", (data) => dataViz(data.tweets));

function dataViz(incomingData) {
  console.log(incomingData)
	
  incomingData.forEach(d => {
    d.impact = d.favorites.length + d.retweets.length
    d.tweetTime = new Date(d.timestamp)
  })
	const maxImpact = d3.max( incomingData, el => el.impact );
  const startEnd = d3.extent(incomingData, d => d.tweetTime )
  
  const timeRamp = d3.scaleTime()
    .domain(startEnd)
    .range([20,480])

  const yScale = d3.scaleLinear()
		.domain([0,maxImpact])
		.range([0,460]);	

  const radScale = d3.scaleLinear()
    .domain([0,maxImpact])
    .range([0,20])

  const colorScale = d3.scaleLinear()
    .domain([0,maxImpact])
    .range(['white', '#990000'])

  d3.select("svg")
  	.selectAll("circle")            
    .data(incomingData)           
    .enter()                                           
    .append("circle")
    .attr("r", d => radScale(d.impact))
    .attr("cx", (d,i) => timeRamp(d.tweetTime))
    .attr("cy", d => 480 - yScale(d.impact))
    .style("fill", d => colorScale(d.impact))
    .style("stroke", "black")
    .style("stroke-width", "1px");

}