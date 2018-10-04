<template>
  <container>

    <template slot="header">
      <ol class="breadcrumb pull-right">
        <li class="breadcrumb-item">
          <a href="javascript:;">系统设定</a>
        </li>
        <li class="breadcrumb-item active">
          <router-link :to="{
            name: 'account-list'
          }">
            帐号管理
          </router-link>
        </li>
      </ol>
      <h1 class="page-header">帐号管理</h1>

      <request-result :requestResult="requestResult" />

      <div class="row form-group">
        <div class="col-md-6">
          <button class="btn btn-sm btn-primary m-r-5 m-b-5"
                  v-b-modal.modalDetail
                  @click="setData()">
            新增
          </button>
          <button class="btn btn-sm btn-danger m-r-5 m-b-5"
                  @click="mDeleteDatas()">
            删除
          </button>
        </div>
        <div class="col-md-6"
             style="text-align: right;">
          <div class="form-inline"
               style="display: block;">
            <select class="form-control"
                    v-model="body.role_id">
              <option value="">全部</option>
              <option v-for="(role_id, name) in roles"
                      :key="role_id"
                      :value="role_id">
                {{ name }}
              </option>
            </select>
            <input type="text" class="form-control" placeholder="关键字" v-model="body.account" @keyup.13="mGetList()" />
            <button type="button"
                    class="btn btn-sm btn-default"
                    @click="mGetList()">
              搜索
            </button>
          </div>
        </div>
      </div>
    </template>

    <template slot="detail">
      <detail :data.sync="data"
              :status="status"
              :roles="roles"
              @post="post"
              @put="put"
              :method="method" />
    </template>

    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th class="with-checkbox"
            width=100>
          <div class="checkbox checkbox-css">
            <input type="checkbox" id="checkbox_all" v-model="isAllChecked">
            <label for="checkbox_all">&nbsp;</label>
          </div>
        </th>
        <th class="index">#</th>
        <th>帐号</th>
        <th>暱称</th>
        <th>角色名称</th>
        <th>状态</th>
        <th>最后登入IP</th>
        <th class="action">操作</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(d, index) in datas" :key="index">
        <td class="with-checkbox">
          <div class="checkbox checkbox-css">
            <input type="checkbox" :id="'checkbox_'+d.id" v-model="d.checked">
            <label :for="'checkbox_'+d.id">&nbsp;</label>
          </div>
        </td>
        <td>{{ d.id }}</td>
        <td>{{ d.account }}</td>
        <td>{{ d.display_name }}</td>
        <td>{{ _.map(d.roles, 'display_name').join(', ') }}</td>
        <td>
          <i v-if="d.status == 'enable'"
             class="ion-checkmark fa-lg fa-fw pull-left m-r-10"></i>
          <i v-else-if="d.status == 'disable'"
             class="ion-close-round fa-lg fa-fw pull-left m-r-10"></i>
        </td>
        <td>{{ d.login_ip }}</td>
        <td class="action">
          <button class="btn btn-sm btn-info m-r-5 m-b-5"
                  v-b-modal.modalDetail
                  @click="setData(d)">
            编辑
          </button>
        </td>
      </tr>

      </tbody>
    </table>

    <paginate :page="paginate.page" :lastPage="lastPage" @pageChange="pageChange" />

  </container>
</template>

<script>
  import ListMixins from 'mixins/common/List'

  export default {
    mixins: [ListMixins],
    components: {
      detail: require('./Detail.vue').default
    },
    data: () => ({
      model: {
        account: '',
        password: '',
        confirm_password: '',
        display_name: '',
        roles: [],
        status: 'disable'
      },
      roles: {},
      status: {},
      body: {
        account: '',
        role_id: ''
      }
    }),
    methods: {
      async mGetList() {
        var res = await this.getList('getMemberList')
        if (res.success)
        {
          this.datas = res.data.account_list
          this.roles = res.data.role_menu
          this.status = res.data.status_menu
        }
      },
      async mGetToal() {
        var res = await this.getTotal('getMemberTotal')
        if (res.success)
        {
          this.paginate.total = res.data.total
        }
      },
      post() {
        this.mRequestProccess('postMember')
      },
      put() {
        this.mRequestProccess('putMember')
      },
      async mRequestProccess(key) {
        const data = this.data
        return await this.requestProccess(key, {
          id: data.id,
          account: data.account,
          password: data.password,
          confirm_password: data.confirm_password,
          display_name: data.display_name,
          role_id: _.map(data.roles, 'id'),
          status: data.status
        })
      },
      mDeleteDatas() {
        this.deleteDatas('deleteMemberList')
      }
    }
  }
</script>