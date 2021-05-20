import image from '../../../../images/map-icon.png';
import { createLatLng, getLatLngFromEvent, markerDragEndListener } from './helpers';
let mapEventListener = null;
export let selectedMarker = null;
export let updatedMarkers = {};

export const startEdit = (googleMarkers) => {
  // add click event listener to each marker
  googleMarkers.forEach((googleMarker, index) => googleMarker.addListener('click', () => editMarkerListener({
    googleMarker,
    index
  })))

  // add map event listener to track new positions
  mapEventListener = map.addListener('click', editMapListener);
}

export const finishEdit = (googleMarkers) => {
  resetSelectedMarker();
  removeAllEditEventListeners(googleMarkers);
}

const setSelectedMarker = (googleMarker, index) => {
  selectedMarker = {
    googleMarker,
    index
  }
}

const editMarkerListener = ({
  googleMarker,
  index
}) => {
  // if there is a selected marker, 
  // when clicking on another, 
  // reset previous marker
  if (selectedMarker) {
    selectedMarker.googleMarker.setIcon(null);
    selectedMarker.googleMarker.setDraggable(false);
    google.maps.event.clearListeners(selectedMarker.googleMarker, 'dragend')
  }

  // change to edit mode marker icon on click
  googleMarker.setIcon(image);
  googleMarker.setDraggable(true);
  googleMarker.addListener('dragend', (event) => markerDragEndListener(event, ({
    newLatitude,
    newLongitude
  }) => {
    const position = createLatLng(newLatitude, newLongitude);
    googleMarker.setPosition(position);
    updatedMarkers[index] = googleMarker;
    setSelectedMarker(googleMarker, index);
  }))

  // set selected marker with clicked one
  setSelectedMarker(googleMarker, index)
  updatedMarkers[index] = googleMarker;
}

const editMapListener = (event) => {
  // if there is a selected marker, get new position
  if (selectedMarker) {
    const {
      latitude,
      longitude
    } = getLatLngFromEvent(event);
    const position = createLatLng(latitude, longitude);

    // extract selected marker with its index
    const {
      googleMarker,
      index
    } = selectedMarker;

    // set new position to existing marker
    googleMarker.setPosition(position);

    // add marker to ones that were updated
    updatedMarkers[index] = googleMarker;
  }
}

export const removeAllEditEventListeners = (googleMarkers = []) => {
  // remove all listeners
  googleMarkers.forEach((googleMarker) => {
    google.maps.event.clearInstanceListeners(googleMarker);
  })

  // remove map event listener
  if(mapEventListener) google.maps.event.clearListeners(map, 'click');
  mapEventListener = null;
  
  if(selectedMarker) {
    google.maps.event.clearListeners(selectedMarker.googleMarker, 'dragend');
    selectedMarker.googleMarker.setDraggable(false);
  };
}

export const resetSelectedMarker = () => {
  if (selectedMarker) {
    selectedMarker.googleMarker.setMap(null);
    selectedMarker.googleMarker.setDraggable(false);
    selectedMarker.googleMarker.setIcon(null);
  }
  selectedMarker = null;
  updatedMarkers = {};
}