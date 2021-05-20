/** 
/* ADD MARKER FUNCTIONS
*/
import image from '../../../../images/map-icon.png';

import {
  getLatLngFromEvent,
  createLatLng,
  createMarker,
  markerDragEndListener
} from './helpers';

let mapEventListener = null;

export let markerData = null;
export let marker = null;

export const removeMarkerAndMapEventListeners = () => {
  if (marker) {
    google.maps.event.clearInstanceListeners(marker);
    marker.setDraggable(false);
  };

  if (mapEventListener) google.maps.event.removeListener(mapEventListener);
  mapEventListener = null;
}

const clearMarker = () => {
  if (marker) marker.setMap(null);
  marker = null;
  markerData = null;
}

// add map event listener for marker drop
export const activateMarkerDrop = () => {
  mapEventListener = map.addListener('click', markerDropListener);
}

export const deactivateMarkerDrop = () => {
  removeMarkerAndMapEventListeners();
  clearMarker();
}

const markerDropListener = (event) => {
  // get new position when click on map
  const {
    latitude,
    longitude
  } = getLatLngFromEvent(event)
  const position = createLatLng(latitude, longitude);

  if (marker) {
    // set new position and render
    marker.setMap(null);
    marker.setPosition(position);
    marker.setMap(map);
  } else {
    // create new marker and render
    marker = createMarker({
      position,
      icon: image,
      animation: true,
      draggable: true
    });
    marker.setMap(map);

    // add event listener for draggable marker (dragend)
    marker.addListener('dragend', (event) => markerDragEndListener(event, ({
      newLatitude,
      newLongitude
    }) => {
      // set new marker data after drag end
      markerData = {
        latitude: newLatitude,
        longitude: newLongitude,
      }
    }));
  }

  // set marker data
  markerData = {
    latitude,
    longitude,
  }
}