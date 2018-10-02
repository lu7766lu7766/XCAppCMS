export default {
  handle: (res, next) =>
  {
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
    next()
  }
}