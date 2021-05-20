<template>
  <table class="table">
      <thead>
        <tr>
          <th scope="col">Client Name</th>
          <th scope="col">Number of Sites</th>
          <th scope="col">Number of Pins</th>
          <th scope="col">Phase</th>
        </tr>
      </thead>  
      <tbody>
        <tr v-if="loading.clients">
          <td colspan="4" class="clients-loading">
            <Loading
              v-if="loading.clients"
            />
          </td>
        </tr>
        <tr v-if="!loading.clients && !clients.length">
          <td colspan="4" class="no-clients">There are no clients.</td>
        </tr>
        
        <template v-for="client in clients">
          <tr v-on:click="handleClick(client)" v-bind:key="client.id" class="client-row">
            <td>{{ client.full_name }}</td>
            <td>{{ client.number_of_sites }}</td>
            <td>{{ client.number_of_pins }}</td>
            <td>{{ client.phase }}</td>
          </tr>
        </template>
      </tbody>
    </table>
</template>

<script>
import { mapState } from "vuex";
import Loading from '@components/atoms/Loading/Loading';

export default {
  props: {
    clients: Array,
    editClient: Boolean
  },
  methods: {
    handleClick(client) {
      if (this.editClient) {
        this.$emit('edit-client-details', client);  
      } else {
        this.$emit('show-client-details', client);  
      }
    }
  },
  components: {
    Loading,
  },
  computed: {
    ...mapState(["loading"]),
  },
}
</script>

<style lang="scss" scoped>
@import "./ClientTable.scss";
</style>