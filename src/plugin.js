import Loader from 'lib/Loader'
import { createApiBody } from 'lib/myLib'
import APIConf from 'src/config/api'

const install = (Vue, options) => {
  Vue.prototype.$ = $
  Vue.prototype.$loader = new Loader()
  Vue.prototype._ = _
  Vue.prototype.moment = moment

  Vue.prototype.$callApi = async (key, data) => {
    const conf = APIConf[key]
    const res = await axios(createApiBody(conf.method, conf.uri, _.merge(data, conf.data), conf.header))
    const { data: resData } = res
    resData.success = (resData.code == 0 || resData.code == 200)
    return res.status == 200 ? resData : { success: false, code: 500, data: {} }
  }

  Vue.component('paginate', require('@/shared/Paginate').default)
}
export default {
  install
}