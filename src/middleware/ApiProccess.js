import { SuccessCodes, UnLoginCode } from 'src/config/api'
import store from 'src/store'
import { LoginType } from 'src/store/module/login'

export default {
  handle: (res, next) =>
  {
    next()
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
  }
}

// console.log(roopParse({a: ['a']}))

function roopParse(val) {
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