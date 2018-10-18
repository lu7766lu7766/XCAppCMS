import qs from 'qs'
import store from 'src/store'
import { hosts, POST, PUT, getCurrentTarget } from 'src/config/api'

var hostConf = hosts[getCurrentTarget()]
var apiPrefix = hostConf.api
  ? (hostConf.api + '.')
  : ''
export var apiHost = `//${apiPrefix}${hostConf.host}`

/**
 * create api request body
 * @param method
 * @param uri
 * @param data
 * @param header
 * @returns {{url: string, headers, method: string, responseType: string, withCredentials: boolean}}
 */
export function createApiBody(method = 'get', uri = '', data = {}, header = {}) {

  let apiHeader = _.merge(getApiHeader(), header)

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

/**
 * find the key match in uri and replace it
 * ex. uri: '/aa/{id}', data: {a: 'a', id: 1}
 * result. /aa/1 data: {a: 'a'}
 * @param uri
 * @param data
 * @returns {*}
 */
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

/**
 * root to parse json at api result
 * @param val
 * @returns {*}
 */
export function roopParse(val) {
  if (_.isObject(val) || _.isArray(val))
  {
    _.forEach(val, (v, k) =>
    {
      val[k] = roopParse(v)
    })
    return val
  }
  else
  {
    try
    {
      return JSON.parse(val)
    }
    catch (err)
    {
      return val
    }
  }
}

/**
 * create file upload request body
 * @param uri
 * @param files
 * @param method
 * @returns {{url: string, headers, method: string, responseType: string, withCredentials: boolean}}
 */
export function createUploaderBody(method, uri, files) {

  let formData = new FormData()

  _.forEach(files, (file, key) =>
  {
    formData.append(key, file)
  })

  return {
    url: apiHost + uri,
    headers: getApiHeader(),
    method,
    data: formData,
    responseType: 'json',
    withCredentials: true
  }
}

function getApiHeader() {
  let apiHeader = {}
  const access = store.state.Login.access
  if (access)
  {
    apiHeader['Authorization'] = access.token_type + ' ' + access.access_token
  }
  return apiHeader
}
