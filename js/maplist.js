function renderMapList() {

  // Create reset button
  var mapResetBotton = '<hr><div class="map-list-item" id="map-reset-bottom"><p><i class="fa fa-refresh" aria-hidden="true"></i> Reset Map</p></div><script>document.getElementById("map-reset-bottom").addEventListener("click", function () {map.fitBounds(bounds);});</script>';
  $('div.map-list').append(mapResetBotton);

  // Create the map list items
  for (var i = 0; i < orbitistPointsGeojsonCleaned.features.length; i++) {
    var feature = orbitistPointsGeojsonCleaned.features[i];
    if (numberedPoints == "true"){
      var  listItem  = '<hr><div class="map-list-item" id="' + feature.properties.point_id + '"><img src="' + feature.properties.point_thumbnail + '" /><p>' + feature.properties.point_position_number + " - " + feature.properties.point_title + '</p></div><script>document.getElementById("' + feature.properties.point_id + '").addEventListener("click", function () {map.flyTo({center:[' + feature.geometry.coordinates + '],zoom: 18,bearing: 90 * (.5 - Math.random()),pitch: 60});});</script>';
    } else {
      var  listItem  = '<hr><div class="map-list-item" id="' + feature.properties.point_id + '"><img src="' + feature.properties.point_thumbnail + '" /><p>' + feature.properties.point_title + '</p></div><script>document.getElementById("' + feature.properties.point_id + '").addEventListener("click", function () {map.flyTo({center:[' + feature.geometry.coordinates + '],zoom: 18,bearing: 90 * (.5 - Math.random()),pitch: 60});});</script>';
    }
    $('div.map-list').append(listItem);
  }

};
