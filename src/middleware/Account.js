export default {
  handle: async function (next)
  {
    next()
    var res = this.res
    if (res.success)
    {
      res.data.account_list = _.map(res.data.account_list, data =>
      {
        data.checked = false
        data.password = data.confirm_password = ''
        return data
      })
    }
  }
}