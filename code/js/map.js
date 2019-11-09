class Map {
	
	
	constructor(data) {
		
		
		
		
		
	}
	
createmap(world)
{	
var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	   var center = [width / 2, height / 2];



let w = 3000;
let h = 1250;
// DEFINE FUNCTIONS/OBJECTS
// Define map projection
// geoMercator projection
    var projection = d3.geoMercator() //d3.geoOrthographic()
        .scale(130)
        .translate([width / 2, height / 1.5]);

// geoPath projection
    var path = d3.geoPath().projection(projection);

	
	// create an SVG
	const svg = d3
  .select("#map-holder")
  .append("svg")
  // set to the same size as the "map-holder" div
  .attr("id","mapsvg")
  .style("cursor", "move");
  
  svg.attr("viewBox", "50 10 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMin");
  //create group
  let countriesGroup = d3.select("#mapsvg").append("g").attr("id", "map");
 
	//converting geojason into topojason
	var features = topojson.feature(world, world.objects.countries).features;
	//console.log(features)
	countriesGroup.append("g")
        .selectAll("path")
        .data(features)
        .enter().append("path")
        .attr("d", path)
		.attr("class", "country")

 	var zoom = d3.behavior.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

svg.call(zoom)
    .call(zoom.event);

function zoomed() {
  countriesGroup.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")");
}
d3.select(self.frameElement).style("height", height + "px");
// Simplest possible buttons

    svg.append("rect")
	.attr("x",60)
	.attr("y",10)
	.attr("width",40)
	.attr("height",25)
	.attr("id","zoom_in")
	.style("fill","#668cff");
	
    
	svg.append("rect")
	.attr("x",120)
	.attr("y",10)
	.attr("width",40)
	.attr("height",25)
	.attr("id","zoom_out")
	.style("fill","#ff668c");

    
d3.selectAll('rect').on('click', function(){
	console.log("clicked");
    d3.event.preventDefault();

    var scale = zoom.scale(),
        extent = zoom.scaleExtent(),
        translate = zoom.translate(),
		x = translate[0], y = translate[1],
        factor = (this.id === 'zoom_in') ? 1.2 : 1/1.2,
        target_scale = scale * factor;
		console.log(translate);

    // If we're already at an extent, done
    if (target_scale === extent[0] || target_scale === extent[1]) { return false; }
    // If the factor is too much, scale it down to reach the extent exactly
    var clamped_target_scale = Math.max(extent[0], Math.min(extent[1], target_scale));
    if (clamped_target_scale != target_scale){
        target_scale = clamped_target_scale;
        factor = target_scale / scale;
    }

    // Center each vector, stretch, then put back
    x = (x - center[0]) * factor + center[0];
    y = (y - center[1]) * factor + center[1];

    // Transition to the new view over 350ms
    d3.transition().duration(350).tween("zoom", function () {
        var interpolate_scale = d3.interpolate(scale, target_scale),
            interpolate_trans = d3.interpolate(translate, [x,y]);
        return function (t) {
            zoom.scale(interpolate_scale(t))
                .translate(interpolate_trans(t));
            zoomed();
        };
    });	
	});
	


	
 //var zoom = d3.zoom()
 //   .on("zoom", function () {
   //     var transform = d3.zoomTransform(this);
   //     countriesGroup.attr("transform", transform);
   // });

//svg.call(zoom);
 
}

yearslider(){
	
	
	
}

}






















































