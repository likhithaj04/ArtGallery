
        //    let mapToken=mapToken; 
        //    console.log(mapToken) 
	    mapboxgl.accessToken = mapToken;

        const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // default to standard-satellite style on mount
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 11 // starting zoom
    });

    const marker=new mapboxgl.Marker({color:"red"})
    .setLngLat(coordinates)
    .addTo(map); 