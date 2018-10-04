<template>
  <container>

    <template slot="header">

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
      </div>
    </template>

    <i class="fas fa-copy fa-2x" @click="copyToken()" data-toggle="tooltip" data-placement="top" title="复制令牌"></i>
    <div v-if="name">
      <label>Name: </label>{{ name }}
    </div>
    <div v-if="token">
      <label>Token: </label>
      <span ref="copyTarget">{{ token }}</span>
    </div>

  </container>
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
