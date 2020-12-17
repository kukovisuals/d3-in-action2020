function createSoccerViz() {
  //  load the data and runs create Soccerviz with the loaded data
  d3.csv("../../data/worldcup.csv", data => {overallTeamViz(data)})                 

  function overallTeamViz(incomingData) {
    d3.select("svg")
      .append("g") // appends a <g> to the <svg>                                                         
      .attr("id", "teamsG")
      .attr("transform", "translate(50,300)")
      .selectAll("g")
      .data(incomingData)
      .enter()
      .append("g")
      .attr("class", "overallG")
      .attr("transform", (d, i) =>"translate(" + (i * 50) + ", 0)") // creates <g> for each team to add labels
      // assigns the selection to a cvariable to refer to it without typing out d3.selecAll()
    var teamG = d3.selectAll("g.overallG");                                
    teamG
      .append("circle")
      .attr("r", 20)
     teamG
      .append("text")
      .attr("y", 30)
      .text(d => d.team)

    const dataKeys = Object.keys(incomingData[0]).filter( d => d != d.team && d != d.region )
    console.log(dataKeys)

    d3.select("#controls").selectAll("button.teams")
      .data(dataKeys)
      .enter()
      .append("button")
      .on("click", buttonClick)
    .html(d => d ) // create the buttons with the titles in dataKeys

    teamG.on("mouseover",heightlightRegion)

    teamG.on("mouseout", function(){
      d3.selectAll("g.overallG")
        .select("circle").classed("inactive", false).classed("active", false)
    })
    
    function buttonClick(datapoint){
      const maxValue = d3.max( incomingData, d => parseFloat(d[datapoint]))
      const radiusScale = d3.scaleLinear().domain([0,maxValue]).range([2,20])
      d3.selectAll("g.overallG").select("circle")
        .attr("r", d => radiusScale(d[datapoint]))
    }

    function heightlightRegion(d){
      d3.selectAll("overallG").select("circle")
        .attr("class", p => p.region === d.region ? 'active' : 'inactive')
    }



  }

}




