# D3 In Action summary 

# 1. Intro 

This is a brief summary for the 2nd edition of the book of D3 In Action by Elijah Meeks, If this is not legal I'll make this private. I just want to have a personal guide of the learnings from this book in case i need to come back to any of the many tools he kindly provides here. Thank you, so much for this book. I hope this brief summery encourages some readers to read his book :) 

## The DOM 

bA simple page demonstrating the DOM 

```html
<!doctype html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.8/d3.min.js" type="text/JavaScript"></script>                                       
</head>                                                                      
<body>                                                                       
  <div id="someDiv" style="width:200px;height:100px;border:black 1px solid;">
	<input id="someCheckbox" type="checkbox" />                                
  </div>
</body>
</html>
```
------------------------------------------------------------------------------

To get started, you’ll need a web server that you can access from the computer that you’re using to code. With that in place, you can download the D3 library from d3js.org (d3.js or d3.min.js for the minified version) and place that in the directory where you’ll make your web page

```js
d3.select("#someDiv").style("border", "5px darkgray dashed"); // appearance
d3.select("#someDiv").attr("id", "newID"); // include classes, IDs, and interactive behaviors
d3.select("#someCheckbox").property("checked", true); // states such as "checked" property for check box 
````

------------------------------------------------------------------------------

`<canvas>`

Element to draw bitmaps. Canvas elements creates static graphics drawn in a manner familiar with svg that can then be saved as images.
Reasons to use canvas:

	- Creating static images -> You can draw your data visualization with canvas to save views as snapshots for thumbnails and gallery views

	- Large amounts of data -> SVG creates individual elements in the DOM, which can overwhelm a browser and cause significant slowdown

WebGL- `<canvas>` element allows you to use WebGL to draw, so that you can create 3D objects. 

------------------------------------------------------------------------------
## SVG 

Provides a set of common shapes, `<rect> <circle> <line> <ellipse> <polygon>`

`<g>` -> or group element it has not graphical representation and doesn't exist as a bounded space. you'll want to use `<g>` elements extensively when creating graphical objects that are made up of several shapes and text. For instance, if you want to create a circle with a label above it and move the circle and the label at the same time, then you'd place them inside a <g> element.

Moving `<g>` elements with -> translate() which accepts a pair of coordinates that move the element to the xy position defined by the values in translate (x,y) 

the transform attribute also accepts a -> scale() so that you can change the render scale

------------------------------------------------------------------------------

```html
<g>   
	<circle r="2"/>   
	<text>This circle's Label</text>
</g>

<g transform="translate(100,50)">   
	<circle r="2" />   
	<text>This circle's Label</text>
</g>

<g transform="translate(100,400) scale(2.5)">   
	<circle r="2"/>   
	<text>This circle's Label</text>
</g>
```

------------------------------------------------------------------------------

`<path>`	  is an area determine by its d attribute 

------------------------------------------------------------------------------

```html
<path style="fill:none;stroke:gray;stroke-width:4px;"     
	d="M 10,60 40,30 50,50 60,30 70,80" transform="translate(0,0)" />

<path style="fill:black;stroke:gray;stroke-width:4px;"     
	d="M 10,60 40,30 50,50 60,30 70,80" transform="translate(0,100)" />

<path style="fill:none;stroke:gray;stroke-width:4px;"     
	d="M 10,60 40,30 50,50 60,30 70,80Z" transform="translate(0,200)" />

<path style="fill:black;stroke:gray;stroke-width:4px;"     
	d="M 10,60 40,30 50,50 60,30 70,80Z" transform="translate(0,300)" />

```

------------------------------------------------------------------------------

## CSS

You can use CSS to style 

------------------------------------------------------------------------------

```html
<body>                                              
	<div id="infovizDiv">  
		<svg style="width:500px;height:500px;border:1px lightgray solid;">    
			<path d="M 10,60 40,30 50,50 60,30 70,80" />   
			<polygon class="inactive" points="80,400 120,400 160,440 120,480 60,460" />  	
			<g>  
			 	<circle class="active tentative" cy="100" cx="200" r="30"/>  
			 	<rect class="active" x="410" y="200" width="100" height="50" />  
			</g>  
		</svg> 
	</div>
