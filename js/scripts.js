
var bounds = [
    [27.30,41.05], // Southwest coordinates
    [27.60,41.15]  // Northeast coordinates
];
var centerit = [27.40,41.10]


mapboxgl.accessToken = 'pk.eyJ1IjoiYmlhbmNoaTE5NzYiLCJhIjoiY2lnb2ltenA5MDA0ZHY2a294aDMwYzNtNiJ9.XqFNNz5LG3qRyXvYu7CTaA';;
var beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: centerit,
    zoom: 12,
    maxBounds: bounds // Sets bounds as max
});


var afterMap = new mapboxgl.Map({
    container: 'after', // container id
    style: {
        "version": 8,
        "sources": {
            "raster-tiles": {
                "type": "raster",
                "url": "mapbox://" + 'bianchi1976.1m9wz1s5',
                "tileSize": 256
            }
        },
        "layers": [{
            "id": "simple-tiles",
            "type": "raster",
            "source": "raster-tiles",
            // "minzoom": 0,
            // "maxzoom": 22
        }]
    },
    center: centerit, // starting position
    zoom: 12, // starting zoom
    maxBounds: bounds // Sets bounds as max
});



var map = new mapboxgl.Compare(beforeMap, afterMap, {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true
});

// add scale
beforeMap.addControl(new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial',
    position: 'bottom-left'
}));

