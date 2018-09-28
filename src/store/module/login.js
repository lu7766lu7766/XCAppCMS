import router from 'src/router'

const type = {
  // mutation
  setAccessToken: 'Login/setAccessToken',
  clearAccessToken: 'Login/clearAccessToken',
  setAccount: 'Login/setAccount',
  // action
  // 
  // getters
  isLogin: 'Login/isLogin'
}

export { type as LoginType }

export default {
  namespaced: true,
  state: {
    access: null,
    account: null
  },
  mutations: {
    setAccessToken(state, context) {
      state.access = context
    },
    clearAccessToken(state) {
      state.access = null
      router.replace({ name: 'login' })
    },
    setAccount(state, context) {
      state.account = context
    }
  },
  actions: {
  },
  getters: {
    isLogin: state => !!state.access
  }
}