import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

sync(store, router)

import Meta from 'vue-meta'

Vue.use(Meta)

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap'

import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)

import MyPlugin from 'src/plugin'

Vue.use(MyPlugin, {})

Vue.config.productionTip = false

export const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
