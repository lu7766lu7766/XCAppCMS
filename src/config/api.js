export default {
  'test': {
    method: 'get',
    uri: '/web_test'
  },
  // login
  'doLogin': {
    method: 'post',
    uri: '/passport/login',
    data: {
      'grant_type': 'password',
      'client_id': 'cd42865e-1026-4875-86c3-afa6ac15d4fd',
      'client_secret': 'h3Cbzy7fRIioogCoEzhKUt3yPlJDiBytPgXnOuZN'
    }
  },
  'persionTokenGenerate': {
    method: 'post',
    uri: '/passport/token/personal/generate'
  },
  // menu
  'getNodes': {
    uri: '/node/map'
  },
  // app
  'getAppList': {
    method: 'post',
    uri: '/app_management',
    middleware: ['app']
  },
  // 'getAppDetail': {
  //   uri: '/app_management/data_manipulation/{id}'
  // },
  'postAppDetail': {
    uri: '/app_management/data_manipulation'
  },
  'putAppDetail': {
    uri: '/app_management/data_manipulation'
  },
  'deleteAppList': {
    uri: '/app_management/data_manipulation'
  },
  'getAppOption': {
    uri: '/app_management/options'
  },
  'getAppTotal': {
    method: 'post',
    uri: '/app_management/total'
  },
  // message 
  'getMessageList': {
    method: 'post',
    uri: '/pushnotification/message',
    middleware: ['message']
  },
  'getMessageTopic': {
    uri: '/pushnotification/message/topic'
  },
  'getMessageTotal': {
    uri: '/pushnotification/message'
  },
  'postMessage': {
    uri: '/pushnotification/message/maintain'
  },
  'putMessage': {
    uri: '/pushnotification/message/maintain'
  },
  'deleteMessageList': {
    uri: '/pushnotification/message/maintain'
  },
  'pushMessage': {
    method: 'post',
    uri: '/pushnotification/message/push'
  },
  // account 
  'getMemberList': {
    method: 'post',
    uri: '/account/list',
    middleware: ['account']
  },
  'getMemberTotal': {
    method: 'post',
    uri: '/account/list/total'
  },
  'postMember': {
    uri: '/account/maintain'
  },
  'putMember': {
    uri: '/account/maintain'
  },
  'deleteMemberList': {
    uri: '/account/maintain'
  },
  'getAccount': {
    uri: '/account/self'
  },
  // roles
  'getRoleList': {
    method: 'post',
    uri: '/role/index'
  },
  'getRoleTotal': {
    uri: '/role/total'
  },
  'getRole': {
    uri: '/role/maintain'
  },
  'postRole': {
    uri: '/role/maintain'
  },
  'deleteRole': {
    uri: '/role/maintain/{id}'
  }
}

export const GET = 'get'
export const POST = 'post'
export const PUT = 'put'
export const DELETE = 'delete'
export const SuccessCodes = [0, 200, 201]
export const UnLoginCode = 401
export const hosts = {
  target: 'test',
  host: {
    test: {
      host: 'xing99.cc',
      api: 'test-app-api',
      web: 'test-app-cms'
    },
    formal: {
      host: 'apps99.cc',
      api: 'api',
      web: 'admin'
    },
    local: {
      host: '192.168.1.21',
      api: '',
      web: ''
    }
  }
}