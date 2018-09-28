import Loader from 'lib/Loader'
import { createApiBody } from 'lib/myLib'
import APIConf, { GET, POST, PUT, DELETE, SuccessCodes, UnLoginCode } from 'src/config/api'
import store from 'src/store'
import { LoginType } from 'module/login'

const install = (Vue, options) => {
  Vue.prototype.$ = $
  Vue.prototype.$loader = new Loader()
  Vue.prototype._ = _
  Vue.prototype.moment = moment

  Vue.prototype.$callApi = async (key, data) => {
    const conf = APIConf[key]
    if (!conf) throw `${key} this api is not assign in project`
    const method = conf.method || (_.startsWith(key, GET) ? GET : _.startsWith(key, POST) ? POST : _.startsWith(key, PUT) ? PUT : _.startsWith(key, DELETE) ? DELETE : GET)
    // console.log(method, conf)
    const res = await axios(createApiBody(method, conf.uri, _.merge(_.pickBy(data), conf.data), conf.header))
    const { data: resData } = res
    resData.success = SuccessCodes.indexOf(resData.code) > -1
    if (resData.success) {
      return resData
    } else {
      if (resData.code == UnLoginCode) { // 401 無認證 直接登出
        store.commit(LoginType.clearAccessToken)
      }
      return { success: resData.success, code: 500, data: {} }
    }

  }

  Vue.component('paginate', require('@/shared/Paginate').default)
  Vue.component('alert', require('@/shared/Alert').default)
}
export default {
  install
}