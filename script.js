var map = L.map('map', {
});


map.setView([41,-92], 4);


function getColor(perc) {
    return perc > 0.70 ? '#800026' :
           perc> 0.60  ? '#BD0026' :
           perc > 0.50  ? '#E31A1C' :
           perc > 0.40  ? '#FC4E2A' :
           perc > 0.30   ? '#FD8D3C' :
           perc > 0.20   ? '#FEB24C' :
           perc > 0.10   ? '#FED976' :
                      '#FFEDA0';
}


function style(feature) {
    return {
        fillColor: getColor(feature.properties.CORN_PERC),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
L.geoJson(states).addTo(map);




function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    info.update(layer.feature.properties)

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}


function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
     
}

var geojson;

var plantit;
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    console.log(e.target.getBounds().getCenter())
    console.log(e.target.feature.properties.st_abbrev)

    console.log(map.hasLayer(plantit))
    if (map.hasLayer(plantit)){
        map.removeLayer(plantit)
    }
    if (e.target.feature.properties.st_abbrev === 'IA'){
        plantit=L.geoJson(plants, {style: style,onEachFeature: onEachFeature_county}).addTo(map);
    }
    
}

function zoomToFeature_county(e) {
    console.log(map.getZoom())
    // map.fitBounds(e.target.getBounds())
    // map.options.maxZoom(22)
}


function onEachFeature_state(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function onEachFeature_county(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature_county
    });
}

geojson = L.geoJson(states, {
    style: style,
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