export default {
  handle: (res, next) =>
  {
    if (res.success)
    {
      res.data = _.map(res.data, data =>
      {
        data.checked = false
        data.redirect_url = data.redirect_url || []
        return data
      })
    }
    next()
  }
}