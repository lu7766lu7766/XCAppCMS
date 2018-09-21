<template>
  <li :class="{
      active: routeName == CodeMap[node.code].name,
      'has-sub': hasSubRoute(CodeMap[node.code])
    }">

    <router-link v-if="!hasSubRoute(CodeMap[node.code])" :to="CodeMap[node.code]">
      <span>{{ node.display_name }}</span>
    </router-link>
    <a href="javascript:;" v-else>
      <b class="caret"></b>
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
