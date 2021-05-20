import store from '../store';
import ClientTracker from '@components/pages/ClientTracker/ClientTracker';

$(document).ready(function () {
  let app_element = document.querySelector("#client_tracker");
  if (app_element != undefined) {
    const client_tracker = new Vue({
      el: app_element,
      // provide the store using the "store" option.
      // this will inject the store instance to all child components.
      store,
      template: "<ClientTracker/>",
      components: {
        ClientTracker
      },
      created() {
        this.$store.dispatch('loadClients');
      }
    })

  }
});