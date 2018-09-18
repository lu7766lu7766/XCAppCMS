import qs from 'qs'
import store from 'src/store'

export function createApiBody(method = 'get', uri = '', data = {}, header = {}) {
  let apiHeader = {}
  // apiHeader['Content-Type'] = 'application/json'
  const access = store.state.Login.access
  access ? apiHeader['Authorization'] = access.token_type + ' ' + access.access_token : ''
  apiHeader = _.merge(apiHeader, header)

  let res = {
    url: config.apiHost + uri,
    headers: apiHeader,
    method,
    responseType: 'json',
    withCredentials: true
  }
  res[method == 'get' ? 'params' : 'data'] = qs.stringify(data)
  return res
}
