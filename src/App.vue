<template>
  <router-view/>
</template>

<script>
export default {
	metaInfo: {
		link: [
			// { rel: 'favicon', href: 'favicon.ico' },
			{ rel: 'stylesheet', href: 'http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' },
			{ rel: 'stylesheet', href: '/resource/plugins/jquery-ui/jquery-ui.min.css' },
			// { rel: 'stylesheet', href: '/resource/plugins/bootstrap/4.1.0/css/bootstrap.min.css' },
			{ rel: 'stylesheet', href: '/resource/plugins/font-awesome/5.0/css/fontawesome-all.min.css' },
			{ rel: 'stylesheet', href: '/resource/plugins/animate/animate.min.css' },
			{ rel: 'stylesheet', href: '/resource/css/material/style.min.css' },
			{ rel: 'stylesheet', href: '/resource/css/material/style-responsive.min.css' },
			{ rel: 'stylesheet', href: '/resource/css/material/theme/default.css' }
		]
	}
}
</script>

<style lang="stylus">
@import '/resource/plugins/bootstrap/4.1.0/css/bootstrap.min.css'
</style>
