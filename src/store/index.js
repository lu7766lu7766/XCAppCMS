import Vue from "vue"
import Vuex from "vuex"
import Login from './module/login'
import Node from './module/node'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Login,
    Node
  },
  state: {
  },
  mutations: {
  },
  plugins: [createPersistedState()]
});
