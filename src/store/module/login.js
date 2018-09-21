import router from 'src/router'

const type = {
  // mutation
  setAccessToken: 'Login/setAccessToken',
  clearAccessToken: 'Login/clearAccessToken',
  // action
  // 
  // getters
  isLogin: 'Login/isLogin'
}

export { type as LoginType }

export default {
  namespaced: true,
  state: {
    access: null
  },
  mutations: {
    setAccessToken(state, context) {
      state.access = context
    },
    clearAccessToken(state) {
      state.access = null
      router.replace({ name: 'login' })
    }
  },
  actions: {
  },
  getters: {
    isLogin: state => !!state.access
  }
}