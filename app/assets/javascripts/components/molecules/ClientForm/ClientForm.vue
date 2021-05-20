<template>
  <div class="client-form-container">
    <Loading v-show="loading.client" />
    <div class="header-delete">
      <Heading :level="'4'">{{ renderHeading() }}</Heading>
      <Button 
        v-if="client" 
        @click="toggleConfirmationModal(true)"
        :variant="'cancel'"
      >
        Delete client
      </Button>
    </div>
    <form @submit="submit">
      <div class="name">
        <Input
          :label="'First Name'"
          :type="'text'"
          :value="firstName"
          @change="(value) => handleChange('firstName', value)"
          :className="'first-last-name'"
          :errors="errors.full_name"
          :required="true"
        />
        <Input
          :label="'Last Name'"
          :type="'text'"
          :value="lastName"
          @change="(value) => handleChange('lastName', value)"
          :className="'first-last-name'"
        />
      </div>

      <Input
        :label="'Email'"
        :type="'email'"
        :value="email"
        @change="(value) => handleChange('email', value)"
        :errors="errors.email"
        :required="true"
      />

      <div class="sites-phase">
        <Input
          :label="'Number of sites'"
          :type="'number'"
          :value="numberOfSites"
          @change="(value) => handleChange('numberOfSites', value)"
          :className="'number-of-sites'"
          :errors="errors.number_of_sites"
          :required="true"
        />
        <Select
          :options="['Active', 'New']"
          :label="'Phase'"
          @select="(value) => handleChange('phase', value)"
          :value="phase"
        />
      </div>

      <div class="buttons">
        <Button
          :variant="'cancel'"
          :className="'save-cancel'"
          @click="toggleFormModal()"
        >
          Cancel
        </Button>
        <Button :variant="'save'" :className="'save-cancel'" :type="'submit'">
          Save
        </Button>
      </div>
    </form>
    <Modal
      :showModal="confirmationModalVisible"
      @close-modal="toggleConfirmationModal(false)"
      :type="'unmounted'"
    >
      <Loading v-show="loading.client" />
      <DeleteConfirmation
        :text="'Client'"
        :cancelAction="() => toggleConfirmationModal(false)"
        :deleteAction="() => deleteClient()"
        :disableButtons="disableButtons"
      />
    </Modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Heading from "@components/atoms/Heading/Heading";
import Input from "@components/atoms/Input/Input";
import Button from "@components/atoms/Button/Button";
import Select from "@components/atoms/Select/Select";
import Modal from "@components/atoms/Modal/Modal";
import Loading from "@components/atoms/Loading/Loading";
import DeleteConfirmation from "@components/molecules/DeleteConfirmation/DeleteConfirmation";

export default {
  name: "ClientForm",
  computed: {
    ...mapState(["loading"]),
  },
  destroyed() {
    this.clearClientErrors();
  },
  props: {
    disableOuterButtons: Function,
    enableOuterButtons: Function,
    toggleFormModal: Function,
    action: Function,
    deleteAction: Function,
    errors: {
      type: Object,
      default: () => ({}),
    },
    client: {
      type: Object,
      default: null,
    },
  },
  data() {
    // data for edit mode
    if (this.client) {
      const { full_name, email, number_of_sites, phase } = this.client;
      const [firstName, lastName] = full_name.split(" ");
     
      return {
        disableButtons: false,
        confirmationModalVisible: false,
        firstName,
        lastName,
        email,
        numberOfSites: number_of_sites,
        phase,
      };
    }

    // data for new client mode
    return {
      disableButtons: false,
      confirmationModalVisible: false,
      firstName: null,
      lastName: null,
      email: null,
      numberOfSites: null,
      phase: "Active",
    };
  },
  components: {
    Input,
    Heading,
    Select,
    Button,
    Loading,
    Modal,
    DeleteConfirmation
  },
  methods: {
    ...mapActions(["clearClientErrors"]),
    renderHeading() {
      return this.client ? "Edit Client" : "New Client";
    },
    handleChange(input, value) {
      this[input] = value;
    },
    toggleConfirmationModal(visible) {
      this.confirmationModalVisible = visible;
    },
    getFullName() {
      let fullName = null;

      if (this.firstName) {
        if (this.lastName) {
          fullName = `${this.firstName} ${this.lastName}`;
        } else {
          fullName = this.firstName;
        }
      }

      return fullName;
    },
    async submit(e) {
      e.preventDefault();
      this.disableOuterButtons();
      
      const clientId = this.client?.id;
      const client = {
        full_name: this.getFullName(),
        email: this.email,
        number_of_sites: this.numberOfSites,
        phase: this.phase,
      };

      await this.action({ clientId, client })
        .then(() => {
          this.enableOuterButtons();
          this.toggleFormModal(false);
        })
        .catch(() => this.enableOuterButtons())
    },
    deleteClient(){
      this.disableButtons = true;

      const clientId = this.client.id;
      this.deleteAction({ clientId })
        .then(() => {
          this.toggleConfirmationModal(false);
          this.toggleFormModal(false);
          this.disableButtons = false;
        })
    }
  },
};
</script>

<style lang="scss">
@import "./ClientForm.scss";
</style>
