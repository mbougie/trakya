// var map = L.map('map', {
// });

        // var map = L.map('map').setView([40.5,-88.7], 6);
         // 40.96543596172361 ,  27.260513305664062 
        // mapLink = 
        //     '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        // L.tileLayer('./{z}/{x}/{y}.png', {tms: true, opacity: 1.0, attribution: ""}).addTo(map);
// var crop_map = L.tileLayer('../tiles/{z}/{x}/{y}.png', {tms: true,
//          minZoom: 8,
//          maxZoom: 14
//          }),
var geojson;

var plantit;
var toggle;

var satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        // minZoom: 8,
        //          maxZoom: 14
    });
var crop_map= L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy;  Contributors',
                   minZoom: 8,
         maxZoom: 14
         });

// var grayscale = L.tileLayer(mapboxUrl, {id: 'MapID', attribution: mapboxAttribution}),

var map = L.map('map', {
    center: [40.5,-88.7],
    zoom: 6,
    minZoom: 6,
    maxZoom: 14,
    layers: [crop_map],
    // maxBounds:[[40.712, -74.227],[40.774, -74.125]]
    wheelPxPerZoomLevel: 150
});


var overlayMaps = {
    "crop map": crop_map
};


satellite.addTo(map);
toggle = L.control.layers(null,overlayMaps,{collapsed:false}).addTo(map);


function getColor_state(state) {
    if (['IA','IL','IN'].indexOf(state) >= 0) {
    return 'blue'
    }
    else {return 'grey'}
}

function getColor_county(perc) {
    return perc > 0.70 ? '#800026' :
           perc> 0.60  ? '#BD0026' :
           perc > 0.50  ? '#E31A1C' :
           perc > 0.40  ? '#FC4E2A' :
           perc > 0.30   ? '#FD8D3C' :
           perc > 0.20   ? '#FEB24C' :
           perc > 0.10   ? '#FED976' :
                      '#FFEDA0';
}


function style_state(feature) {
    return {
        fillColor: getColor_state(feature.properties.st_abbrev),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 1.0
    };
}

function style_county(feature) {
    return {
        fillColor: getColor_county(feature.properties.CORN_PERC),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 1.0
    };
}

map.on('zoomend', function() {
    console.log(map.getZoom())
  
    if (map.getZoom() <= 7){
        map.removeLayer(plantit);
        if (map.hasLayer(geojson)){
            console.log("geojson already added");
        } else {
            map.addLayer(geojson);
        }
    }

     else if (map.getZoom() > 7 && map.getZoom() < 11){
        map.removeLayer(geojson);
        console.log(toggle)
      
        if (toggle !== undefined){map.removeControl(toggle)}
        if (map.hasLayer(plantit)) {
            console.log("plantit already added");
        } else {
            // toggle = L.control.layers(null,overlayMaps,{collapsed:false}).addTo(map);
            plantit=L.geoJson(ia, {
            style: style_county,onEachFeature: onEachFeature_county
            }).addTo(map);
        }
    }


     else if (map.getZoom() >= 11){
      map.removeLayer(plantit);
      toggle = L.control.layers(null,overlayMaps,{collapsed:false}).addTo(map);
          }
})

// function getColor(perc) {
//     return perc > 0.70 ? '#800026' :
//            perc> 0.60  ? '#BD0026' :
//            perc > 0.50  ? '#E31A1C' :
//            perc > 0.40  ? '#FC4E2A' :
//            perc > 0.30   ? '#FD8D3C' :
//            perc > 0.20   ? '#FEB24C' :
//            perc > 0.10   ? '#FED976' :
//                       '#FFEDA0';
// }


// function style(feature) {
//     return {
//         fillColor: getColor(feature.properties.CORN_PERC),
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
// }
// L.geoJson(states).addTo(map);

    console.log(map.getZoom())


function highlightFeature_state(e) {
    var layer = e.target;
    
    if (['IA','IL','IN'].indexOf(e.target.feature.properties.st_abbrev) >= 0) {
    //do something

    
        layer.setStyle({
            weight: 5, // if (e.target.feature.properties.st_abbrev === 'IA'){
            color: '#666',
            dashArray: '',
            fillOpacity: 1.0
        });

        info.update(layer.feature.properties)

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
   
    }
}

function highlightFeature_county(e) {
    var layer = e.target;
    
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 1.0
    });

    info.update(layer.feature.properties)

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}



function resetHighlight_county(e) {
    plantit.resetStyle(e.target);
    info.update();
     
}

function resetHighlight_state(e) {
    geojson.resetStyle(e.target);
    info.update();
     
}


function zoomToFeature(e) {
        console.log(map.getZoom())
    // map.fitBounds(map.getBounds());
    console.log(e.target.getBounds().getCenter())
    console.log(e.target.feature.properties.st_abbrev)

    console.log(map.hasLayer(plantit))
    if (map.hasLayer(plantit)){
        map.removeLayer(plantit)
    }
    if (e.target.feature.properties.st_abbrev === 'IA'){
        
    }
    
}

function zoomToFeature_county(e) {
     toggle = L.control.layers(null,overlayMaps,{collapsed:false}).addTo(map);
    ////  function to remove/add layer control----it works!!!!
    //map.removeControl(toggle);
    console.log(map.getZoom())
    map.fitBounds(e.target.getBounds());
    map.removeLayer(plantit)
    map.removeLayer(geojson)
    // map.setView([42,-93.5], 11)
    if(map.getZoom() > 10){
        map.removeLayer(plantit)
        map.removeLayer(geojson)
    }
        
    
    // map.fitBounds(e.target.getBounds())
    // // map.options.maxZoom(22)
    //  map.removeLayer(plantit)
}


function onEachFeature_state(feature, layer) {
    layer.on({
        mouseover: highlightFeature_state,
        mouseout: resetHighlight_state
        // click: zoomToFeature
    });
}

function onEachFeature_county(feature, layer) {
    layer.on({
        mouseover: highlightFeature_county,
        mouseout: resetHighlight_county
        // click: zoomToFeature_county
    });
}

geojson = L.geoJson(states, {
    style: style_state,
    onEachFeature: onEachFeature_state
}).addTo(map);




var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Percentage Corn</h4>' +  (props ?
        '<b>County: ' + props.ATLAS_NAME + '</b><br />' + props.CORN_PERC + '%</sup>'
        : 'Hover over a state');
};

info.addTo(map);






