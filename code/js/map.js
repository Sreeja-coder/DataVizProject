class Map {
	
	
	constructor(data) {
		
		
		this.data = data;
		
		
		
	}
	
createmap(world)
{	
//defining the width, margin and height for display
var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 960 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

 


//creating svg
var svg = d3.select("#map-holder")
            .append("svg")
            .attr("width", width-45)
            .attr("height", height)
			.attr("class","svg")
			.style("background", "grey");
    //creating svg for plotting the weapons and intensity
var svg_stat = d3.select("#map-holder").append("svg").attr("id","stats").attr("height",height).attr("width","320")	
svg_stat.append("rect").attr("height",height).attr("width","320").attr("fill","grey");
//getting projections for the map
var projection = d3.geoMercator().scale(130).translate( [width / 2, height / 1.5]);
 
      
                 
var path = d3.geoPath().projection(projection); //defining the path for projection

//defining groups for each country #d3d3d3 .style('stroke-width', 1.5)
	
	 svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(world.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill","black")      
      .style("opacity",0.8)
      // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.4)
		.on("click",this.storytelling);
//creating the outline using path
svg.append("path")
      .datum(topojson.mesh(world.features, function(a, b) { return a.id !== b.id; }))
       // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
      .attr("class", "names")
      .attr("d", path);
	
	
//let aa = [77.837451,35.49401] logitude and latitude;
//let bb = [77.837451,35.49401];
//let aa = [75.3412,31.1471]
//let bb = [75.3412,31.1471]
let plotg = svg.append("g").attr("class","plotpoints");
	svg.append("select").attr("option","Weapons");
//calling the year slider	

	this.drawYearBar();
	this.plotting_attacks(2000,this.data);
	
  
}


drawYearBar() {
		// var rangeslider = document.getElementById("sliderRange");
		// var output = document.getElementById("demo");
		// output.innerHTML = rangeslider.value;
		//
		// rangeslider.oninput = function() {
		// 	output.innerHTML = this.value;
		// }
		//
		// d3.select('#scatter-plot')
		// 	.append('div').attr('id', 'activeYear-bar');
		//let that = this;
		let that = this
		
		let yearScale = d3.scaleLinear().domain([1800, 2020]).range([30, 730]);

		let yearSlider = d3.select('#activeYear-bar')
			.append('div').classed('slider-wrap', true)
			.append('input').classed('slider', true)
			.attr('id','sliderRange')
			.attr('type', 'range')
			.attr('min', 1970)
			.attr('max', 2018)
			.attr('value', 2000);

	var rangeSlider=document.getElementById("sliderRange");
    var output=document.getElementById("demo");

    output.innerHTML=rangeSlider.value;
    rangeSlider.oninput=function(){
    	output.innerHTML=this.value;
		let category1 = document.getElementById("category").value
		if (category1 == 'category'){
           console.log(category1)		
		if(this.value==1993){
			
			that.canvas()
			}		   
		that.plotting_attacks(this.value,that.data);
		//that.categorychange1(category1,that.data,1)
		}
        else{ if(this.value==1993){
			
			that.canvas()
			}
			that.categorychange(category1,that.data)}		
			}
		
		
		
		
		
         
		//let sliderLabel = d3.select('.slider-wrap')
			//.append('div').classed('slider-label', true)
			//.append('svg');

}
plotting_attacks(year,data)
{   var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 960 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
	var projection = d3.geoMercator().scale(130).translate( [width / 2, height / 1.5]);
	let plot = d3.select(".svg")
	//setting the color using 
	let flag = 0
	var category = data.map(i => i.attacktype1_txt)
  
	var unique_cat = category.filter((v, i, a) => a.indexOf(v) == i);
	//console.log(unique_cat)
	
	var colorScale2 = d3.scaleOrdinal().domain(unique_cat)
   .range(['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f','#e6194b','#46f0f0','#f58231']);
	
	
	let circlesp = plot.select(".plotpoints").selectAll("circle");
	circlesp.remove();
	d3.select("#overlay1").remove();
	
	//console.log("h2")
	let dataPoints = [];
	data.forEach((d,i)=> 
	{   
	 if(year==1993){
       flag=1;
	}
		
	if(d.year == year){	
	let aa =[d.longitude, d.latitude,d.attacktype1_txt];
	dataPoints.push(aa);
	//console.log(aa,bb)
			
	
	}})
	if(flag==1){
   
   this.canvas();
	}

		plot.select(".plotpoints").selectAll("circle").data(dataPoints)
		.join("circle")
		.attr("cx", function (d) {
			return projection(d)[0]; 
		})
		.attr("cy", function (d) { return projection(d)[1]; })
		.attr("r", "2px")
		.attr("fill", function (d) {
		return colorScale2(d[2])}).transition().duration(1000);
     this.draw_pie();
//plotting the targets
 // add circles to svg
    
	
	
}

storytelling()
    {
      let i = 0;
      var data = "B";
     let newdiv = d3.select("#map-holder").append("div").attr("id","overlay")
	 //let buttonpress=newdiv.append("button").attr("title","key");
	 newdiv.selectAll("button")
		.data(data)
		.enter()
		.append("button")
		.attr("id","buttons")
		.text("BACK")
		.on("click",function(){document.getElementById("overlay").onclick = function(){d3.select("#overlay").remove()}});
       let rectsvg =  newdiv.append("svg").attr("width","960").attr("height","600")
         
        // console.log( document.getElementById("overlay").style.display)
        //document.getElementById("overlay").onclick=that.overlayoff

         //document.getElementById("overlay").onclick = function(){d3.select("#overlay").remove()}
         //document.getElementById("map-holder").onclick=function(){d3.select("#overlay").remove()}

        //this.overlayoff()
        //console.log(x)




    }


categorychange(category,data1)
{
	//console.log(category)
	//let weapon_domain = ["Firearms","Melee","Explosives","Chemicals","Incendiary","Sabotage Equipment","Vehicle","Unkown"];
	let weapon_domain = [5,9,6,2,8,11,10,13];
	var colorScale = d3.scaleOrdinal().domain(weapon_domain)
            .range(['#00FF00', '#0000FF', '#00FFFF', '#ff66ff', '#800000', ' #ff9933','#FF0000','#CC00FF']);
	var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 960 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
	var projection = d3.geoMercator().scale(130).translate( [width / 2, height / 1.5]);
	let plot_category = d3.select(".svg")
	let year = document.getElementById("demo").innerHTML
	let width1 = 320;
	
	d3.select("#overlay1").remove();
	if(category === 'Weapons')
	{
	let circlescategory = plot_category.select(".plotpoints").selectAll("circle");
	circlescategory.remove();
	
	
	let count_weapons = [0,0,0,0,0,0,0,0];
	
	let dataPoints = [];
	let weapontype = []
	 
	data1.forEach((d1,i)=> 
	{   
		
	if(d1.year == year){	
	 
	let aa =[d1.longitude, d1.latitude];
	dataPoints.push(aa);
	weapontype.push(d1.weaptype1)
	//console.log(aa,bb)
			
	
	}})
		
		
		plot_category.select(".plotpoints").selectAll("circle").data(dataPoints)
		.join("circle")
		.attr("cx", function (d) {
			return projection(d)[0]; 
		})
		.attr("cy", function (d) { return projection(d)[1]; })
		.attr("r", "2px")
		.attr("fill", function(d,i){if(weapontype[i]=='5'){count_weapons[0]= count_weapons[0]+1;};
		if(weapontype[i]=='9'){count_weapons[1]= count_weapons[1]+1};
		if(weapontype[i]=='6'){count_weapons[2]= count_weapons[2]+1};
		if(weapontype[i]=='2'){count_weapons[3]= count_weapons[3]+1};
		if(weapontype[i]=='8'){count_weapons[4]= count_weapons[4]+1};
		if(weapontype[i]=='11'){count_weapons[5]= count_weapons[5]+1};
		if(weapontype[i]=='10'){count_weapons[6]= count_weapons[6]+1};
		if(weapontype[i]=='13'){count_weapons[7]= count_weapons[7]+1};
		return colorScale(weapontype[i])}).transition().duration(1000);
		//console.log(count_weapons)
	//removing already present tree
	
	
		
	d3.select("#stats").select("#treegroup").remove();
	//drawing the tree for the weapons
	var treeData = {
		"name": "Weapons",
		"parent": "null",
		"value": 10,
		"type": "black",
		"level": "black",
		"children": [
		{
		"name": "Firearms",
        "parent": "Top Level",
        "value": 5,
        "type": "grey",
        "level": colorScale(5),
		},
		{
		"name": "Melee",
        "parent": "Top Level",
        "value": 9,
        "type": "grey",
        "level": colorScale(9),
		},
		{
		"name": "Explosives",
        "parent": "Top Level",
        "value": 6,
        "type": "grey",
        "level": colorScale(6),
		},
		{
		"name": "Chemicals",
        "parent": "Top Level",
        "value": 2,
        "type": "grey",
        "level": colorScale(2),
		},
		{
		"name": "Incendiary",
        "parent": "Top Level",
        "value": 8,
        "type": "grey",
        "level": colorScale(8),
		},
		{
		"name": "Vehicle",
        "parent": "Top Level",
        "value": 10,
        "type": "grey",
        "level": colorScale(10),
		},
		{
		"name": "Sabotage",
        "parent": "Top Level",
        "value": 11,
        "type": "grey",
        "level": colorScale(11),
		},
		{
		"name": "Unkown",
        "parent": "Top Level",
        "value": 13,
        "type": "grey",
        "level": colorScale(13),
		}
		]
	};	
			
	//appending group to svg 
	let treegroup = d3.select("#stats").append("g").attr("id","treegroup").attr("transform", "translate(10,10)");
	root = treeData[0];
	//update(root);
	
	// declare all the variables:
	var i = 0,
    duration = 750,
    root;
	
	// declares a tree layout and assigns the size
	var treemap = d3.tree().size([height, width1]);

// Assigns parent, children, height, depth
	root = d3.hierarchy(treeData, function(d) { return d.children; });
	root.x0 = height /2;
	root.y0 = 0;
	
//root.children.forEach(collapse);



update(root);
function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});
  
  var node = treegroup.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });
	  
	
	    var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    }).on('click', click);
	// Add circles
	  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
	  return d.data.level
      });
	  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { if(d.data.name=='Firearms'){return d.data.name+" :"+count_weapons[0] ; }
		if(d.data.name=='Melee'){return d.data.name+" :"+count_weapons[1] ; } 
		if(d.data.name=='Explosives'){return d.data.name+" :"+count_weapons[2] ; } 
		if(d.data.name=='Chemicals'){return d.data.name+" :"+count_weapons[3] ; }
		if(d.data.name=='Incendiary'){return d.data.name+" :"+count_weapons[4] ; } 
		if(d.data.name=='Sabotage'){return d.data.name+" :"+count_weapons[5] ; } 
		if(d.data.name=='Vehicle'){return d.data.name+" :"+count_weapons[6] ; } 
	    if(d.data.name=='Unkown'){return d.data.name+" :"+count_weapons[7] ; } 
		} );
	    var nodeUpdate = nodeEnter.merge(node);
		
	// Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d.data.level;
    })
    .attr('cursor', 'pointer');
	
	// Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);
	
	
	
	
	
	
	  // Update the links...
  var link = treegroup.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {
	  
  
    let path  = `M ${s.y} ${s.x} C ${(s.y + d.y) / 2} ${s.x},${(s.y + d.y) / 2} ${d.x},${d.y} ${d.x}` ;
     
    return path
  }

  // Toggle children on click.
  function click(d) {
	  
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
	  if(d.data.name=='Firearms'){plot_weapons_individual(d.data.value)}
	  if(d.data.name=='Melee'){plot_weapons_individual(d.data.value)}
	  if(d.data.name=='Explosives'){plot_weapons_individual(d.data.value)}
	  if(d.data.name=='Chemicals'){plot_weapons_individual(d.data.value)}
	  if(d.data.name=='Incendiary'){plot_weapons_individual(d.data.value)}
	  if(d.data.name=='Sabotage'){plot_weapons_individual(d.data.value)}
	  if(d.data.name=='Vehicle'){plot_weapons_individual(d.data.value)}
	  if(d.data.name=='Unkown'){plot_weapons_individual(d.data.value)}
	  if(d.data.name=='Weapons'){plot_weapons_individual(20)}
	  
	  
    
  }

}
	}
