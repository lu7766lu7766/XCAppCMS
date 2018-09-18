import Vue from "vue"
import Vuex from "vuex"
import Login from './module/login'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Login
  },
  state: {
  },
  mutations: {
  },
  plugins: [createPersistedState()]
});
