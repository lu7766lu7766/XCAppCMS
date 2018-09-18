import { app } from 'src/main'

const type = {
  // mutation
  setAccessToken: "Login/setAccessToken"
  // action
  // 
}

export { type as LoginType }

export default {
  namespaced: true,
  state: {
    access: null,
    isLogin: false
  },
  mutations: {
    setAccessToken(state, context) {
      state.access = context
    }
  },
  actions: {
  }
}