function plot_weapons_individual(catg)
{
	let circlescategory = plot_category.select(".plotpoints").selectAll("circle");
	circlescategory.remove();
	let dataPoints = [];
	let weapontype = [];
	let flag = 0;
	
	if (catg==20)
	{
		data1.forEach((d1,i)=> 
	{   
		
	if(d1.year == year){	
	 
	let aa =[d1.longitude, d1.latitude];
	dataPoints.push(aa);
	weapontype.push(d1.weaptype1)
	
	//console.log(aa,bb)
			
	
	}});
	
	plot_category.select(".plotpoints").selectAll("circle").data(dataPoints)
		.join("circle")
		.attr("cx", function (d) {
			return projection(d)[0]; 
		})
		.attr("cy", function (d) { return projection(d)[1]; })
		.attr("r", "2px")
		.attr("fill", function(d,i){return colorScale(weapontype[i])}).transition().duration(1000);
	
	}
	else{
		data1.forEach((d1,i)=> 
	{   
		
	if(d1.year == year && d1.weaptype1 == catg ){	
	let aa =[d1.longitude, d1.latitude];
	dataPoints.push(aa);
	
	//console.log(aa,bb)
			
	
	}});
	plot_category.select(".plotpoints").selectAll("circle").data(dataPoints)
		.join("circle")
		.attr("cx", function (d) {
			return projection(d)[0]; 
		})
		.attr("cy", function (d) { return projection(d)[1]; })
		.attr("r", "2px")
		.attr("fill", function(d,i){return colorScale(catg)}).transition().duration(1000);
	
	}
}
	
	if(category === 'category')
	{    //console.log("h1")
         d3.select("#stats").select("#treegroup").remove();
		this.plotting_attacks(year,data1);
		
	}

 if(category == 'Intensity'){
	d3.select("#stats").select("#treegroup").remove();
	var nkill=[];
	var dataPoints = [];
   var nwound=[];
   var count=0;
   let flag = 0
     if(year==1993){
			
       flag=1;
		}
   data1.forEach((d,i)=> 
   { if(d.year == year){  
        

   let aa =[d.longitude, d.latitude,d.nkill];
	nkill.push(d.nkill);
      
   dataPoints.push(aa);

	}})
	console.log(flag)
	if(flag==1){
   console.log("hi")
   this.canvas();
	}
	 var min = d3.min(nkill);
	 var max = d3.max(nkill);
	 var radiusScale = d3.scaleOrdinal().domain([min,max])
   .range([2,5]);
   let circlescategory = plot_category.select(".plotpoints").selectAll("circle");
	circlescategory.remove();
	
	
   var circles=plot_category.select(".plotpoints").selectAll("circle").data(dataPoints)
   .join("circle")
   .attr("cx", function (d) {
      return projection(d)[0]; 
   })
   .attr("cy", function (d) { return projection(d)[1]; })
   .attr("r", function (d) {
      return radiusScale (d[2]);
   })
   .attr("fill", "red")
  

	 
	 
 }
}

