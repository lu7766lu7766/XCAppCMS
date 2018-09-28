import RouteMixins from 'mixins/common/Route'
import MenuCodeRouteNameMap from 'src/config/MenuCodeRouteNameMap'

export default {
  mixins: [RouteMixins],
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
  computed: {
    routeName() {
      return this.$route.matched[this.level] ? this.$route.matched[this.level].name : ''
    }
  },
  methods: {
    getRouteByCode(code) {
      return MenuCodeRouteNameMap[code] || { name: '' }
    }
  }
}