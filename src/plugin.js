// import Loader from 'lib/Loader'
import { createApiBody, roopParse } from 'lib/myLib'
import APIConf, { GET, POST, PUT, DELETE, SuccessCodes, UnLoginCode, getCurrentTarget } from 'src/config/api'
import Middleware, { mapping as MiddleMapping } from 'src/middleware'
import store from 'src/store'
import { LoginType } from 'src/store/module/login'
import Vue from 'vue'

const install = (Vue, options) =>
{
  Vue.prototype.$ = $
  // Vue.prototype.$loader = new Loader()
  Vue.prototype._ = _
  Vue.prototype.moment = moment

  /**
   * copy selector's text
   * @param selector dom element
   */
  Vue.prototype.$copy = selector =>
  {
    var clip_area = document.createElement('textarea')
    clip_area.textContent = selector.textContent

    document.body.appendChild(clip_area)
    clip_area.select()

    document.execCommand('copy')
    clip_area.remove()
    Vue.toasted.show('复制成功')
  }

  /**
   * get api return
   * @param key api.json相關key
   * @param data request body
   * @returns {Promise<*>}
   */
  Vue.prototype.$callApi = async (key, data) =>
  {
    const conf = APIConf[key]
    if (!conf) throw `${key} this api is not assign in project`

    const {special} = conf
    console.log(special, data)
    if (special) await specialProccess(special, data)
    console.log(special, data)
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

    // add middleware
    _.forEach(conf.middleware, middleware =>
    {
      app.use(MiddleMapping[middleware].default.handle)
    })

    // start middleware
    app.go(function () {})

    return res
  }

  // shared components
  assignComponent('list-container', require('@/shared/Container/List'))
  assignComponent('detail-container', require('@/shared/Container/Detail'))
  assignComponent('paginate', require('@/shared/Paginate'))
  assignComponent('alert', require('@/shared/Alert'))
  assignComponent('request-result', require('@/shared/RequestResult'))
  assignComponent('error-message', require('@/shared/ErrorMessage'))
  assignComponent('node-breadcrumb', require('@/shared/Breadcrumb/Node'))
  assignComponent('custom-breadcrumb', require('@/shared/Breadcrumb/Custom'))

  assignComponent('create-btn', require('@/shared/Button/Create'))
  assignComponent('update-btn', require('@/shared/Button/Update'))
  assignComponent('delete-btn', require('@/shared/Button/Delete'))
  assignComponent('permission-btn', require('@/shared/Button/Permission'))
  assignComponent('search-btn', require('@/shared/Button/Search'))

  assignComponent('multi-select', require('vue-multiselect'))
}
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  install
}

/**
 * proccess special
 * @param key special key
 * @param data source request body
 */
async function specialProccess(key, data) {
  switch (key)
  {
    case 'login':
      const target = getCurrentTarget()
      var passwordRes = await axios.get('/assets/config/passport.json')
      _.assign(data, passwordRes.data[target])
      break
  }
}

/**
 * get shorter
 * @param tag tagName
 * @param data require data
 */
function assignComponent(tag, data) {
  Vue.component(tag, data.default || data)
}