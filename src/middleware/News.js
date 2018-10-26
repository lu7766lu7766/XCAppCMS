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
        data.cover_image = _.find(data.used, x => x.file_used[0].cover == 'Y')
        data.publish_time *= 1000
        data.topic_id = _.map(data.app_management, 'id')
      })
    }
  }
}