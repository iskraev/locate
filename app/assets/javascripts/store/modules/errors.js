import {
  RECEIVE_CLIENT_ERRORS,
  CLEAR_CLIENT_ERRORS
} from './mutation-types';

const state =  {
  client: {}
};

const mutations = {
  [RECEIVE_CLIENT_ERRORS](state, errors) {
    state.client = errors;
  },
  [CLEAR_CLIENT_ERRORS](state, _) {
    state.client = {};
  },
}

const actions = {
  async receiveClientErrors(context, errors) {
    context.commit('RECEIVE_CLIENT_ERRORS', errors);
    context.commit('TOGGLE_CLIENT_LOADING', false, { root: true });
  },
  async clearClientErrors(context) {
    context.commit('CLEAR_CLIENT_ERRORS');
  },
}

export default {
  state,
  mutations,
  actions,
}