function createMap(bikeStations) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Bike Stations": bikeStations
    };
  
    // Create the map object with options
    
    var map = L.map("map-id", {
      center: [40.73, -74.0059],    
      zoom: 12,
      layers: [lightmap, bikeStations]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }

function createMarkers(response) {
    console.log(response)
    // Pull the "stations" property off of response.data
    // var stations = response.data.stations;

    // Initialize an array to hold bike markers
    var markers = [];

    // response['features'][0]['geometry']['coordinates']
    response['features'].forEach(element => {
        var coordinates = [element['geometry']['coordinates'][0], element['geometry']['coordinates'][1]]
        var newmarker = L.marker(coordinates)
        .bindPopup("<h3>" + element['properties']['type'] + 
        "<h3><h3>Mag: " + element['properties']['mag'] + "<h3>");
        markers.push(newmarker)
    });
    console.log(markers)

    // // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(markers));
}

url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
$.getJSON(url, createMarkers);
