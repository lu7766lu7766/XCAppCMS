<template>
  <li class="jstree-leaf">
    <i class="jstree-icon jstree-ocl"
       v-for="l in _.range(0, level)"
       :style="{ visibility: l !== (level-1) ? 'hidden' : 'visible' }"></i>
    {{ roleNode.display_name }}
    <crud :rolePermission.sync="roleNode.permission[0].permission" />
    <!--:myPermission.sync="menuNode.permission[0].permission"-->
    <ul v-if="roleNode.children">
      <j-permission v-for="(subNode, index) in roleNode.children"
                    :key="index"
                    :roleNode="subNode"
                    :level="level+1" />
      <!--:menuNode="subNode"-->
    </ul>
  </li>
</template>

<script>
  import PermisiionMixins from 'mixins/common/Permission'

  export default {
    mixins: [PermisiionMixins],
    components: {
      JPermission: require('@/shared/Permission1').default
    }
  }
</script>