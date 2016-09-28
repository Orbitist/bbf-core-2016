mapboxgl.accessToken = 'pk.eyJ1IjoiYnVmZmFsb2J1c2luZXNzZmlyc3QiLCJhIjoiY2l0bmRscXlrMDQyZTJ4bDR3czB4aGplZCJ9.hT3YUWzzRC-s0jGYQU1rXQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/buffalobusinessfirst/citndoi0c003m2iprlhyvg4ov',
    zoom: 12,
    center: [-122.447303, 37.753574]
});

map.on('load', function () {
    map.addSource('properties', {
        type: 'vector',
        url: 'data/core2016.geojson'
    });
    map.addLayer({
        'id': 'population',
        'type': 'circle',
        'source': 'properties',
        'source-layer': 'core2016',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                'base': 1.75,
                'stops': [[12, 2], [22, 180]]
            },
            // color circles by ethnicity, using data-driven styles
            'circle-color': {
                property: 'status',
                type: 'categorical',
                stops: [
                    ['Completed', '#CA6266'],
                    ['Under', '#009770'],
                    ['Z-Proposed', '#53578F'],
                    ['Completed', '#CA6266']]
            }
        }
    });
});
