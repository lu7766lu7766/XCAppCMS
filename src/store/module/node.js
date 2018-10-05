const type = {
  // mutation
  setNodes: 'Node/setNodes',
  // action
  // 
  // getters
  menus: 'Node/menus'
}

export { type as NodeType }

export default {
  namespaced: true,
  state: {
    nodes: null
  },
  mutations: {
    setNodes(state, context) {
      state.nodes = context
    }
  },
  actions: {},
  getters: {
    menus: state => state.nodes
      ? proccessSubNode(state.nodes, getChildren(state.nodes))
      : []
  }
}

export var proccessSubNode = (allNodes, nodes) =>
{
  _.forEach(nodes, node =>
  {
    var children = getChildren(allNodes, node.id)
    if (children.length)
    {
      node.children = children
      proccessSubNode(allNodes, children)
    }
  })
  return nodes
}
export var getChildren = (allNodes, id = null) => _.filter(allNodes, {parent_id: id, display: 'Y'})