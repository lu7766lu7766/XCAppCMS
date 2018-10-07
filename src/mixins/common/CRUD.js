import { mapGetters } from 'vuex'
import { NodeType } from 'module/node'

export default {
  computed: {
    ...mapGetters({
      currentNode: NodeType.currentNode,
      currentCreate: NodeType.currentCreate,
      currentRead: NodeType.currentRead,
      currentUpdate: NodeType.currentUpdate,
      currentDelete: NodeType.currentDelete
    })
  }
}