</body>
```

-------------------------------------------------------------------------------

## JavaScript 

when writing Javascript with D3 you should familiarize yourself with two subjects:
method chaining and arrays.

-------------------------------------------------------------------------------
```js
d3.selectAll("div").data(someData).enter().append("div").html("Wow").append("span").html("Even More Wow").style("font-weight", "900");
```
-------------------------------------------------------------------------------
```js
d3.selectAll("div")                       1  
.data(someData)                           2  
.enter()                                  3  
.append("div")                            4  
.html("Wow")                              5  
.append("span")                           6  
.html("Even More Wow")                    7  
.style("font-weight", "900");     				8
````

-------------------------------------------------------------------------------
	
	1. Return a selection, an object with various functions available
	2. Sets the data on the selection and returns the selection 
	3. Returns the selection.enter() object 
	4. Sets .append() behavior on the selection.enter object and returns 
		the selection.enter object 
	5. Set .html() for the selection.enter object and returns the selection.enter object
	6. Sets the append() behavior on the selection.enter object and returns the enter.append object
	7. Sets the html() for the enter.append object and returns the enter.append object
	8. Sets the font-weight style on the enter.append object and returns the enter,append object

------------------------------------------------------------------------------

D3 is all about arrays, so it's important to understand them

```js
const someNumbers = [17, 82, 9, 500, 40];
const someColors = ["blue", "red", "chartreuse", "orange"];
```
Or it maybe an array of JavaScript objects

```js
const somePeople = [{name: "Peter", age: 27}, {name: "Sulayman", age: 24},{name: "K.C.", age: 49}];
```
One example of a useful array function is `.filter()`

```js 
someNumbers.filter( d => d >= 40);
```
Likewise, here’s how you could create an array out of someColors with names shorter than five letters:

```js
someColors.filter( d => d.length < 5);  
```

------------------------------------------------------------------------------

```js
const smallerNumbers = someNumbers.filter( el => d <= 40);

d3.select("body").selectAll("div")  
.data(smallerNumbers)  
.enter()  
.append("div")  
.html( d => d);
```
The resulting code creates two new divs from your three-value array smallerNumbers. (Remember that one div already exists, and so the .enter() function doesn’t trigger even though data is bound to that existing div.)
The contents of the div are the values in your array. This is done through an anonymous function (sometimes referred to in D3 examples as an accessor) in your .html() function and is another key aspect of D3. Any anonymous function called when setting the .style(), .attr(), .property(), .html(), or other function of a selection can provide you with the data bound to that selection

```js
.style("background", (d) => d)
.attr("cx", (d,i) => i)
.html( (d) => d)
```
In every case, the fist variable (shown in here as the letter `d`) contains the data bound to that element and the second value returns the array position (shown as the letter `i`) 

## Data Standards 

Data can be formatted in a variety of manners for a variety of purposes, but it tends to fall into a few recognizable categories. **tubular data, nested data, network data, geographic data, raw data, and objects**.

## Infoviz Standards Expressed in D3

###### Infoviz tip: kill your darlings

One of the best peace of advice when it comes to working in information visualization comes with the practice of writing: `"Kill your darlings"` you can become enamored of a particular elegant or sophisticated looking graphic.
Your love of cool chart can distract you from the foal of communicating the structure and patterns in the data.

------------------------------------------------------------------------------


# 2. Information Visualization Data Flow 

* Loading data from external files of various formats
* Working with D3 scales
* Formating data for analysis and display 
* Creating graphics with visuals attributes based on data attributes
* Animating and changing the appearance of graphics

## Working with Data

### Loading Data 

` **Load**---Format---Measure---Create-->update `

One core difference between CSV, JSON and, XML, formats is how they model data. `d3.csv()` and `d3.json()` produce an array of JSON objects, whereas `d3.xml()`  creates an XML document that needs to be access in a different manner. 

D3 has five functions typically use for lading data: `d3.text(), d3.xml(), d3.csv(), d3.json(), and d3.html()`. These abstract the same XHR request that a library like fetch does.

Both `d3.csv() and d3.json()` use the same format when calling the function, by declaring the path to the file being loaded and defining the callback function:

```js
d3.csv("cities.csv", (error,data) => {console.log(error,data)});
```

###### Should I be using XHR?

