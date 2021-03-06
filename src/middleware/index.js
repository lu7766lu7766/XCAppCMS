export const mapping = {
  'dataList': require('./DataList'),
  'account': require('./Account'),
  'message': require('./Message'),
  'app': require('./App'),
  'permission': require('./Permission'),
  'webLink': require('./WebLink'),
  'news': require('./News')
}

class Middleware
{
  use(fn) {
    this.go = (stack => next => stack(fn.bind(this, next.bind(this))))(this.go)
  }

  go = next => next()
}

export default Middleware