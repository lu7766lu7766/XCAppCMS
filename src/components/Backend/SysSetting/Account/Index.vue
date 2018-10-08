<template>
  <container title='帐号管理'>

    <template slot="header">
      <ol class="breadcrumb pull-right p-0">
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
    </template>

    <template slot="detail">
      <detail :data.sync="data"
              :status="status"
              :roles="roles"
              @post="post"
              @put="put"
              :method="method" />
    </template>

    <request-result :requestResult="requestResult" />

    <div class="row m-b-20">
      <div class="col-sm-3">
        <create-btn @click="setData()"></create-btn>
        <delete-btn @click="mDeleteDatas()"></delete-btn>
      </div>
      <div class="col-sm-9 form-inline justify-content-end panel-search">
        <div class="form-group width-100 m-r-10">

          <select class="form-control"
                  v-model="seachData.role_id">
            <option value="">全部</option>
            <option v-for="(role_id, name) in roles"
                    :key="role_id"
                    :value="role_id">
              {{ name }}
            </option>
          </select>
        </div>
        <div class="form-group m-r-10">

          <input type="text"
                 class="form-control"
                 placeholder="关键字"
                 v-model="seachData.account"
                 @keyup.13="getSearchData()" />
        </div>
        <search-btn @click="getSearchData()"></search-btn>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover table-box text-center">
        <thead>
        <tr>
          <th class="width-30">
            <div class="checkbox check-box">
              <input type="checkbox" id="checkbox_all" v-model="isAllChecked">
              <label for="checkbox_all" class="m-b-0">&nbsp;</label>
            </div>
          </th>
          <th class="width-30">#</th>
          <th>帐号</th>
          <th>暱称</th>
          <th>角色名称</th>
          <th class="width-100">状态</th>
          <th>最后登入IP</th>
          <th class="width-100">操作</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(d, index) in datas" :key="index">
          <td>
            <div class="checkbox check-box">
              <input type="checkbox" :id="'checkbox_'+d.id" v-model="d.checked">
              <label :for="'checkbox_'+d.id" class="m-b-0">&nbsp;</label>
            </div>
          </td>
          <td>{{ d.id }}</td>
          <td>{{ d.account }}</td>
          <td>{{ d.display_name }}</td>
          <td>{{ _.map(d.roles, 'display_name').join(', ') }}</td>
          <td>
            <i v-if="d.status == 'enable'"
               class="ion-checkmark fa-lg fa-fw text-green"></i>
            <i v-else-if="d.status == 'disable'"
               class="ion-close-round fa-lg fa-fw text-danger"></i>
          </td>
          <td>{{ d.login_ip }}</td>
          <td class="action">
            <update-btn @click="setData(d)"></update-btn>
          </td>
        </tr>

        </tbody>
      </table>
    </div>

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
        status: 'enable'
      },
      roles: {},
      status: {},
      seachData: {
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
      async mGetTotal() {
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