Asynchronous loading of the data isn't necessary if your data is never going to change during the course of the application being used. Instead format your data and include it using a `<script>` tag or import/required the data if you're working with Node or ES2015

To get started we'll be working with two data files a: CSV file and a JSON file.

###### CSV  

	"label","population","country","x","y"
	"San Francisco", 750000,"USA",122,-37
	"Fresno", 500000,"USA",119,-36
	"Lahore",12500000,"Pakistan",74,31
	"Karachi",13000000,"Pakistan",67,24
	"Rome",2500000,"Italy",12,41
	"Naples",1000000,"Italy",14,40
	"Rio",12300000,"Brazil",-43,-22
	"Sao Paolo",12300000,"Brazil",-46,-23

###### JSON 
	
	{
	"tweets": [
	{"user": "Al", "content": "I really love seafood.",
	   "timestamp": " Mon Dec 23 2013 21:30 GMT-0800 (PST)",
	   "retweets": ["Raj","Pris","Roy"], "favorites": ["Sam"]},
	{"user": "Al", "content": "I take that back, this doesn't taste so good.",
	   "timestamp": "Mon Dec 23 2013 21:55 GMT-0800 (PST)",
	   "retweets": ["Roy"], "favorites": []},
	{"user": "Al",
	   "content": "From now on, I'm only eating cheese sandwiches.",
	   "timestamp": "Mon Dec 23 2013 22:22 GMT-0800 (PST)",
	   "retweets": [],"favorites": ["Roy","Sam"]},
	{"user": "Roy", "content": "Great workout!",
	   "timestamp": " Mon Dec 23 2013 7:20 GMT-0800 (PST)",
	   "retweets": [],"favorites": []},
	{"user": "Roy", "content": "Spectacular oatmeal!",
	   "timestamp": " Mon Dec 23 2013 7:23 GMT-0800 (PST)",
	   "retweets": [],"favorites": []},
	{"user": "Roy", "content": "Amazing traffic!",
	   "timestamp": " Mon Dec 23 2013 7:47  GMT-0800 (PST)",
	   "retweets": [],"favorites": []},
	{"user": "Roy", "content": "Just got a ticket for texting and driving!",
	   "timestamp": " Mon Dec 23 2013 8:05 GMT-0800 (PST)",
	   "retweets": [],"favorites": ["Sam", "Sally", "Pris"]},
	{"user": "Pris", "content": "Going to have some boiled eggs.",
	   "timestamp": " Mon Dec 23 2013 18:23 GMT-0800 (PST)",
	   "retweets": [],"favorites": ["Sally"]},
	{"user": "Pris", "content": "Maybe practice some gymnastics.",
	   "timestamp": " Mon Dec 23 2013 19:47  GMT-0800 (PST)",
	   "retweets": [],"favorites": ["Sally"]},
	{"user": "Sam", "content": "@Roy Let's get lunch",
	   "timestamp": " Mon Dec 23 2013 11:05 GMT-0800 (PST)",
	   "retweets": ["Pris"], "favorites": ["Sally", "Pris"]}
	]
	}

With these two files, we can access the data by using the appropriate function to load them:

```js
d3.csv("cities.csv", data => console.log(data));
d3.json("tweets.json", data => console.log(data));           1
```

* 1 Prints “Object {tweets: Array[10]}” in the console

When you load a CSV, it returns an array of objects. When you load a JSON file, it will return an object with one or more key/value pairs (known as entries).

Both d3.csv and d3.json are asynchronous, and will return after the request to open the file and not after processing the file.

If you call functions that require the loaded data before it’s loaded, then they’ll fail. You can get around this asynchronous behavior in two ways. You can nest the functions operating on the data in the data-loading function:

```js
d3.csv("somefiles.csv", (data) => doSomethingWithData(data) );
```
Or you can use promises (which we’ll use in chapter 7) to trigger events upon completion of the loading of one or more files

If you need more direct control over getting data, you should review the documentation for **d3-request**, which allows for more fine-grained control of sending and receiving data.

## Formating data

` Load---**Format**---Measure---Create-->update `

You’ll typically need to format quantitative data by defining scales using `d3.scale*`functions (such as `d3.scaleLinear and d3.scaleTime`)

###### Quantitative

Numerical or quantitative data is the most common type in data visualization. Quantitative data can be effectively represented with size, position, or color.

