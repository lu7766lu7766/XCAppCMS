export default {
  props: {
    node: {
      required: true,
      type: Object
    },
    level: {
      type: Number,
      default: 0
    }
  },
  components: {
    crud: require('@/shared/CRUD').default
  },
  computed: {
    nodes() {
      return this.$store.state.Node.nodes
    }
  },
  created() {
    this.$watch(() => this.node.permission[0].permission, (newValue, oldValue) =>
    {
      this.node.children &&
      changeChildrenPermission(this.node.children, newValue - oldValue)

      // this.node.parent_id &&
      // changeParentPermission(_.find(this.nodes, {id: this.node.parent_id}), newValue - oldValue)
    })
  }
}

// function changeParentPermission(node, changeValue) {
//   if (changeValue > 0 && !(node.permission[0].permission & changeValue))
//   {
//     node.permission[0].permission += changeValue
//   }
//   node.parent_id &&
//   changeParentPermission(_.find(this.nodes, {id: node.parent_id}), changeValue)
// }

function changeChildrenPermission(nodes, changeValue) {
  _.forEach(nodes, node =>
  {
    if (
      (changeValue > 0 && !(node.permission[0].permission & changeValue)) ||
      (changeValue < 0 && !!(node.permission[0].permission & Math.abs(changeValue)))
    )
    {
      node.permission[0].permission += changeValue
    }
    node.children &&
    changeChildrenPermission(node.children, changeValue)
  })
}