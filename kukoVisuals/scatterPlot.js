d3.json("../data/colombia.json", suHijo => suMadre(suHijo.Colombia) )

const width = 500
const height = 500

function Artists(name, followers){
	return {
		name,
		followers
	}
}

function suMadre(data){

	const testArray = data.split(", ")
	const holder = []; newData= []
	const filtros = (data, fil) => data.filter( v => v.followers > fil) 
	const filA = 30

	testArray.map( (v,i) => {
		holder.push(Artists(v, elRegex(v)) )
	})
	// clean the data
	holder.map( (v,i) => {
		const v1 = v.followers.length
		const v2 = v.followers[v1-1]
		const step1 = v2.replace(/\,|\s/, "")
		newData.push(Artists(v.name,+step1) )
	})
	
	const xExtent = d3.extent(newData, (d,i) => i)
	const yExtent = d3.extent(newData, d => d.followers)
	const xScale = d3.scaleLinear().domain(xExtent).range([0,width]);
	const yLog = d3.scaleLog().base(2).domain([ 1,yExtent[1] ]).range([height+20,20])
	// const yScale = d3.scaleLinear().domain([ 1,yExtent[1] ]).range([width,0]);

	// console.log(yLog(0))
	const yAxis =  d3.axisRight().scale(yLog)
		.ticks(9).tickSize(height)
	d3.select("svg").append("g").attr("id","yAxisG").call(yAxis)
	const xAxis = d3.axisBottom().scale(xScale)
		.tickSize(width+10).ticks(10)
	d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis)
	// d3.selectAll("#xAxisG").attr("transform", `translate(0,${height})`)

	const circles = d3.select("svg").selectAll("circle")
	  .data(newData).enter().append("circle")
	  .attr("r", 5)
	  .attr("cx", (d,i) => xScale(i))
	  .attr("cy", d => yLog(d.followers));

	const filtData = newData.filter( d => d.followers > 1)

	d3.selectAll("circle")
		.data(filtData, d => JSON.stringify(d))
		.exit()
		.remove()

}

function mmm(data){
	const min 		 = d3.min(data, d => d.followers);		      
	const mean 		 = d3.mean(data, d => d.followers);  
	const max 		 = d3.max(data, d => d.followers);     
	const maxI 		 = d3.extent(data, d => d.followers)
	
	return {min, max, mean, maxI}
}
function elRegex(data,index){
	const step1 = /[a-zA-Z]/g
	const step2 = data.replace(step1, '')
	const step3 = step2.replace(/[.*+\-?^${}():_[/]|[\]\\]/g, "")
	const step4 = step3.replace(/\s+[0-9]+\s/g, "")
	const step5 = step4.replace(/\s+[^a-zA-Z0-9]+\s/g, "")
	const step6 = step5.split(" ")
	return step6
}
