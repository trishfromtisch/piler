
var mainMap = new google.maps.Map(document.querySelector("div.map"), {})

var neighborhood = "TriBeCa, NY"
function formatAddressForRequest(address) {
	return address.split(" ").join("+")
}
var geocodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?address="

console.log("OK")
function initializeMainMap() {
	$.get(geocodeAPI + formatAddressForRequest(neighborhood), getAndAssignMainMapBoundaries)
}

function getAndAssignMainMapBoundaries(feed) {
	var latLng = (feed.results[0].geometry.location)
	var mapOptions = {
		center: {
			lat: latLng.lat,
			lng: latLng.lng
		},
		zoom: 16
	}
	mainMap.setOptions(mapOptions)
}
