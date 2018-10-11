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
        _.forEach(data.app_management, (app, i) =>
        {
          data.app_management[i] = _.pick(app, ['id', 'name'])
        })
      })
    }
  }
}