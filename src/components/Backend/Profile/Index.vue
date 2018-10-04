<template>
  <container>
    <template slot="header">

      <h1 class="page-header">个人设定</h1>

      <request-result :requestResult="requestResult" />

    </template>

    <div slot="modal-header">
      <h5 class="modal-title">编辑</h5>
    </div>

    <form class="form-horizontal form-bordered form-editor">

      <div class="form-group row">
        <label class="col-md-2 col-form-label">暱稱</label>
        <div class="col-md-10">
          <div class="input-group date">
            <input type="text" class="form-control" @keyup.13="put()" v-model="data.display_name" />
          </div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">原密码</label>
        <div class="col-md-10">
          <div class="input-group date">
            <input type="password" class="form-control" @keyup.13="put()" v-model="data.old_password" />
          </div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">新密码</label>
        <div class="col-md-10">
          <div class="input-group date">
            <input type="password" class="form-control" @keyup.13="put()" v-model="data.password" />
          </div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">新密码确认</label>
        <div class="col-md-10">
          <div class="input-group date">
            <input type="password" class="form-control" @keyup.13="put()" v-model="data.confirm_password" />
          </div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label"></label>
        <div class="col-md-10">
          <div class="input-group">
            <button type="button" class="btn btn-sm btn-primary m-r-5 m-b-5" @click="put()">储存</button>
          </div>
        </div>
      </div>

    </form>

  </container>
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
