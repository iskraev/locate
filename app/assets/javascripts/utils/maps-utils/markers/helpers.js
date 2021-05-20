// *****************************************
// HELPER FUNCTIONS FOR GOOGLE MAPS MARKERS
// *****************************************
export const createLatLng = (latitude, longitude) => new google.maps.LatLng(latitude, longitude);

export const createMarker = ({
  position,
  icon = null,
  draggable = false,
  animation = false
}) => new google.maps.Marker({
  position,
  icon,
  animation: animation ? google.maps.Animation.DROP : null,
  draggable
})

export const getLatLngFromEvent = (event) => ({
  latitude: event.latLng.lat(),
  longitude: event.latLng.lng(),
})

export const getMarkerFromGoogleMarker = (googleMarker) => {
  const {
    id,
    position,
    client_id
  } = googleMarker;
  const pin = {
    id,
    latitude: position.lat(),
    longitude: position.lng(),
    client_id,
  }

  return pin;
}

export const createGoogleMarkers = (pins) => {
  const googleMarkers = [];

  pins.forEach(pin => {
    const {
      latitude,
      longitude
    } = pin;
    const position = createLatLng(latitude, longitude);
    const googleMarker = createMarker({
      position,
      animation: true
    });
    googleMarker.id = pin.id;
    googleMarker.client_id = pin.client_id;
    googleMarkers.push(googleMarker);
  });

  return googleMarkers;
};

export const showMarkers = (googleMarkers) => {
  setMarkers(map, googleMarkers)
}

export const removeMarkers = (googleMarkers) => {
  setMarkers(null, googleMarkers)
}

const setMarkers = (map, googleMarkers) => {
  googleMarkers.forEach((googleMarker) => {
    googleMarker.setMap(map);
  })
}

export const markerDragEndListener = (event, callback) => {
  // get new position for marker after drag end
  const {
    latitude,
    longitude
  } = getLatLngFromEvent(event)

  // used this callback to set new data for whatever marker has "dragend"
  callback({
    newLatitude: latitude,
    newLongitude: longitude
  });
}