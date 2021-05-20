import {
  RECEIVE_CLIENT_PINS,
  RECEIVE_CLIENT_PIN,
  REMOVE_CLIENT_PINS
} from './mutation-types';

const state = () => ({
  all: {},
})

// mutations
const mutations = {
  [RECEIVE_CLIENT_PINS](state, payload) {
    const {
      id,
      pins
    } = payload;
    state.all[id] = pins;
  },
  [RECEIVE_CLIENT_PIN](state, payload) {
    const {
      id,
      pin
    } = payload;
    const newMarkers = [...state.all[id]];
    newMarkers.push(pin)
    Vue.set(state.all, id, newMarkers)
  },
  [REMOVE_CLIENT_PINS](state, clientId) {
    delete state.all[clientId];
  }
};

// actions
const actions = {
  async receiveClientPins(context, payload) {
    context.commit('RECEIVE_CLIENT_PINS', payload);
  },
  async receiveClientPin(context, payload) {
    context.commit('RECEIVE_CLIENT_PIN', payload);
  },
  async removeClientPins(context, clientId) {
    context.commit('REMOVE_CLIENT_PINS', clientId);
  },
  fetchClientPins: async ({
    dispatch
  }, clientId) => (
    axios.get(`/clients/${clientId}/pins`)
    .then((res) => dispatch('receiveClientPins', {
      id: clientId,
      pins: res.data
    }))
  ),
  createClientPin: async ({
    dispatch
  }, pin) => {
    const res = await axios.post(`/pins`, pin);
    const clientId = res.data.client_id;

    await dispatch('fetchClient', clientId, { root: true });

    await dispatch('receiveClientPin', {
      id: res.data.client_id,
      pin: res.data,
    })
  },
  updateClientPins: async ({
    dispatch
  }, pins) => {
    if (pins.length) {
      const clientId = pins[0].client_id;
      await axios.patch(`/pins/update`, {
        pins
      }, { root: true });
      await dispatch('fetchClientPins', clientId);
    }
  },
  deletePin: async ({
    dispatch
  }, {
    pinId,
    clientId
  }) => {
    await axios.delete(`pins/${pinId}`);
    await dispatch('fetchClient', clientId, { root: true });
    await dispatch('fetchClientPins', clientId);
  }
}


export default {
  state,
  mutations,
  actions,
}