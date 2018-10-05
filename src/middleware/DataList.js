export default {
  handle: function (next)
  {
    next()
    var res = this.res
    if (res.success)
    {
      res.data = _.mapValues(res.data, data =>
      {
        return {
          checked: false,
          ...data
        }
      })
    }
  }
}