###### Categorical

Categorical data falls into discrete groups, typically represented by text, such as nationality or gender. Categorical data is often represented using shape or color

###### Topological

Topological data describes the relationship of one piece of data with another, which can also be another form of location data. The genealogical connection between two people or the distance of a shop from a train station each represents a way of defining relationships between objects.

###### Geometric

Geometric data is most commonly associated with the boundaries and tracks of geographic data, such as countries, rivers, cities, and roads. Geometric data might also be the SVG code to draw a particular icon that you want to use, the text for a class of shape, or a numerical value indicating the size of the shape

###### Temporal 

Dates and time can be represented using numbers for days, years, or months, or with specific date-time encoding for more complex calculations. The most common format is ISO 8601, and if your data comes formatted that way as a string, it’s easy to turn it into a date datatype in JavaScript.

###### Raw 

Raw, free, or unstructured data is typically text and image content. Raw data can be transformed by measuring it or using sophisticated text and image analysis to derive attributes more suited to data visualization


## Further Modifying data 

You should familiarize yourself with the JavaScript functions that allow you to transform data. Here are a few:

	parseInt("77"); +"77";                                 1
	parseFloat("3.14"); +"3.14"                            2
	Date.parse("Sun, 22 Dec 2013 08:00:00 GMT");           3
	text = "alpha,beta,gamma"; text.split(",");            4

1. Casts the string 77 into the number 77 with no decimal places
1. Casts the string 3.14 into the number 3.14 with decimal places
1. Casts an ISO 8601– or RFC 2822–compliant string into a date datatype
1. Splits the comma-delimited string into an array, which isn’t strictly speaking a casting operation, but changes the type of data


###### Scale and Scaling 

The first scale we’ll look at is `d3.scale().linear()`, which makes a direct relationship between one range of numbers and another

you can use a linear rate of change from 500,000 to 13,000,000 maps to a linear rate of change from 0 to 500.

You create this ramp by instantiating a new scale object and setting its domain and range values:

```js
let newRamp = d3.scaleLinear().domain([500000,13000000]).range([0, 500]);

	newRamp(1000000);                       1
	newRamp(9000000);                       2
	newRamp.invert(313);                    3
```
1. Returns 20, allowing you to place a country with population 10,000,000 at 20 px
1. Returns 340
1. The invert function reverses the transformation, in this case returning 8325000

You can also clear a color ramp by referencing CSS color names, RGB colors, or hex colors in the range field. The effect is a linear mapping of band of color to the band of values defined in the domain.

The code to create this ramp is the same, except for the reference to colors in the range array:

```js
let newRamp = d3.scaleLinear().domain([500000,13000000]).range(["blue", "red"]);
newRamp(1000000);                                 1
newRamp(9000000);                                 2
newRamp.invert("#ad0052");                        3
```

1. Returns “#0a00f5”, allowing you to draw a city with population 1,000,000 as dark purple
1. Returns “#ad0052”
1. The invert function only works with a numeric range, so inverting in this case returns NaN

You can also use `d3.scaleLog(), d3.scalePow(), d3.scaleOrdinal(),` and other less-common scales to map data where these scales are more appropriate to your dataset.

###### Binning: categorizing data 

It's useful to sort quantitative data into categories, placing the values in a range or "bins" to group them together: `d3.scaleQuantile()`, and it has the same settings as other scales. Unlike other scales, it gives no error if there’s a mismatch between the number of `.domain()` values and the number or `.range()` 

```js
let sampleArray = [423,124,66,424,58,10,900,44,1];
let qScale = d3.scaleQuantile().domain(sampleArray).range([0,1,2]);
qScale(423);                                                        1
qScale(20);                                                         2
qScale(10000);                                                      3
```
1. Returns 2
1. Returns 0
1. Returns 2


```js
let qScaleName =
d3.scaleQuantile()
   .domain(sampleArray).range(["small","medium","large"]);
qScaleName (68);                                             1
qScaleName (20);                                             2
qScaleName (10000);             														 3
```
1. Returns “medium
1. Returns “small”
1. Returns “large”

###### Nesting 

but in this chapter we’ll use the D3 nesting function, which you can probably guess is called `d3.nest().`

For instance, if we want to group tweets by the user who made them, then we’d use nesting.

