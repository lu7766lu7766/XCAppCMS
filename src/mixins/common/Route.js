import routes from 'src/router/routes'

export default {
  methods: {
    getTargetRoute(route) {
      var targetRoute = routes
      _.forEach(this.$router.match(route).matched, (route, level) => {
        targetRoute = _.find(!level ? targetRoute : targetRoute.children, { path: route.path.replace(/^\//, '') })
      })
      return targetRoute
    },
    hasSubRoute(route) {
      var targetRoute = this.getTargetRoute(route)
      return !!(targetRoute && targetRoute.children)
    }
  }
}