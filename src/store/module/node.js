import MenuCodeRouteNameMap from 'src/config/MenuCodeRouteNameMap'
import PermissionConf from 'src/config/Permission'

const type = {
  // mutation
  setNodes: 'Node/setNodes',
  // action
  // 
  // getters
  menus: 'Node/menus',
  currentNode: 'Node/currentNode',
  currentCreate: 'Node/currentCreate',
  currentRead: 'Node/currentRead',
  currentUpdate: 'Node/currentUpdate',
  currentDelete: 'Node/currentDelete'
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
      ? proccessSubNode(state.nodes, getChildren(state.nodes, null, true), true)
      : [],
    currentNode: (state, getters, rootState) =>
      _.find(state.nodes, {
        code: _.findKey(MenuCodeRouteNameMap, {name: rootState.route.name})
      }),
    currentRead: (state, getters) => getters.currentNode
      ? !!(getters.currentNode.permission[0].permission & PermissionConf.READ)
      : false,
    currentCreate: (state, getters) => getters.currentNode
      ? !!(getters.currentNode.permission[0].permission & PermissionConf.CREATE)
      : false,
    currentUpdate: (state, getters) => getters.currentNode
      ? !!(getters.currentNode.permission[0].permission & PermissionConf.UPDATE)
      : false,
    currentDelete: (state, getters) => getters.currentNode
      ? !!(getters.currentNode.permission[0].permission & PermissionConf.DELETE)
      : false
  }
}

export var proccessSubNode = (allNodes, nodes, filterRead = false) =>
{
  _.forEach(nodes, node =>
  {
    var children = getChildren(allNodes, node.id, filterRead)
    if (children.length)
    {
      node.children = children
      proccessSubNode(allNodes, children)
    }
  })
  return nodes
}
export var getChildren = (allNodes, id = null, filterRead = false) => _.filter(allNodes, node =>
{
  return node.parent_id === id
    && node.display === 'Y'
    && (!filterRead || !!(node.permission[0].permission & PermissionConf.READ))
})