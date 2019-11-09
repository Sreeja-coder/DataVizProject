d3.csv("data/globalterrorismdb.csv").then(csvData => {

        //Create a unique "id" field for each game
        csvData.forEach( (d, i) => {
            //console.log(d.country)
        });
		
		let globalmap = new Map(csvData);
		 d3.json('data/world.json').then(mapData => {

        // ******* TODO: PART I *******
        // You need to pass the world topo data to the drawMap() function as a parameter
        (globalmap.createmap(mapData));

    });
		
});