canvas()
{
   let newdiv1 = d3.select("#map-holder").append("div").attr("id","overlay1")
   let rectsvg =  newdiv1.append("svg").attr("width","960").attr("height","400").attr("fill","blue");
   var info="No Data Available for 1993. Hope it was a peaceful Year"
   var text = rectsvg.selectAll("text")
                           .data(info)
                           .enter()
                         .append("text");

   var textLabels = text
                  .attr("x",50)
                 .attr("y", 50)
                 .text( function (d) { return "No data Available, Hope it was a peacefull Year!! "; })
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "20px")
                .attr("fill", "#800000");



}
draw_pie()
{ 
	var attack_cat = ["Assassination","Hostage Taking (Kidnapping)","Bombing/Explosion","Facility/Infrastructure Attack","Armed Assault","Hijacking","Unknown","Unarmed Assault","Hostage Taking (Barricade Incident)"]
 var radius = 400/ 2;
	var colorScale2 = d3.scaleOrdinal().domain(attack_cat)
   .range(['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f','#e6194b','#46f0f0','#f58231']);
	var dataset = [
	{ name: 'Assassination', total: 8124, percent: 67.9 },
	{ name: 'Hostage Taking (Kidnapping)', total: 1567, percent: 13.1 },
	{ name: 'Bombing/Explosion', total: 1610, percent: 13.5 },
	{ name: 'Facility/Infrastructure Attack', total: 660, percent: 5.5 },
	{ name: 'Armed Assault', total: 660, percent: 5.5 },
	{ name: 'Hijacking', total: 660, percent: 5.5 },
	{ name: 'Unknown', total: 660, percent: 5.5 },
	{ name: 'Unarmed Assault', total: 660, percent: 5.5 },
	{ name: 'Hostage Taking (Barricade Incident)', total: 660, percent: 5.5 }
];
	var arc = d3.arc()
    .outerRadius(radius - 80)
    .innerRadius(radius - 100);
	
	var pie = d3.layout.pie()
    .sort(null)
	 .startAngle(1.1*Math.PI)
    .endAngle(3.1*Math.PI)
    .value(function(d) { return d.total; });
	console.log(pie)
	//remove a group 
	d3.select("#stats").select("#piegroup").remove();
	//create group
	let piegroup = d3.select("#stats").append("g").attr("id","piegroup").attr("transform", "translate(140,150)");
	
	 var g = piegroup.selectAll(".arc")
      .data(pie(dataset))
    .enter().append("g")
      .attr("class", "arc");
	 
	  g.append("path")
	.style("fill", function(d){console.log(d.data.name);return colorScale2(d.data.name)} )
    .transition().delay(function(d,i) {
	return i * 500; }).duration(500)
	.attrTween('d', function(d) {
		var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
		return function(t) {
			d.endAngle = i(t); 
			return arc(d)
			}
		}); 
	
}

}













































