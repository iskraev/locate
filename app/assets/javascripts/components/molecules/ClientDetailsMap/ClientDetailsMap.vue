<template>
  <div id="client_details" @click.stop="">
    <div v-if="selectedClient" class="top">
      <h1>
        {{ selectedClient.full_name }}
      </h1>
      <div
        v-if="!addMarkersButtonsVisible && !editMarkersButtonsVisible"
        class="buttons"
      >
        <Button @click="showEditMarkersButtons()" :disabled="disableButtons">
          Edit
        </Button>
        <Button @click="showAddMarkersButtons()" :disabled="disableButtons">
          Add
        </Button>
      </div>

      <div v-if="editMarkersButtonsVisible" class="buttons">
        <Button
          @click="finishAddOrEditOrDelete('edit')"
          :variant="'cancel'"
          :disabled="disableButtons"
        >
          Cancel
        </Button>
        <Button
          :variant="'cancel'"
          :disabled="disableButtons"
          @click="toggleConfirmationModal(true)"
        >
          Delete
        </Button>
        <Button
          :variant="'save'"
          :disabled="disableButtons"
          @click="updateClientPinsMethod()"
        >
          Save
        </Button>
      </div>

      <div v-if="addMarkersButtonsVisible" class="buttons">
        <Button
          @click="finishAddOrEditOrDelete('add')"
          :variant="'cancel'"
          :disabled="disableButtons"
        >
          Cancel
        </Button>
        <Button
          :variant="'save'"
          @click="createPin()"
          :disabled="disableButtons"
        >
          {{ disableButtons ? "Saving..." : "Save" }}
        </Button>
      </div>
    </div>
    <div id="map_container">
      <input
        id="pac-input"
        class="controls"
        type="text"
        placeholder="Search a Place"
      />
      <div id="map-canvas"></div>
    </div>
    <Modal
      :showModal="confirmationModalVisible"
      @close-modal="toggleConfirmationModal(false)"
      :type="'unmounted'"
    >
      <DeleteConfirmation
        :text="'Pin'"
        :cancelAction="() => toggleConfirmationModal(false)"
        :deleteAction="() => deleteSelectedPin()"
        :disableButtons="disableButtons"
      />
    </Modal>
  </div>
</template> 

<script>
import { mapState, mapActions } from "vuex";
import Button from "@components/atoms/Button/Button";
import Modal from "@components/atoms/Modal/Modal";
import Heading from "@components/atoms/Heading/Heading";
import DeleteConfirmation from "@components/molecules/DeleteConfirmation/DeleteConfirmation";

import {
  startEdit,
  finishEdit,
  selectedMarker,
  updatedMarkers,
  removeAllEditEventListeners,
  resetSelectedMarker,
} from "@utils/maps-utils/markers/edit-markers";

import {
  showMarkers,
  removeMarkers,
  createGoogleMarkers,
  getMarkerFromGoogleMarker,
} from "@utils/maps-utils/markers/helpers";

import {
  activateMarkerDrop,
  deactivateMarkerDrop,
  removeMarkerAndMapEventListeners,
  markerData,
  marker,
} from "@utils/maps-utils/markers/add-marker";

