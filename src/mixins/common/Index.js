import { LoginType } from 'module/login'
import { NodeType } from 'module/node'

export default {
  methods: {
    async getNodes() {
      var res = await this.$callApi('getNodes')
      if (res.success)
      {
        this.$store.commit(NodeType.setNodes, res.data)
      }
    },
    async getAccount() {
      var res = await this.$callApi('getAccount')
      if (res.success)
      {
        this.$store.commit(LoginType.setAccount, res.data.account_info)
      }
    }
  },
  computed: {
    menus() {
      return this.$store.getters[NodeType.menus]
    },
    account() {
      return this.$store.state.Login.account
    }
  }
}