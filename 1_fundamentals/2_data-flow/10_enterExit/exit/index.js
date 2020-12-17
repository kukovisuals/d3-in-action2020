d3.json("../data/tweets.json", (data) => dataViz(data.tweets));

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

  const tweetG = d3.select("svg")
    .selectAll("g")            
    .data(incomingData, d => JSON.stringify(d))           
    .enter()                                           
    .append("g")
    .attr("transform" ,d => 
      `translate( ${timeRamp(d.tweetTime)}, ${(480 - yScale( d.impact ) )} ) `);
  
  tweetG.append("circle")   
    .attr("r", d => radScale(d.impact))
   .style("fill", d => colorScale(d.impact))
    .style("stroke", "black")
    .style("stroke-width", "1px");
  
  tweetG.append("text")
    .text( d => d.user + "-" + d.tweetTime.getHours() )

  const filterData = incomingData.filter(d => d.impact > 0)

  d3.selectAll("circle")
    .data(filterData, d => JSON.stringify(d))
    .exit()
      .remove();

  d3.selectAll("text")
    .data(filterData, d => JSON.stringify(d))
    .exit()
      .remove();    
}