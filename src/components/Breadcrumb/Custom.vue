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
      <router-link :to="node">
        {{ node.display_name }}
      </router-link>
    </li>
  </ol>
</template>

<script>
  export default {
    props: {
      breadcrumb: {
        type: Array,
        required: true
      }
    }
  }
</script>
