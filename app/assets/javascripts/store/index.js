import Vuex, {
  createLogger
} from 'vuex';

import clients from './modules/clients';
import pins from './modules/pins';
import errors from './modules/errors';
import loading from './modules/loading';

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [createLogger()],
  modules: {
    clients,
    pins,
    errors,
    loading,
  },
})