```js
d3.json("tweets.json", data => {
  let tweetData = data.tweets;
  let nestedTweets = d3.nest()
    .key(d => d.user)
    .entries(tweetData);
});
```
This nesting function combines the tweets into arrays under new objects labeled by the unique user attribute values.


## Measuring Data 

After Loading your data array, one of the first things you should do it measure and sort it. 

` load -> format -> **measure** -> create -> update` 

sorting data into minimum and maximum values

###### Test Array 

`var testArray =  [88,10000,1,75,12,35];`

```js
const testArray =  [88,10000,1,75,12,35];

const min = d3.min(testArray, el => el);		// 1       
const max = d3.max(testArray, el => el);   // 10000         
const mean = d3.mean(testArray, el => el);  // 1701.833333335

console.log(min, max, mean)

d3.csv("data/data.csv", data => {
	d3.extent(data, function(el) {return  +el.population } );	  
	d3.mean(data, el => +el.population);  

})
```

## DATA-BINDING

` load -> format -> measure -> **create** -> update `

## Selections and Bindings

 Use selections to make changes to the structure and appearance of your web page. You can also create and delete elements using selection.

###### D3.selectAll()

The first part of any selection is `d3.select()` or `d3.selectAll()` with a CSS identifier that corresponds to a part of the DOM. Often no element match the identifier, which is referred as an empty -selection- because you want to create new elements on the page using the `.enter()` function. You can make a selection of a selection to designate how to create and modify a child element of a speficific DOM element. Note that a subselection won't automatically generate a parent. The parent must already exist, or you'll need to create one using `.append()`

###### .data()

Here you associate an array with a DOM element you selected.

###### .enter() and exit()

When binding data to selections, there will be eithere more, less or the same number of DOM elements as there are data values. 

When you have more data values than DOM elements, you trigger the `enter()` function. Which allow us to define behaviors for every value that doesn't have a corresponding DOM elements. 

When there are fewer data elements, then `exit()` behavior is triggered. 

When there are equal data values in DOM elements in a selection, then neither `exit() nor enter()` is fired.

###### .append() and insert()

You'll almost want to add elements to the DOM when there are more data values than DOM elements. `append()` function allows you to add more elements and defiend which elements to add

`insert()` is the sister function to `append()`  but `insert()` gives you control on where in the DOM you add the element.

###### .attr()

Each of the functions you define here will be apply to every new element added to the page.


###### .html()

for traditional DOM elements, you set the content with `.html()`


## Accessing data with inline function 

In most examples you'll see these represented as `d` for data and `i` for array index

```js
d3.select("svg")
  .selectAll("rect")
  .data([15, 50, 22, 8, 100, 10])
  .enter()
  .append("rect")
  .attr("width", 50)                      
  .attr("height", d => d)
  .style("fill","blue")
  .style("stroke", "red")
  .style("stroke-width", "1px")
  .style("opacity", .25)
  	.attr("x", (d, i) => i * 50)
  	.attr('y', d => 250 - d);
```

## Integrating scale
	
We'll use the relatively streight forward `d3.scale().linear()` for this bar chart. D3 scale has two primary functions:

`domain() and range()` Both of which expet arrays and which must have the same length to get the right result. 

The array in `domain()` indicates the series of values being mapped to `.range()`


```js
const data =  [14, 68, 24500, 430, 19, 1000, 5555]

const yScale = d3.scaleLinear().domain([0,24500]).range([0,500])

d3.select("svg")
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("width", 50)                      
  .attr("height", d => yScale(d))
  .style("fill","blue")
  .style("stroke", "red")
  .style("stroke-width", "1px")
  .style("opacity", .25)
  	.attr("x", (d, i) => i * 50)
  	.attr('y', d => 500 - yScale(d));

```

###### Polylinear Scale

If you have to deal with a widely diverging values use polylinear scales

```js
//polylinear scales
var yScale = d3.scaleLinear().domain([0,100,1000,24500]).range([0,50,75,500]); 

```
There may be a cutoff value, which it isn't importnat to express how large the data is

```js
const yScale = d3.scaleLinear().domain([0,100,500]).range([0,50,500]);
```
if you want to set all such values to a maximum use the .clamp() function

