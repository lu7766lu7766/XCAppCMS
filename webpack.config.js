var webpack = require('webpack')
var path = require('path')
var resolve = (dir) =>
{
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    modules: [resolve('src'), resolve('node_modules')],
    alias: {
      '~': resolve('node_modules'),
      src: resolve('src'),
      lib: resolve('src/lib'),
      mixins: resolve('src/mixins'),
      module: resolve('src/store/module'),
      resource: resolve('resource'),
      '@': resolve('src/components'),
      'pages': resolve('src/pages'),
      config: resolve('src/config/index.build.js')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash',
      axios: 'axios',
      moment: 'moment',
      config: 'config'
    })
  ]
}