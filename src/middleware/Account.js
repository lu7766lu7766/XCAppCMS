export default {
  handle: async function (next)
  {
    next()
    var res = this.res
    if (res.success)
    {
      res.data.account_list = _.mapValues(res.data.account_list, data =>
      {
        return {
          checked: false,
          password: '',
          confirm_password: '',
          ...data
        }
      })
    }
  }
}