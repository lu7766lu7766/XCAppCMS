import qs from 'qs'
import store from 'src/store'
import { hosts as hostsConf, POST, PUT } from 'src/config/api'

var host = location.host.split('.').splice(-2).join('.')
var target = hostsConf.target
Object.keys(hostsConf.host).forEach(key =>
{
  target = hostsConf.host[key].host === host
    ? key
    : target
})
var apiPrefix = hostsConf.host[target].api
  ? (hostsConf.host[target].api + '.')
  : ''
var apiHost = `//${apiPrefix}${hostsConf.host[target].host}`

export function createApiBody(method = 'get', uri = '', data = {}, header = {}) {
  let apiHeader = {}
  // apiHeader['Content-Type'] = 'application/json'
  const access = store.state.Login.access
  if (access)
  {
    apiHeader['Authorization'] = access.token_type + ' ' + access.access_token
  }
  apiHeader = _.merge(apiHeader, header)

  let res = {
    url: apiHost + replaceMatchData(uri, data), //.replace(/\/{[\w]+}/g, ''),
    headers: apiHeader,
    method,
    responseType: 'json',
    withCredentials: true
  }
  const isSendData = method === PUT || method === POST
  const dataProperty = isSendData
    ? 'data'
    : 'params'
  res[dataProperty] = isSendData
    ? qs.stringify(data)
    : data
  return res
}

function replaceMatchData(uri, data) {
  var ts = uri.match(/({[\w]+})/g)
  if (ts)
  {
    ts.forEach(key =>
    {
      key = key.replace(/[{}]/g, '')
      if (data[key])
      {
        uri = uri.replace(`{${key}}`, data[key])
        delete data[key]
      }
    })
  }
  return uri
}