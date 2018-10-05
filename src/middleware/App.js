export default {
  handle: function (next)
  {
    next()
    var res = this.res
    if (res.success)
    {
      res.data = _.map(res.data, data =>
      {
        data.checked = false
        data.redirect_url = data.redirect_url || []
        return data
      })
    }
  }
}