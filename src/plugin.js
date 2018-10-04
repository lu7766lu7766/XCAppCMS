import Loader from 'lib/Loader'
import { createApiBody } from 'lib/myLib'
import APIConf, { GET, POST, PUT, DELETE } from 'src/config/api'
import Middelware from 'src/middleware'

const install = (Vue, options) =>
{
  Vue.prototype.$ = $
  Vue.prototype.$loader = new Loader()
  Vue.prototype._ = _
  Vue.prototype.moment = moment

  Vue.prototype.$copy = selector =>
  {
    var clip_area = document.createElement('textarea')
    clip_area.textContent = selector.textContent

    document.body.appendChild(clip_area)
    clip_area.select()

    document.execCommand('copy')
    clip_area.remove()
  }

  Vue.prototype.$callApi = async (key, data) =>
  {
    const conf = APIConf[key]
    if (!conf) throw `${key} this api is not assign in project`

    const method = conf.method ||
      (_.startsWith(key, GET)
          ? GET
          : _.startsWith(key, POST)
            ? POST
            : _.startsWith(key, PUT)
              ? PUT
              : _.startsWith(key, DELETE)
                ? DELETE
                : GET
      )
    // console.log(method, conf)

    const res = await axios(createApiBody(method, conf.uri, _.merge(_.pickBy(data), conf.data), conf.header))

    /**
     * middleware
     */
    const app = new Middelware
    app.use('api')
    _.forEach(conf.middleware, middleware =>
    {
      app.use(middleware)
    })
    app.go(res.data)
    // console.log(res.data)

    return res.data
  }

  Vue.component('container', require('@/shared/Container').default)
  Vue.component('paginate', require('@/shared/Paginate').default)
  Vue.component('alert', require('@/shared/Alert').default)
  Vue.component('request-result', require('@/shared/RequestResult').default)
  Vue.component('multi-select', require('vue-multiselect').default)
}
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  install
}