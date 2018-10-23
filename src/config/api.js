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

  // app manage
  'getAppManageList': {
    method: 'post',
    uri: '/app_management',
    middleware: ['app']
  },
  'postAppManage': {
    uri: '/app_management/data_manipulation'
  },
  'putAppManage': {
    uri: '/app_management/data_manipulation'
  },
  'deleteAppManageList': {
    uri: '/app_management/data_manipulation'
  },
  'getAppManageTotal': {
    method: 'post',
    uri: '/app_management/total'
  },
  // app common
  'getAppOption': {
    uri: '/app_management/options'
  },
  // app setting
  'getAppSettingList': {
    method: 'post',
    uri: '/app_setting',
    middleware: ['app']
  },
  'postAppSetting': {
    uri: '/app_setting/data_manipulation'
  },
  'putAppSetting': {
    uri: '/app_setting/data_manipulation'
  },
  'deleteAppSettingList': {
    uri: '/app_setting/data_manipulation'
  },
  'getAppSettingTotal': {
    method: 'post',
    uri: '/app_setting/total'
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

  // profile
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
  },

  // link-category
  'getLinkCategoryList': {
    method: 'post',
    uri: '/web_link/category',
    middleware: ['dataList']
  },
  'postLinkCategory': {
    uri: '/web_link/category/store'
  },
  'putLinkCategory': {
    uri: '/web_link/category'
  },
  'deleteLinkCategoryList': {
    uri: '/web_link/category'
  },
  'getLinkCategoryTotal': {
    method: 'post',
    uri: '/web_link/category/total'
  },

  // web-link
  'getWebLinkList': {
    method: 'post',
    uri: '/web_link',
    middleware: ['webLink']
  },
  'postWebLink': {
    uri: '/web_link/store'
  },
  'putWebLink': {
    uri: '/web_link'
  },
  'deleteWebLinkList': {
    uri: '/web_link'
  },
  'getWebLinkTotal': {
    method: 'post',
    uri: '/web_link/total'
  },
  'getWebLinkOptions': {
    uri: '/web_link/options'
  },

  // news category
  'getNewsCategoryList': {
    method: 'post',
    uri: '/news/category'
  },
  'postNewsCategory': {
    uri: '/news/category/maintain'
  },
  'putNewsCategory': {
    uri: '/news/category/maintain'
  },
  'deleteNewsCategoryList': {
    uri: '/news/category/maintain'
  },
  'getNewsCategoryTotal': {
    method: 'post',
    uri: '/news/category/total'
  },
  'uploadNewsCategoryImage': {
    method: 'post',
    uri: '/news/category/upload'
  },

  // news
  'getNewsList': {
    method: 'post',
    uri: '/news/management'
  },
  'postNews': {
    uri: '/news/management/maintain'
  },
  'putNews': {
    uri: '/news/management/maintain'
  },
  'deleteNewsList': {
    uri: '/news/management/maintain'
  },
  'getNewsTotal': {
    method: 'post',
    uri: '/news/management/total'
  },
  'getNewsTopics': {
    uri: '/news/management/topic'
  },
  'getNewsCategorys': {
    uri: '/news/management'
  },
  'uploadNewsImage': {
    method: 'post',
    uri: '/news/category/upload'
  }
}

export const GET = 'get'
export const POST = 'post'
export const PUT = 'put'
export const DELETE = 'delete'
export const SuccessCodes = [0, 200, 201]
export const UnLoginCode = 401

/**
 * 取得符合目前domain的 host config
 * @param target
 * @returns {*}
 */
export const hosts = {
  test: {
    'host': 'xing99.cc',
    'api': 'api-appcms',
    'web': 'appcms'
  },
  rc: {
    'host': 'xing77.cc',
    'api': 'api-appcms',
    'web': 'appcms'
  },
  stable: {
    'host': 'apps99.cc',
    'api': 'api',
    'web': 'admin'
  },
  local: {
    'host': '192.168.1.21',
    'api': '',
    'web': ''
  }
}
const env = require('src/../env')

export function getCurrentTarget() {
  var target = env.target
  var host = location.host.split('.').splice(-2).join('.')
  Object.keys(hosts).forEach(key =>
  {
    target = hosts[key].host === host
      ? key
      : target
  })
  return target
}


