function removeSpinner () {
  // Hide spinner and remove it
  document.getElementById("spinner").style.opacity = "0";
  setTimeout(function () {
    document.getElementById("spinner").style.display = "none";
  }, 2000);
}

// Get Medical Campus Data
var medicalCampus = (function () {
    var propertyData = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'https://app.orbitist.com/api/v1/points/2780.json',
        'dataType': "json",
        'success': function (data) {
            propertyData = data;
        }
    });
    return propertyData;
})();

// Get points geojson data //
var propertyData = (function () {
    var propertyData = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'data/properties.geojson',
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

// PROPERTY DATA
map.on('load', function () {

  map.addSource("properties", {
    'type': 'geojson',
    'data': propertyData
  });
  map.addLayer({
    'id': 'properties',
    'type': 'circle',
    'source': 'properties',
    'source-layer': 'property',
    'paint': {
      'circle-radius': {
        'base': 1.75,
        'stops': [[5, 3], [12, 8], [22, 180]]
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
// END PROPERTY DATA

// MEDICAL CAMPUS
  map.addSource("medicalCampus", {
    type: "geojson",
    data: medicalCampus
  });
  map.addLayer({
    "id": "medicalCampus",
    "type": "symbol",
    "source": "medicalCampus",
    'source-layer': 'medical',
    "layout": {
      "icon-image": "circle-15",
      "icon-size": 2,
      "icon-allow-overlap": true,
      "icon-offset": [0, -5],
      "icon-ignore-placement": true,
      "text-field": "{point_title}",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-size": {
        "stops": [
          [12, 0],
          [15, 12]
        ]
      },
      "text-offset": [0, 0.5],
      "text-anchor": "top",
      "text-allow-overlap": true
    },
    "paint": {
      "icon-opacity": 0,
      "text-halo-width": 1,
      "text-halo-color": "white"
    }
  });
  for (var i = 0; i < medicalCampus.features.length; i++) {
      var feature = medicalCampus.features[i];
      var marker = document.createElement('img');
      marker.src = feature.properties.point_marker_url;
      marker.style.width = "30px";
      marker.style.height = "30px";
      new mapboxgl.Marker(marker)
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);
  }
// END MEDICAL CAMPUS

});

map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['properties'] });
  if (!features.length) {
      return;
  }
  var feature = features[0];
  var popup = new mapboxgl.Popup()
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<p><strong>Project:</strong> ' + feature.properties.Project + '</br><strong>Developer\/General Contractor:</strong> ' + feature.properties.Developer_General_Contractor + '</br><strong>Cost:</strong> $' + feature.properties.Cost + ' Million</br><strong>Status:</strong> ' + feature.properties.Status + '</br><strong>Description:</strong> ' + feature.properties.Description + '</p>')
    .addTo(map);
  if (features.length) {
    // Get coordinates from the symbol and center the map on those coordinates
    map.flyTo({center: features[0].geometry.coordinates});
  }
});

map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['properties', 'medicalCampus'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

removeSpinner();
