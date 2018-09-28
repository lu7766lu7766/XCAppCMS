var _ = require('lodash')

var baseConfig = require('./index.base').default
var devConfig = require('./index.dev')
var devMobileConfig = require('./index.dev.mobile')
var prodConfig = require('./index.prod')
// iphone safari 手機版debug模式
var isDevMobile = (location.hostname.indexOf('192.168') > -1 || location.hostname.indexOf('.local') > -1) && baseConfig.isMobile

/**
 * process.env.NODE_ENV 代表環境 
 * production 為打包出去, development 為本地測試
 */
var config = _.merge(
	baseConfig,
	process.env.NODE_ENV === 'production' ? prodConfig : !isDevMobile ? devConfig : devMobileConfig,
	{
		env: process.env.NODE_ENV
	}
)

module.exports = config
