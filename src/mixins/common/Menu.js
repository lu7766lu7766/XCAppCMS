import MenuCodeRouteNameMap from 'src/config/MenuCodeRouteNameMap'
import routes from 'src/router/routes'

export default {
  props: {
    node: {
      required: true,
      type: Object
    },
    level: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    CodeMap: MenuCodeRouteNameMap
  }),
  computed: {
    routeName() {
      return this.$route.matched[this.level] ? this.$route.matched[this.level].name : ''
    }
  },
  methods: {
    hasSubRoute(route) {
      var targetRoute = routes
      _.forEach(this.$router.match(route).matched, (route, level) => {
        targetRoute = _.find(!level ? targetRoute : targetRoute.children, { path: route.path.replace(/^\//, '') })
        // console.log(level, route.path, targetRoute)
      })
      return !!(targetRoute && targetRoute.children)
    }
  }
}