export default {
  props: {
    selectedClient: Object,
    clientDetailsModalVisible: Boolean,
  },
  components: {
    Button,
    Modal,
    Heading,
    DeleteConfirmation,
  },
  data() {
    return {
      googleMarkers: [],
      disableButtons: false,
      addMarkersButtonsVisible: false,
      editMarkersButtonsVisible: false,
      confirmationModalVisible: false,
    };
  },
  watch: {
    selectedClient: async function () {
      // reset everything
      this.closeAllButtons();
      finishEdit(this.googleMarkers);
      deactivateMarkerDrop();

      if (this.selectedClient) {
        // get client id from selected client
        const clientId = this.selectedClient.id;

        // if client's markers are not in state, fetch them
        if (!(clientId in this.pins.all))
          await this.fetchClientPins(this.selectedClient.id);

        //  render new markers if there is selected client after asyncronuos result
        if (this.selectedClient) this.setGoogleMarkersAndShow();
      } else {
        removeMarkers(this.googleMarkers);
        this.googleMarkers = [];
      }
    },
  },
  computed: {
    ...mapState(["pins"]),
  },
  methods: {
    ...mapActions([
      "fetchClientPins",
      "createClientPin",
      "updateClientPins",
      "deletePin",
    ]),
    setGoogleMarkersAndShow() {
      if(!this.selectedClient) return;

      const clientId = this.selectedClient.id;
      
      const clientsMarkers = this.pins.all[clientId];

      // run this function if there are clients markers
      if (clientsMarkers) {
        // clear the map before new rerender
        removeMarkers(this.googleMarkers);

        // create new google markers with pin array from db
        this.googleMarkers = createGoogleMarkers(
          this.pins.all[this.selectedClient.id]
        );

        //set all new markers on the map
        showMarkers(this.googleMarkers);
      }
    },
    showAddMarkersButtons() {
      activateMarkerDrop();
      this.addMarkersButtonsVisible = true;
      this.editMarkersButtonsVisible = false;
    },
    showEditMarkersButtons() {
      startEdit(this.googleMarkers);
      this.addMarkersButtonsVisible = false;
      this.editMarkersButtonsVisible = true;
    },
    closeAllButtons() {
      this.addMarkersButtonsVisible = false;
      this.editMarkersButtonsVisible = false;
    },
    toggleConfirmationModal(visible) {
      if (visible && !selectedMarker) return;
      this.confirmationModalVisible = visible;
    },
    async createPin() {
      // if no marker chosen, just reset
      // buttons when saving empty pin and exit
      if (!marker) {
        removeMarkerAndMapEventListeners();
        this.closeAllButtons();
        return;
      }
      const { latitude, longitude } = markerData;

      const pin = {
        latitude,
        longitude,
        client_id: this.selectedClient.id,
      };
      // deafctive buttons and marker drop but keep the marker on map
      this.disableButtons = true;

      removeMarkerAndMapEventListeners();

      // create pin
      await this.createClientPin(pin);

      // clean up everything
      this.finishAddOrEditOrDelete("add");
    },
    async deleteSelectedPin() {
      // if no marker selected, do nothing
      if (!selectedMarker) return;

      // remove listeners and disable buttons
      removeAllEditEventListeners(this.googleMarkers);
      this.disableButtons = true;

      const pinId = selectedMarker.googleMarker.id;
      const clientId = selectedMarker.googleMarker.client_id;
      
      // delete
      await this.deletePin({ pinId, clientId });

      // reset old selected marker
      resetSelectedMarker();

      // finish and rerender
      this.finishAddOrEditOrDelete("delete");

      // allow editing again
      startEdit(this.googleMarkers);

      // close modal and allow buttons
      this.toggleConfirmationModal(false);
      this.disableButtons = false;
    },
    async updateClientPinsMethod() {
      // create a copy because when we remove all listeners, we also clean updatedmarkers
      let updatedMarkersArray = Object.values(updatedMarkers);
      // just exit if there are no markers to update
      if (!updatedMarkersArray.length) {
        finishEdit(this.googleMarkers);
        this.closeAllButtons();
        return;
      }
      removeAllEditEventListeners(this.googleMarkers);
      updatedMarkersArray = updatedMarkersArray.map((updatedMarker) =>
        getMarkerFromGoogleMarker(updatedMarker)
      );
      // disable all buttons and all event listeners
      this.disableButtons = true;

      // update updated markers
      await this.updateClientPins(updatedMarkersArray);

      // clean up everything
      this.finishAddOrEditOrDelete("edit");
    },
    finishAddOrEditOrDelete(mode) {
      // remove event listeners for edit mode
      if (mode === "edit") finishEdit(this.googleMarkers);
      if (mode === "add") deactivateMarkerDrop();

      // rerender all new markers and enable button
      this.setGoogleMarkersAndShow();

      if (mode !== "delete") {
        this.closeAllButtons();
      }
      this.disableButtons = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./ClientDetailsMap.scss";
</style>