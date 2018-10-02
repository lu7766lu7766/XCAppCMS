export default {
  handle: (res, next) =>
  {
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
    next()
  }
}