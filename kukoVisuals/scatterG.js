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
	// console.log(newData)
	const xExtent  = d3.extent(newData, (el,i) => i )
	const yExtent  = d3.extent(newData, el => el.followers)         
	const m3 			 = mmm(newData)
	const radSc 	 = d3.scaleLinear().domain([0, m3.max]).range([1,50])
	console.log( xExtent[1] )

	const xScale = d3.scaleLinear().domain([0,xExtent[1]]).range([0,width])
	const yScale = d3.scaleLinear().domain([0,m3.max]).range([height,0])
	const xAxis = d3.axisBottom().scale(xScale).tickSize(width).ticks(10)
	const yAxis = d3.axisRight().scale(yScale).ticks(10).tickSize(height)
	const colors = d3.scaleQuantile().domain(yExtent).range(["red", "blue", "green"])

	d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis)
	d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis)

	const step1 = d3.select("svg").selectAll("g")
		.data(newData)
		.enter().append("g")
		.attr("transform", (d,i) => 
			`translate(${xScale(i)} , ${yScale(d.followers)} )`)

	step1.append("circle")
		.attr("r", d => radSc(d.followers))
		.style("fill", d => colors(d.followers))
		.style("stroke", "black")
		.style("stroke-width", "1px")

	step1.append("text")
		.text(d => d.name)

	// d3.selectAll("g").each( d => console.log("g ",d))
	// d3.selectAll("text").each( d => console.log("text ",d))
	// d3.selectAll("circle").each( d => console.log("circle ", d))
	// console.log(xScale(100))	
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
