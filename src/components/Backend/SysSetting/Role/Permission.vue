<template>

  <b-modal id="modalPermission" size="lg" ok-title="储存" cancel-title="取消" @shown="show" @ok="ok">

    <div slot="modal-header">
      <h5 class="modal-title">權限</h5>
    </div>

    <form class="form-horizontal form-bordered form-editor">

      <div class="jstree-default">
        <ul>
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