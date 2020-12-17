d3.json("../../data/tweets.json", (data) => dataViz(data.tweets));

function dataViz(incomingData) {
    console.log(incomingData)
	let nestedTweets = d3.nest()
          .key(d => d.user)
          .entries(incomingData);
        
    nestedTweets.forEach(d => {
      d.numTweets = d.values.length;
      return d.numTweets
      // console.log(d.numTweets)
    });

	const maxTweets = d3.max( nestedTweets, el => el.numTweets );

	const yScale = d3.scaleLinear()
		.domain([0,maxTweets])
		.range([0,500]);	

  d3.select("svg")
  	.selectAll("rect")            
    .data(nestedTweets)           
    .enter()                                           
    .append("rect")
    .attr("width", 50)
    .attr("height", d => yScale(d.numTweets))
    .attr("x", (d,i) => i * 50)
    .attr("y", d => 500 - yScale(d.numTweets))
    .style("fill", "blue")
    .style("stroke", "black")
    .style("stroke-width", "2px").style("opacity", 0.25);

}