export default {
  handle: (res, next) =>
  {
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
    next()
  }
}