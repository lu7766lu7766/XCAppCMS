<template>

  <b-modal id="modalPermission" size="lg" ok-title="储存" cancel-title="取消" @ok="ok">

    <div slot="modal-header">
      <h5 class="modal-title">權限</h5>
    </div>

    <form class="form-horizontal form-bordered form-editor">

      <div class="jstree-default">
        <ul class="limit-main">
          <j-permission v-for="(node, index) in roleMenus" :key="index" :roleNode="node" />
          <!--:menuNode="node"-->
        </ul>
      </div>
    </form>

  </b-modal>
</template>

<script>
  import { NodeType } from 'module/node'

  export default {
    props: {
      roleMenus: {
        type: Array,
        required: true
      }
    },
    components: {
      JPermission: require('@/shared/Permission1').default
    },
    methods: {
      ok() {
        this.$emit('putRoleNodes')
      }
    },
    computed: {
      menus() {
        return this.$store.getters[NodeType.menus]
      }
    }
  }
</script>

<style lang="stylus">
  .limit
    &-main, &-sub
      margin 0
      padding 0
      list-style: none
      li
        cursor: pointer
        position: relative
        div
          padding: 3px
          margin-right 0
          &:hover
            background-color: #cad0d2
        span
          display: inline-block
          vertical-align: middle
          .form-check
            input.form-check-input
              margin-left 3px
            label
              font-weight: normal
          &:first-child
            width: 130px
    &-sub
      li
        margin-bottom: 0
        padding-left: 30px
        background-position: -292px -4px
        background-repeat: repeat-y
        background-image: url(/resource/plugins/jstree/dist/themes/default/32px.png)
        > div
          padding: 0 3px
        &::before
          content: ""
          display: inline-block
          width: 24px
          height: 24px
          background-position: -75px -6px
          background-image: url(/resource/plugins/jstree/dist/themes/default/32px.png)
          position: absolute
          left: 7px
        &:last-child
          &::after
            content: ""
            display: block
            width: 4px
            height: 12px
            background-color: #fff
            position: absolute
            left: 10px
            bottom: 0
        span
          &:first-child
            width: 100px
</style>
