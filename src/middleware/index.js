export const mapping = {
  'api': require('./ApiProccess'),
  'dataList': require('./DataListPreproccess'),
  'account': require('./AccountPreproccess'),
  'message': require('./MessagePreproccess'),
  'app': require('./AppPreproccess')
}

class Middleware
{
  fns = []

  callback(ctx) {
    // console.log(ctx)
  }

  use(fn) {
    if (typeof fn === 'function')
    {
      this.fns.push(fn)
    }
    else if (typeof fn === 'string')
    {
      let instance = mapping[fn].default || mapping[fn]
      if (typeof instance.handle === 'function')
      {
        this.fns.push(instance.handle)
      }
      else
      {
        throw `${fn} desen't register handle()!`
      }
    }
  }

  go(ctx) {
    let index = 0
    const next = () =>
    {
      index++
    }
    this.fns.map(async (fn, i) =>
    {
      if (index === i) await fn(ctx, next)
    })
    index === this.fns.length && this.callback(ctx)
  }
}

export default Middleware