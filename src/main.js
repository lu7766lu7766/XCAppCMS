import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

sync(store, router)

// meta
import Meta from 'vue-meta'

Vue.use(Meta)

// bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

//validate
import VeeValidate from 'vee-validate'
import cn from 'vee-validate/dist/locale/zh_CN'

const config = {
  locale: 'cn',
  events: 'input|blur',
  dictionary: {cn}
}
cn.messages.required = () => '必填栏位'
Vue.use(VeeValidate, config)

// swal
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)

// my plugin
import MyPlugin from 'src/plugin'

Vue.use(MyPlugin, {})

Vue.config.productionTip = false

export const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
