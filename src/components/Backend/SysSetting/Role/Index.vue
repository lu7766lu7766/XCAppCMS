<template>
  <list-container>

    <template slot="detail">
      <detail :data.sync="data"
              :RoleEnableConf="RoleEnableConf"
              @post="post"
              @put="put"
              :method="method" />
      <permission :roleMenus="roleMenus" @putRoleNodes="putRoleNodes" />
    </template>

    <request-result :requestResult="requestResult" />

    <div class="row form-group">
      <div class="col-md-12">
        <create-btn @click="setData()"></create-btn>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover table-box text-center">
        <thead>
        <tr>
          <th class="width-30">#</th>
          <th>角色名称</th>
          <th class="width-100">状态</th>
          <th class="width-200">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(d, index) in datas" :key="index">
          <td>{{ d.id }}</td>
          <td>{{ d.display_name }}</td>
          <td>
            <i v-if="d.enable == 'Y'" class="ion-checkmark fa-lg fa-fw text-green"></i>
            <i v-else-if="d.enable == 'N'" class="ion-close-round fa-lg fa-fw text-danger"></i>
          </td>
          <td class="action">
            <permission-btn @click="getRoleNodes(d.id)"></permission-btn>
            <update-btn v-if="d.can_edit === 'Y'" @click="setData(d)"></update-btn>
            <delete-btn v-if="d.can_edit === 'Y'" @click="deleteData('deleteRole', d)"></delete-btn>
          </td>
        </tr>

        </tbody>
      </table>
    </div>

    <paginate :page="paginate.page" :lastPage="lastPage" @pageChange="pageChange" />

  </list-container>
</template>

<script>
  import ListMixins from 'mixins/common/List'
  import IndexMixins from 'mixins/common/Index'
  import { getChildren, proccessSubNode } from 'src/store/module/node'

  export default {
    mixins: [ListMixins, IndexMixins],
    components: {
      detail: require('./Detail').default,
      permission: require('./Permission').default
    },
    data: () => ({
      RoleEnableConf: {
        Y: '开启',
        N: '关闭'
      },
      model: {
        display_name: '',
        enable: 'N'
      },
      roleID: null,
      roleNodes: []
    }),
    methods: {
      async mGetList() {
        var res = await this.getList('getRoleList')
        if (res.success)
        {
          this.datas = res.data
        }
      },
      async mGetTotal() {
        var res = await this.getTotal('getRoleTotal')
        if (res.success)
        {
          this.paginate.total = res.data
        }
      },
      post() {
        this.mRequestProccess('postRole')
      },
      put() {
        this.mRequestProccess('postRole')
      },
      async mRequestProccess(key) {
        const data = this.data
        return await this.requestProccess(key, {
          id: data.id,
          name: data.display_name,
          enable: data.enable
        })
      },
      async getRoleNodes(id) {
        var res = await this.$callApi('getRoleNodes', {id})
        res.success && (this.roleID = id) && (this.roleNodes = res.data)
      },

      // permission
      async putRoleNodes() {
        var res = await this.$callApi('putRoleNodes', {id: this.roleID, nodes: this.putData})
        this.requestResult = this.getRequestResult(res.success, '更新')
        res.success && this.getMyNodes()
      }
    },
    computed: {
      roleMenus() {
        return this.roleNodes.length
          ? proccessSubNode(this.roleNodes, getChildren(this.roleNodes))
          : []
      },
      putData() {
        return _.map(this.roleNodes, node => ({id: node.id, permission: node.permission[0].permission}))
      }
    }
  }
</script>