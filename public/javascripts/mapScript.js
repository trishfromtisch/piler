$("div.container-fluid").append("<div class=map>")

var mainMap = new google.maps.Map(document.querySelector("div.map"), {})

var scratchNeighborhood = "Greenpoint, Brooklyn"
function formatAddressForRequest(address) {
	return address.split(" ").join("+")
}
var geocodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?address="

function initializeMainMap() {
	$.get(geocodeAPI + formatAddressForRequest(scratchNeighborhood), getAndAssignMainMapBoundaries)
}

function getAndAssignMainMapBoundaries(feed) {
	var latLng = (feed.results[0].geometry.location)
	var mapOptions = {
		center: {
			lat: latLng.lat,
			lng: latLng.lng
		},
		zoom: 14
	}
	mainMap.setOptions(mapOptions)
}

function createMarker(coords, time) {

	var options = {
		position: coords,
		title: time,
		map: mainMap
	}
	var marker = new google.maps.Marker(options)
}

function createMarkers(array, map) {
	_.each(array, function(object){
		var address = formatAddressForRequest(object.location)
		$.get(geocodeAPI + address, function() {
			var coordinates = arguments[0]results[0].geometry.location
			var latLng = new google.maps.LatLng(coordinates.lat, coordinates.lng)
			createMarker(latLng, object.created_at)
		})
	}
}


initializeMainMap()