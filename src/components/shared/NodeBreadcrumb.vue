<template>
  <ol class="breadcrumb pull-right p-0">
    <li class="breadcrumb-item">
      <router-link :to="{ name: 'welcome' }">首页</router-link>
    </li>
    <li class="breadcrumb-item"
        v-for="(node, index) in breadcrumb"
        :key="index"
        :class="index === (breadcrumb.length - 1) ? 'active' : ''">
      <a v-if="index !== (breadcrumb.length - 1)">{{ node.display_name }}</a>
      <router-link v-else-if="MenuCodeRouteNameMap[node.code]" :to="MenuCodeRouteNameMap[node.code]">
        {{ node.display_name }}
      </router-link>
    </li>
  </ol>
</template>

<script>
  import { NodeType } from 'module/node'
  import MenuCodeRouteNameMap from 'src/config/MenuCodeRouteNameMap'

  export default {
    data: () => ({
      MenuCodeRouteNameMap
    }),
    computed: {
      nodes() {
        return this.$store.state.Node.nodes
      },
      currentNode() {
        return this.$store.getters[NodeType.currentNode]
      },
      breadcrumb() {
        var res = [_.cloneDeep(this.currentNode)]
        let id = this.currentNode.parent_id
        while (id)
        {
          let tmp = _.find(this.nodes, {id})
          id = tmp.parent_id
          res.unshift(tmp)
        }
        return res
      }
    }
  }
</script>
