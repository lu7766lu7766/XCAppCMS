var webpack = require("webpack")
var path = require('path')

var resolve = (dir) => {
  return path.join(__dirname, dir)
}

var env = require(resolve('env.json'))
// var apiHost = env.host[env.target].api.protocol + env.host[env.target].api.host

// 設定請參考 https://github.com/vuejs/vue-cli/tree/dev/docs/config
module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  lintOnSave: true,
  assetsDir: 'static',
  // compiler: true,
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: () => { },
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      modules: [resolve('src'), resolve('node_modules')],
      alias: {
        '~': resolve('node_modules'),
        src: resolve('src'),
        lib: resolve('src/lib'),
        mixins: resolve('src/mixins'),
        module: resolve('src/store/module'),
        interface: resolve('src/interface'),
        resource: resolve('resource'),
        '@': resolve('src/components'),
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
  },
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8088,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    // proxy:
    // {
    //   [env.host[env.target].api.postfix]: { //'/api'
    //     target: apiHost,
    //     changeOrigin: true,
    //     pathRewrite: { [`^${env.host[env.target].api.postfix}`]: '' },
    //     // logLevel: 'debug'
    //   }
    // }, // string | Object
    before: app => {
      // 加入靜態資源
      var express = require('express') // vue-cli-service 自帶 express
      app.use('/resource', express.static(resolve('resource')))
      app.use('/static', express.static(resolve('static')))
    }
  }
}