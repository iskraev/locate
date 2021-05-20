<template>
  <div id="client_tracker">
    <Heading :className="'header'" :level="'2'">
      Locate.ai Take-Home Challenge
    </Heading>
    <ClientTable
      :clients="Object.values(this.clients.all)"
      :editClient="editClient"
      @show-client-details="showClientDetails"
      @edit-client-details="editClientDetails"
    />

    <Modal
      :showModal="clientDetailsModalVisible"
      @close-modal="hideClientDetails()"
    >
      <ClientDetailsMap
        :selectedClient="selectedClient"
        :clientDetailsModalVisible="clientDetailsModalVisible"
      />
    </Modal>

    <Modal
      :showModal="addClientModalVisible || editClientModalVisible"
      @close-modal="
        (addClientModalVisible && toggleAddClientModal(false)) ||
          (editClientModalVisible && toggleEditClientModal(false))
      "
      :type="'unmounted'"
    >
      <ClientForm
        v-if="addClientModalVisible"
        :toggleFormModal="toggleAddClientModal"
        :action="createClient"
        :errors="errors.client"
        :disableOuterButtons="() => toggleDisableButtons(true)"
        :enableOuterButtons="() => toggleDisableButtons(false)"
      />

      <ClientForm
        v-if="editClientModalVisible"
        :toggleFormModal="toggleEditClientModal"
        :action="updateClient"
        :deleteAction="deleteClient"
        :errors="errors.client"
        :client="selectedClient"
        :disableOuterButtons="() => toggleDisableButtons(true)"
        :enableOuterButtons="() => toggleDisableButtons(false)"
      />
    </Modal>

    <div class="add-edit-buttons">
      <Button
        :disabled="disableButtons || loading.clients || editClient"
        @click="toggleAddClientModal(true)"
      >
        Add New Client
      </Button>
      <Button
        v-if="checkEmptyClients() && !editClient"
        @click="toggleEditClient(true)"
        :disabled="disableButtons || addClientModalVisible"
      >
        Edit Client
      </Button>
      <Button
        v-if="editClient"
        @click="toggleEditClient(false)"
        :disabled="disableButtons"
      >
        Cancel Edit
      </Button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Button from "@components/atoms/Button/Button";
import Heading from "@components/atoms/Heading/Heading";
import Modal from "@components/atoms/Modal/Modal";
import ClientTable from "@components/molecules/ClientsTable/ClientTable";
import ClientDetailsMap from "@components/molecules/ClientDetailsMap/ClientDetailsMap";
import ClientForm from "@components/molecules/ClientForm/ClientForm";

export default {
  name: "ClientTracker",
  data() {
    return {
      disableButtons: false,
      editClient: false,
      data_table: null,
      clientDetailsModalVisible: false,
      editClientModalVisible: false,
      addClientModalVisible: false,
      selectedClient: null,
      // note: value field in headers is what gets used for table search/sort
      headers: [
        { text: "Name", align: "left", sortable: true, value: "full_name" },
        {
          text: "Number of Stores",
          align: "left",
          sortable: true,
          value: "number_of_sites",
        },
        { text: "Phase", align: "left", sortable: true, value: "phase" },
      ],
    };
  },
  components: {
    Button,
    Modal,
    ClientTable,
    ClientDetailsMap,
    ClientForm,
    Heading,
  },
  created() {},
  mounted() {
    initMap();
  },
  computed: {
    ...mapState(["clients", "errors", "loading"]),
  },
  methods: {
    ...mapActions([
      "loadClients",
      "createClient",
      "updateClient",
      "deleteClient",
    ]),
    hideClientDetails() {
      this.selectedClient = null;
      this.clientDetailsModalVisible = false;
    },
    showClientDetails(client) {
      this.selectedClient = client;
      this.clientDetailsModalVisible = true;
    },
    editClientDetails(client) {
      this.selectedClient = client;
      this.editClientModalVisible = true;
    },
    closeEeditClientDetails() {
      this.selectedClient = null;
      this.editClientModalVisible = false;
    },
    toggleAddClientModal(add) {
      this.addClientModalVisible = add;
    },
    toggleEditClientModal(edit) {
      this.editClientModalVisible = edit;
    },
    toggleEditClient(edit) {
      this.editClient = edit;
    },
    toggleDisableButtons(disable) {
      this.disableButtons = disable;
    },
    checkEmptyClients() {
      if (Object.values(this.clients.all).length) {
        return true;
      } else {
        this.editClient = false;
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./ClientTracker.scss";
</style>