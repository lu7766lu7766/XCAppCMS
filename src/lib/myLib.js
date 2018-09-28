import qs from 'qs'
import store from 'src/store'
import { PUT, POST } from 'src/config/api'

import hostsConf from 'src/config/hosts'
var host = location.host.split('.').splice(-2).join('.')
var target = hostsConf.target
Object.keys(hostsConf.host).forEach(key => {
  target = hostsConf.host[key].host == host ? key : target
})
var apiHost = `//${hostsConf.host[target].api}.${hostsConf.host[target].host}`

export function createApiBody(method = 'get', uri = '', data = {}, header = {}) {
  let apiHeader = {}
  // apiHeader['Content-Type'] = 'application/json'
  const access = store.state.Login.access
  access ? apiHeader['Authorization'] = access.token_type + ' ' + access.access_token : ''
  apiHeader = _.merge(apiHeader, header)
  let res = {
    url: apiHost + replaceMatchData(uri, data),
    headers: apiHeader,
    method,
    responseType: 'json',
    // withCredentials: true
  }
  const isSendData = method == PUT || method == POST
  res[isSendData ? 'data' : 'params'] = isSendData ? qs.stringify(data) : data
  return res
}

function replaceMatchData(uri, data) {
  var ts = uri.match(/({[\w]+})/g)
  ts ? ts.forEach(key => {
    key = key.replace(/[{}]/g, '')
    if (data[key]) {
      uri = uri.replace(`{${key}}`, data[key])
      delete data[key]
    }
  }) : ''
  return uri
}