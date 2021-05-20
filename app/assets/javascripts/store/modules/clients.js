import {
  ADD_NEW_CLIENT,
  RECEIVE_CLIENT,
  REMOVE_CLIENT
} from './mutation-types';

// state
const state = () => ({
  all: {}
});

// mutations
const mutations = {
  set_clients(state, clients) {
    const clientsObject = {};
    clients.forEach((client) => clientsObject[client.id] = client);
    state.all = clientsObject;
  },
  [ADD_NEW_CLIENT](state, client) {
    state.all[client.id] = client;
  },
  [RECEIVE_CLIENT](state, client) {
    state.all[client.id] = client
  },
  [REMOVE_CLIENT](state, client) {
    delete state.all[client.id];
  }
};

// actions
const actions = {
  async setClients(context, clients) {
    context.commit('set_clients', clients);
  },
  async receiveClient(context, client) {
    context.commit('RECEIVE_CLIENT', client);
    context.commit('TOGGLE_CLIENT_LOADING', false);
    context.commit('CLEAR_CLIENT_ERRORS');
  },
  async addNewClient(context, client) {
    context.commit('ADD_NEW_CLIENT', client);
    context.commit('TOGGLE_CLIENT_LOADING', false);
    context.commit('CLEAR_CLIENT_ERRORS');
  },
  async removeClient(context, client) {
    context.commit('REMOVE_CLIENT', client);
    context.commit('TOGGLE_CLIENT_LOADING', false);
  },
  loadClients: async ({
    dispatch
  }) => {
    await dispatch('toggleClientsLoading', true);

    return axios({
      method: "GET",
      url: "/clients"
    }).then(
      async (result) => {
        await dispatch('setClients', result.data);
        await dispatch('toggleClientsLoading', false);
      },
    )
  },
  fetchClient: async ({
    dispatch
  }, clientId) => (
    axios.get(`/clients/${clientId}`)
    .then((res) => dispatch('receiveClient', res.data))
  ),
  createClient: async ({
    dispatch
  }, {
    client
  }) => {
    await dispatch('toggleClientLoading', true);

    return (
      new Promise((resolve, reject) => {
        axios.post('/clients', client)
          .then((res) => resolve(dispatch('addNewClient', res.data)))
          .catch((errors) => reject(dispatch('receiveClientErrors', errors.response.data)))
      })
    );
  },
  updateClient: async ({
    dispatch
  }, {
    clientId,
    client
  }) => {
    await dispatch('toggleClientLoading', true);

    return (
      new Promise((resolve, reject) => {
        axios.patch(`/clients/${clientId}`, client)
          .then((res) => resolve(dispatch('receiveClient', res.data)))
          .catch((errors) => reject(dispatch('receiveClientErrors', errors.response.data)))
      })
    );
  },
  deleteClient: async ({
    dispatch
  }, {
    clientId
  }) => {
    await dispatch('toggleClientLoading', true);

    return axios.delete(`/clients/${clientId}`)
      .then(async (res) => {
        await dispatch('removeClient', res.data);
        await dispatch('removeClientPins', clientId);
      })
  },
}

// getters
const getters = {
  clients: state => state.clients,
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters,
}