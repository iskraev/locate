<template>
    <div id="client_tracker">
        hello11
        <table class="table">
            <thead>                
                <tr>
                    <th scope="col">Client Name</th>
                    <th scope="col">Number of Sites</th>
                    <th scope="col">Phase</th>
                </tr>
                <template v-for="client in clients">
                    <tr v-on:click="show_client_details(client)" v-bind:key="client.id">
                        <td>{{ client.full_name }}</td>
                        <td>{{ client.number_of_sites }}</td>
                        <td>{{ client.phase }}</td>
                    </tr>
                </template>
            </thead>
        </table>

        <div class="modal_container" v-show="client_details_modal_visible" @click="hide_client_details()">
            <div id="client_details_modal" @click.stop="">
                <div v-if="selected_client">
                    <h1>{{ selected_client.full_name }}
                            <span aria-hidden="true" class="close_x" @click="hide_client_details()">&times;</span>
                    </h1>
                </div>
                <div id="map_container">
                    <input id="pac-input" class="controls" type="text" placeholder="Search a Place">
                    <div id="map-canvas"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: "client_tracker",
    data() {
        return {
            data_table: null,
            client_details_modal_visible: false,
            selected_client: null,
            // note: value field in headers is what gets used for table search/sort
            headers: [{ text: 'Name', align: 'left', sortable: true, value: 'full_name'},
                { text: 'Number of Stores', align: 'left', sortable: true, value: 'number_of_sites' },
                { text: 'Phase', align: 'left', sortable: true, value: 'phase' }],
        };
    },
    components: {

    },
    created() {

    },
    mounted() {
        initMap();
        this.loadClients();
    },
    computed: {
        ...mapState(['clients'])
    },
    methods: {
        ...mapActions(['loadClients']),
        hide_client_details(){
            this.selected_client = null;
            this.client_details_modal_visible = false;
        },
        show_client_details(client) {
            this.selected_client = client;
            this.client_details_modal_visible = true;
        }
    }
}
</script>