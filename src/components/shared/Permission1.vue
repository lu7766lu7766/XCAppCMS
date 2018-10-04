<template>
  <li class="jstree-leaf">
    <i class="jstree-icon jstree-ocl"
       v-for="l in _.range(0, level)"
       :style="{ visibility: l !== (level-1) ? 'hidden' : 'visible' }"></i>
    {{ node.display_name }}
    <crud v-if="node.permission" :permission.sync="node.permission[0].permission" @click.prevent />
    <ul v-if="node.children">
      <j-permission v-for="(subNode, index) in node.children" :key="index" :node="subNode" :level="level+1" />
    </ul>
  </li>
</template>

<script>
  import PermisiionMixins from 'mixins/common/Permission'

  export default {
    mixins: [PermisiionMixins],
    components: {
      JPermission: require('@/shared/Permission2').default
    }
  }
</script>