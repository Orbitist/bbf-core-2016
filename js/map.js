
// Get points geojson data //
var propertyData = (function () {
    var propertyData = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': pointsInfoApi,
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
    center: [-79, 42]
});
