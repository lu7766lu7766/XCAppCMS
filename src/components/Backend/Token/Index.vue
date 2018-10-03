<template>
  <div id="content" class="content">
    <ol class="breadcrumb pull-right">
      <li class="breadcrumb-item active">
        <router-link :to="{
            name: 'person-token-generate'
          }">
          个人令牌申请
        </router-link>
      </li>
    </ol>
    <h1 class="page-header">个人令牌申请</h1>

    <div class="row form-group">
      <div class="col-md-3">

        <div class="form-inline input-group mb-3">
          <input type="text" class="form-control" placeholder="Token description" v-model="description" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="getToken()">
              产生
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-8"
           style="text-align: right;">
      </div>
    </div>

    <div class="panel panel-inverse">
      <div class="panel-heading">
        <div class="panel-heading-btn">
          <a href="javascript:;"
             class="btn btn-xs btn-icon btn-circle btn-default"
             data-click="panel-expand">
            <i class="fa fa-expand"></i>
          </a>
          <a href="javascript:;"
             class="btn btn-xs btn-icon btn-circle btn-warning"
             data-click="panel-collapse">
            <i class="fa fa-minus"></i>
          </a>
        </div>
        <h4 class="panel-title">列表</h4>
      </div>
      <div class="panel-body">
        <i class="fas fa-copy fa-2x" @click="copyToken()" data-toggle="tooltip" data-placement="top" title="复制令牌"></i>
        <div v-if="name">
          <label>Name: </label>{{ name }}
        </div>
        <div v-if="token">
          <label>Token: </label>
          <span ref="copyTarget">{{ token }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import 'bootstrap/js/src/tooltip'

  export default {
    data: () => ({
      token: '',
      name: '',
      description: ''
    }),
    methods: {
      async getToken() {
        var res = await this.$callApi('persionTokenGenerate', {
          description: this.description
        })
        if (res.success)
        {
          this.name = res.data.name
          this.token = res.data.token
        }
      },
      copyToken() {
        this.$copy(this.$refs['copyTarget'])
      }
    },
    mounted() {
      $('[data-toggle="tooltip"]').tooltip()
    }
  }
</script>
