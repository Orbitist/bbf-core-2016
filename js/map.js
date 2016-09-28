
// Get points geojson data //
var propertyData = (function () {
    var propertyData = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'data/core2016.geojson',
        'dataType': "json",
        'success': function (data) {
            propertyData = data;
        }
    });
    return propertyData;
})();

mapboxgl.accessToken = 'pk.eyJ1IjoiYnVmZmFsb2J1c2luZXNzZmlyc3QiLCJhIjoiY2l0bmRscXlrMDQyZTJ4bDR3czB4aGplZCJ9.hT3YUWzzRC-s0jGYQU1rXQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/buffalobusinessfirst/citndoi0c003m2iprlhyvg4ov',
  zoom: 12,
  center: [-78.87, 42.88]
});

map.on('load', function () {
  map.addSource("properties", {
    'type': 'geojson',
    'data': propertyData
  });

  map.addLayer({
    'id': 'properties',
    'type': 'circle',
    'source': 'properties',
    'paint': {
      'circle-radius': {
        'base': 1.75,
        'stops': [[12, 5], [22, 180]]
      },
      'circle-color': {
        property: 'Status',
        type: 'categorical',
        stops: [
          ['Completed', '#ca6266'],
          ['Under', '#009770'],
          ['Z-Proposed', '#53578f']
        ]
      }
    }
  });
});
