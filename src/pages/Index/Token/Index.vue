<template>
  <list-container title="产生令牌">

    <div class="note note-warning col-md-12 m-b-25 get-note">
      <div class="note-icon"><i class="fa fa-info-circle"></i></div>
      <div class="note-content">
        1. 点击产生获得TOKEN<br />
        2. 产生后请自行保存<br />
        3. 若再点击产生, 则会变更TOKEN, 需使用新的TOKEN<br />
      </div>
    </div>
    <div>
      <div class="form-group row m-b-15">
        <label class="col-md-2 col-form-label">TOKEN</label>
        <div class="col-sm m-b-15 token-textarea">
          <textarea class="form-control" rows="10" ref="copyTarget">{{ token }}</textarea>
        </div>
        <div class="width-100 m-b-15 align-self-end token-btn">
          <a class="btn btn-warning width-70 m-t-5 text-white" @click="getToken()">产生</a>
          <a class="btn btn-grey width-70 m-t-5 text-white"
             @click="copyToken()"
             data-toggle="tooltip"
             data-placement="top"
             title="复制令牌">复制</a>
        </div>
      </div>
    </div>

  </list-container>
</template>

<script>
  import 'bootstrap/js/src/tooltip'

  export default {
    data: () => ({
      token: ''
    }),
    methods: {
      async getToken() {
        var res = await this.$callApi('persionTokenGenerate', {
          description: new Date().getTime()
        })
        if (res.success)
        {
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
<style lang="stylus" scoped>
  .token
    &-btn
      padding: 0 15px
      @media all and (min-width: 768px) and (max-width: 1445px)
        a
          width: 100% !important
      @media all and (max-width: 575px)
        width: 100% !important
        a
          margin-right 5px

</style>

