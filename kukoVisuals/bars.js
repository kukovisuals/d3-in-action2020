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
	const filA = 20

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
	const dataFil	 = filtros(newData,filA)
	const xExtent  = d3.extent(dataFil, (el,i) => i )
	const yExtent  = d3.extent(dataFil, el => el.followers)         
	const m3 			 = mmm(newData)
	// console.log(dataFil.map( v => v.followers) )

	const xScale = d3.scaleLinear().domain(xExtent).range([0,width])
	const yScale = d3.scaleLinear().domain([filA,m3.max]).range([filA,height])
	const xAxis = d3.axisBottom().scale(xScale).tickSize(width).ticks(10)
	const yAxis = d3.axisRight().scale(yScale).ticks(10).tickSize(height)
	const colors = d3.scaleQuantile().domain(yExtent).range(["red", "blue", "green"])

	d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis)
	d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis)
	// console.log(colors(5000))
	d3.select("svg").selectAll("circle")
		.data(dataFil)
		.enter()
		.append("circle")
		.attr("class","circulo")
		.attr("r", 5)
		.attr("cx", (d,i) => xScale(i + 1))
		.attr("cy", d => height - yScale(d.followers))
		.attr("fill", d => colors(d.followers))

		d3.select("svg").selectAll("rect")
		.data(dataFil)
		.enter()
		.append("rect")
		.attr("width", 2)
		.attr("height", d => yScale(d.followers))
		.attr("x", (d,i) => xScale(i + 1))
		.attr("y", d => height - yScale(d.followers))
		.attr("fill", d => colors(d.followers))
		.attr("stroke", "black")
		.attr("stroke-width", "1px")
}
function divs(data, yScale){
	
}

function mmm(value){
	const min 		 = d3.min(value, el => el.followers);		      
	const max 		 = d3.max(value, el => el.followers);     
	const mean 		 = d3.mean(value, el => el.followers);  
	
	return {min, max, mean}
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
