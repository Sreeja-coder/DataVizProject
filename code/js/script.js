d3.csv("data/weapons_csv.csv").then(csvData => {

     	
		
		let globalmap = new Map(csvData);
		 d3.json('data/world_countries.json').then(mapData => {

        // ******* TODO: PART I *******
        // You need to pass the world topo data to the drawMap() function as a parameter
        (globalmap.createmap(mapData));
		
});

});
//let csvData = d3.csv("data/globalterrorismdb.csv").then(function(data){});
	//console.log(csvData)
function categorychange(category)
 { let globalmap = new Map();
 let flag3 = 1
 console.log("script call")
    d3.csv("data/weapons_csv.csv").then(csvData => {
     
		//console.log("script flag",flag3)
	globalmap.categorychange(category,csvData);
	
});
 }
