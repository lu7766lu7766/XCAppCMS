<template>
  <li :class="{
      active: routeName == getRouteByCode(node.code).name,
      'has-sub': hasSubRoute(getRouteByCode(node.code))
    }">

    <router-link v-if="!hasSubRoute(getRouteByCode(node.code))" :to="getRouteByCode(node.code)">
      <i v-if="MenuCodeRouteNameMap[node.code]" :class="MenuCodeRouteNameMap[node.code].icon" />
      <span>{{ node.display_name }}</span>
    </router-link>
    <a href="javascript:;" v-else>
      <b class="caret"></b>
      <i v-if="MenuCodeRouteNameMap[node.code]" :class="MenuCodeRouteNameMap[node.code].icon" />
      <span>{{ node.display_name }}</span>
    </a>

    <ul class="sub-menu" v-if="node.children">
      <j-menu v-for="(subNode, index) in node.children" :key="index" :node="subNode" :level="level+1" />
    </ul>

  </li>
</template>

<script>
  import MenuMixins from 'mixins/common/Menu'

  export default {
    mixins: [MenuMixins],
    components: {
      JMenu: require('@/shared/Menu1').default
    }
  }
</script>
