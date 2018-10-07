// import Loader from 'lib/Loader'
import { createApiBody, roopParse } from 'lib/myLib'
import APIConf, { GET, POST, PUT, DELETE, SuccessCodes, UnLoginCode } from 'src/config/api'
import Middleware, { mapping as MiddleMapping } from 'src/middleware'
import store from 'src/store'
import { LoginType } from 'src/store/module/login'

const install = (Vue, options) =>
{
  Vue.prototype.$ = $
  // Vue.prototype.$loader = new Loader()
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

    var res = await axios(createApiBody(method, conf.uri, _.merge(_.pickBy(data), conf.data), conf.header))

    // middleware

    const app = new Middleware
    app.use(function (next)
    {
      res = res.data

      res.success = SuccessCodes.indexOf(res.code) > -1
      if (res.success)
      {
        res = roopParse(res)
      }
      else
      {
        if (res.code === UnLoginCode)
        { // 401 無認證 直接登出
          store.commit(LoginType.clearAccessToken)
        }
        res = {success: res.success, code: 500, data: {}}
      }
      this.res = res
      next()
    })

    _.forEach(conf.middleware, middleware =>
    {
      app.use(MiddleMapping[middleware].default.handle)
    })

    app.go(function () {})

    return res

    // app.use(function (res, next)
    // {
    //   console.log(1)
    //   next()
    //   console.log(2)
    // })
    // app.use(function (res, next)
    // {
    //   console.log(3)
    //   next()
    //   console.log(4)
    // })
    // app.go(function ()
    // {
    //   console.log(5)
    // })
  }

  Vue.component('container', require('@/shared/Container').default)
  Vue.component('paginate', require('@/shared/Paginate').default)
  Vue.component('alert', require('@/shared/Alert').default)
  Vue.component('request-result', require('@/shared/RequestResult').default)

  Vue.component('create-btn', require('@/shared/Button/Create').default)
  Vue.component('update-btn', require('@/shared/Button/Update').default)
  Vue.component('delete-btn', require('@/shared/Button/Delete').default)
  Vue.component('permission-btn', require('@/shared/Button/Permission').default)
  Vue.component('search-btn', require('@/shared/Button/Search').default)

  Vue.component('multi-select', require('vue-multiselect').default)
}
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  install
}