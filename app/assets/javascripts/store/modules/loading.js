import { TOGGLE_CLIENT_LOADING, TOGGLE_CLIENTS_LOADING } from './mutation-types';

// state
const state = () => ({
  client: false,
  clients: false,
});

// mutations
const mutations = {
  [TOGGLE_CLIENT_LOADING](state, loading) {
    state.client = loading;
  },
  [TOGGLE_CLIENTS_LOADING](state, loading) {
    state.clients = loading;
  },
}

// actions
const actions = {
  async toggleClientLoading(context, loading) {
    context.commit('TOGGLE_CLIENT_LOADING', loading);
  },
  async toggleClientsLoading(context, loading) {
    context.commit('TOGGLE_CLIENTS_LOADING', loading);
  },
}

export default {
  state,
  mutations,
  actions,
}