<template>

  <b-modal id="modalPermission" size="lg" ok-title="储存" cancel-title="取消">

    <div slot="modal-header">
      <h5 class="modal-title">權限</h5>
    </div>

    <form class="form-horizontal form-bordered form-editor">

      <div class="jstree-default">
        <ul>
          <j-permission v-for="(node, index) in menus" :key="index" :node="node" />
        </ul>
      </div>
    </form>

  </b-modal>
</template>

<script>
  import { NodeType } from 'module/node'

  export default {
    components: {
      JPermission: require('@/shared/Permission1').default
    },
    computed: {
      menus() {
        return this.$store.getters[NodeType.menus]
      }
    }
  }
</script>