<template>
  <list-container title="个人设定">
    <template slot="header">
      <custom-breadcrumb :breadcrumb="[{name:'edit-profile', display_name:'个人设定'}]" />
    </template>

    <request-result :requestResult="requestResult" />

    <div slot="modal-header">
      <h5 class="modal-title">编辑</h5>
    </div>

    <form class="form-horizontal">

      <div class="form-group row">
        <label class="col-md-2 col-form-label">暱稱</label>
        <div class="col-md-4">
          <div class="input-group date">
            <input type="text" class="form-control" @keyup.13="put()" v-model="data.display_name" />
          </div>
        </div>

      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">原密码</label>
        <div class="col-md-4">
          <div class="input-group date">
            <input type="password" class="form-control" @keyup.13="put()" v-model="data.old_password" />
          </div>
        </div>
        <div class="col-md-4 form-txt text-danger">若不修改密码, 请保留空白</div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">新密码</label>
        <div class="col-md-4">
          <div class="input-group date">
            <input type="password" class="form-control" @keyup.13="put()" v-model="data.password" />
          </div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">新密码确认</label>
        <div class="col-md-4">
          <div class="input-group date">
            <input type="password" class="form-control" @keyup.13="put()" v-model="data.confirm_password" />
          </div>
        </div>
      </div>

      <div class="form-group m-t-30">
        <button type="button" class="btn btn-warning width-70 m-r-5" @click="put()">储存</button>
      </div>

    </form>

  </list-container>
</template>

<script>
  import RequestResultMixins from 'mixins/common/RequestResult'
  import IndexMixins from 'mixins/common/Index'

  export default {
    mixins: [RequestResultMixins, IndexMixins],
    data: () => ({
      data: {
        display_name: '',
        old_password: '',
        password: '',
        confirm_password: ''
      }
    }),
    methods: {
      dataInit() {
        this.data.display_name = this.account.display_name
      },
      async put() {
        var res = await this.$callApi('putAccount', Object.assign({}, this.data))
        this.requestResult = this.getRequestResult(res.success, '更新')
        this.getAccount()
      }
    },
    computed: {
      account() {
        return this.$store.state.Login.account
      }
    },
    mounted() {
      this.dataInit()
    }
  }
</script>
