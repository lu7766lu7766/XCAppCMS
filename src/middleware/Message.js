export default {
  handle: function (next)
  {
    next()
    var res = this.res
    if (res.success)
    {
      _.forEach(res.data, data =>
      {
        data.checked = false
        _.forEach(data.app_managements, (app, i) =>
        {
          data.app_managements[i] = _.omit(app, 'pivot')
        })
      })
    }
  }
}