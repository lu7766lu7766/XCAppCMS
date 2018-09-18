var env = require('src/../env')
module.exports = {
	isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
	apiHost: `//${location.host}${env.host[env.target].api.postfix}`,
}
