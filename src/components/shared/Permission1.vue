<template>
  <li class="jstree-leaf">
    <div>
      <span>
        <i v-if="MenuCodeRouteNameMap[roleNode.code]" :class="MenuCodeRouteNameMap[roleNode.code].icon" />
        <i v-if="level > 0" class="fa fa-angle-right" />
        {{ roleNode.display_name }}
      </span>
      <crud :rolePermission.sync="roleNode.permission[0].permission" />
    </div>
    <ul v-if="roleNode.children" class="limit-sub">
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