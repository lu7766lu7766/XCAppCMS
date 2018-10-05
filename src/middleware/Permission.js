export default {
  handle: function (next)
  {
    next()
    var res = this.res
    if (res.success)
    {
      _.forEach(res.data, data =>
      {
        data.permission = !!data.permission.length
          ? data.permission
          : [{permission: 0}]
      })
    }
  }
}