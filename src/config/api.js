export default {
  // 'refreshCSRFfToken': {
  //   uri: '/auth/face'
  // },
  // 'doLogin': {
  //   method: 'post',
  //   uri: '/auth/login'
  // },
  // 'doLogout': {
  //   method: 'post',
  //   uri: '/auth/logout'
  // },
  // 'getStatus': {
  //   uri: '/auth/status'
  // },
  'getNodes': {
    uri: '/node/map'
  },
  'doLogin': {
    method: 'post',
    uri: '/passport/token',
    data: {
      'grant_type': 'password',
      'client_id': '67ef72fb-4f52-4c70-a6de-b97df731a9e3',
      'client_secret': 'tZYsxU69xCifC8q9DUxz9hhC8P5F1ozKDSKTgwTv'
    }
  }
}