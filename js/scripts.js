 var minZoom =  0.0 ;
    var maxZoom =  16.0 ;
    var tilePrefix = 'https:\/\/storage.googleapis.com\/trakya\/trakya_example\/';
    var tileSuffix = '';
    var latLngBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng( 40.96543596172361 ,  27.260513305664062 ),
        new google.maps.LatLng( 41.18181216895267 ,  27.645034790039066 ));

    function initialize() {
      var mapOptions = {
          minZoom: minZoom,
          maxZoom: maxZoom,
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      map.fitBounds(latLngBounds);
      var overlayMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          if (zoom < minZoom || zoom > maxZoom) {
            return null;
          }
          var numTiles = 1 << zoom;
          var x = ((coord.x % numTiles) + numTiles) % numTiles;
          return [tilePrefix, zoom, '/', x, '/', coord.y, tileSuffix].join('');
        },
        tileSize: new google.maps.Size(256, 256),
      });
      map.overlayMapTypes.push(overlayMapType);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
