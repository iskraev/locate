function initMap() {
    // These are basic map options.
    var mapOptions = {
        zoom: 5,
        center: new google.maps.LatLng(39.50, -98.35),  // Default: center of US
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        zoomControl: true,
        zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        panControl: false,
        panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        styles: [{"featureType":"water","elementType":"geometry.fill","stylers":[{"lightness":50}]},
            {"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},
            {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},
            {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},
            {"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},
            {"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},
            {"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},
            {"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},
            {"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},
            {"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},
            {"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},
            {"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},
            {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},
            {"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"on"}]},
            {"featureType":"poi","elementType":"labels","stylers":[{"visibility":"on"}]},
            {"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},
            {"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"on"}]},
            {"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    var input = document.getElementById('pac-input');

    var options = {
        componentRestrictions: {country: 'us'}
    };
    autocomplete = new google.maps.places.Autocomplete(input,options);
    geocoder = new google.maps.Geocoder();

    google.maps.event.addListener(autocomplete, 'place_changed', function (){
        place = autocomplete.getPlace();
        var address = place.name; // this is the search input

        if (place.geometry) { // autocomplete found the place
            displaySearchedPlace(place);
        }else { // try to get the place using the geocoding API
            if (geocoder) {
                geocoder.geocode({'address': address}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        place = results[0];
                        displaySearchedPlace(place);
                    } 
                });
            }
        }
    });

}

function displaySearchedPlace(place) {
    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(15);
    }
}