```js
var yScale = d3.scaleLinear()
             .domain([0,100,500])
             .range([0,50,500])
             .clamp(true);
```
## Data presentation Style, Attributes and Content

### infoviz term: Channel 

Channels such as hegight, width, color, position, and shapes

## Enter, Update, Merge and Exit 


As we learn enter triggers when there are fewer elements than data values in the DOM 

`exit()` works the same way when there are fewer values then DOM elements then `exit()` fires 



# 3. Data-driven Design and Interaction

	- Enabeling interactivity for user interaction
	- Working with color efectively
	- Loading traditional HTML for use as pop-ups
	- Loading external SVG icons into charts


## Transitions 

Transitions can be set using `delay()` or to occur over a set period of times using `duration()` 

```js
teamG
.append("text")
  .style("text-anchor", "middle")
  .attr("y", 30)
  .transition()
	.delay( (d,i) => i * 100)
	.transition()
	.delay(500)
  .text(d => d.team);
```

## DOM Manipulation 

* Using the `this` keyword
* Using the `.node()` function

```js
d3.select("circle").each(function(d,i) {
    console.log(d);console.log(i);console.log(this);
})
```
Move elements forward or backwards

### Syling

`d3.rgb()` 

```js 
teamColor = d3.rgb("red");
teamColor = d3.rgb("#ff0000");
teamColor = d3.rgb("rgb(255,0,0)");
teamColor = d3.rgb(255,0,0);
```
 This colors have two useful methods `.darker` and `.brighter()`

```js
function highlightRegion(d,i) {
  var teamColor = d3.rgb("#75739F")
  d3.select(this).select("text").classed("active", true).attr("y", 10)
  d3.selectAll("g.overallG").select("circle")

    .style("fill", p => p.region === d.region ?
        teamColor.darker(.75) : teamColor.brighter(.5))

  this.parentElement.appendChild(this);
}
```

#### Color mixing 

```js
var ybRamp = d3.scaleLinear()
  .domain([0,maxValue]).range(["blue", "yellow"])            1

d3.selectAll("g.overallG").select("circle")
   .attr("r", d => radiusScale(d[datapoint]))
   .style("fill", d => ybRamp(d[datapoint]))
```

interpolators 

```js
.interpolate(d3.interpolateHcl)
.interpolate(d3.interpolateLab)
```

#### Descrete colors 

D3 includes four collections of descrete color categories:

	`d3.schemeCategory10, d3.schemeCategory20, d3.schemeCategory20b, and d3.schemeCategory20c`

this are array colors meant to be passeded to `d3.scaleOrdinal`

```js
function buttonClick(datapoint) {
   var maxValue = d3.max(incomingData, function(el) {
       return parseFloat(el[datapoint ])
   })
   var tenColorScale = d3.scaleOrdinal()
       .domain(["UEFA", "CONMEBOL", "CAF",  "AFC"])
       .range(d3.schemeCategory10)
   var radiusScale = d3.scaleLinear().domain([0,maxValue]).range([2,20])
   d3.selectAll("g.overallG").select("circle").transition().duration(1000)
       .style("fill", p => tenColorScale(p.region))
       .attr("r", p => radiusScale(p[datapoint ]))
}
```

# 4. Chart Components

We will cover 

	Creating and formating axis components

	Creating Legends

	Using Line and area generators for charts

	Creating complex shapes consisting of multiple types of SVG elements


D3 functionality 

## Generators

D3 generators consist of functions that take data and return the necessary SVG drawing code to create a graphical object based on that data.

## Components

Components create an entire set of graphical objects necessary for a particular chart component:

	d3.axis()

which create a bunch of `<line>, <path>, <g>, and <text>` elements that are needed for an axis based on the sacle and settings you provide the function.

	d3.brush()

which create all graphical elements necessary for a brush selector

## Layouts 

pie chart layout, or complex, like a force-direct network layout.


## Interpolations 

To draw a gap when drawing a line between 2 points 

	d3.line().defined(d => d.y !== null)



## Hierarchichal Data 

### d3.cluster vs d3.tree

You should use d3.tree unless you have a good reason for lining up all your lead node on the same level.

### Drawing an icicle chart 

As with the other hierarchical chart, we need to first nest and process our data using d3.nest and d3.hierarchy. 


## TreeMaps	

