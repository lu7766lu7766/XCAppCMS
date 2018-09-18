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
  'doLogin': {
    method: 'post',
    uri: '/passport/token',
    data: {
      'grant_type': 'password',
      'client_id': '4dad2129-4b7f-435b-891f-fb87c324a47e',
      'client_secret': 'BXgVuI8htWfe3U3vbRfX99zyw22FyZkpXsezRCpL'
    }
  },
  'try': {
    uri: '/account/maintain'
  }
}