<template>
  <li class="jstree-leaf">
    <div>
      <span>
         <i class="jstree-icon jstree-ocl"
            v-for="l in _.range(0, level)"
            :style="{ visibility: l !== (level-1) ? 'hidden' : 'visible' }"></i>
        {{ roleNode.display_name }}
      </span>
      <crud :rolePermission.sync="roleNode.permission[0].permission" />
    </div>
    <ul v-if="roleNode.children">
      <j-permission v-for="(subNode, index) in roleNode.children"
                    :key="index"
                    :roleNode="subNode"
                    :level="level+1" />
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