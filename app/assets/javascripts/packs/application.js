import Vue from 'vue/dist/vue.esm.js';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        clients: null
    },
    getters: {
        clients: state => state.clients
    },
    mutations: {
        set_clients(state, clients) {
            state.clients = clients;
        }
    },
    actions: {        
        async setClients(context, clients) {
            context.commit('set_clients', clients);
        },
        async loadClients({dispatch}) {
            return axios({
                method: "GET",
                url: "/clients"
            }).then(
                result => {
                    dispatch('setClients', result.data);
                },
                error => {}
            );
        },
    }
});

import ClientTracker from '../client_tracker.vue';

$(document).ready(function(){
    let app_element = document.querySelector("#client_tracker");
    if (app_element != undefined){
        const client_tracker = new Vue({
            el: app_element,
            // provide the store using the "store" option.
            // this will inject the store instance to all child components.
            store,
            template: "<ClientTracker/>",
            components: { ClientTracker },
            created() {
                this.$store.dispatch('loadClients');
            }
        })
    }
});

