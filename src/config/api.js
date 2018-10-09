// api config
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
      'grant_type': 'password'
    },
    special: 'login'
  },
  'persionTokenGenerate': {
    method: 'post',
    uri: '/passport/token/personal/generate'
  },
  // menu
  'getMyNodes': {
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
  'putAccount': {
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
  },
  // role permission
  'getRoleNodes': {
    method: 'post',
    uri: '/role/node/map',
    middleware: ['permission']
  },
  'putRoleNodes': {
    method: 'post',
    uri: '/role/node/configure'
  }
}

export const GET = 'get'
export const POST = 'post'
export const PUT = 'put'
export const DELETE = 'delete'
export const SuccessCodes = [0, 200, 201]
export const UnLoginCode = 401
const hosts = {
  // 本地測試用，對應host.xxx
  target: 'rc',
  // host config
  host: {
    test: {
      host: 'xing99.cc',
      api: 'api-appcms',
      web: 'appcms',
      login: {
        client_id: 'cd42865e-1026-4875-86c3-afa6ac15d4fd',
        client_secret: 'h3Cbzy7fRIioogCoEzhKUt3yPlJDiBytPgXnOuZN'
      }
    },
    rc: {
      host: 'xing77.cc',
      api: 'api-appcms',
      web: 'appcms',
      login: {
        client_id: '15393d1d-c0ba-42dc-9a04-b79655769ee7',
        client_secret: 'jiP9Zalt0Vbt7hv7M6KmgwVbiy5m2gJO5EKIAmRL'
      }
    },
    formal: {
      host: 'apps99.cc',
      api: 'api',
      web: 'admin',
      login: {
        client_id: 'f0f6030c-38e8-4f4a-9e5b-29635ad1bcc7',
        client_secret: '3uZoEbCFdacdFikZCzKZatGjTM1VoKfSjlutxgPE'
      }
    },
    local: {
      host: '192.168.1.21',
      api: '',
      web: ''
    }
  }
}

/**
 * 取得符合目前domain的 host config
 * @param target
 * @returns {*}
 */
export function getCurrentHost(target = hosts.target) {
  var host = location.host.split('.').splice(-2).join('.')
  Object.keys(hosts.host).forEach(key =>
  {
    target = hosts.host[key].host === host
      ? key
      : target
  })
  return hosts.host[target]
}
