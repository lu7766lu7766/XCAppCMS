<template>
  <div id="content" class="content">

    <slot name="header"></slot>

    <!-- begin panel -->
    <div class="panel panel-inverse" style="clear:both;">
      <div class="panel-heading">
        <h5 class="m-b-0">{{ currentNode ? currentNode.display_name : title }}</h5>
      </div>
      <div class="panel-body p-t-30 p-b-30">

        <slot></slot>

      </div>
    </div>

    <slot name="detail"></slot>

  </div>
</template>

<script>
  import { NodeType } from 'module/node'

  export default {
    props: {
      title: {
        type: String,
        default: '列表'
      }
    },
    computed: {
      currentNode() {
        return this.$store.getters[NodeType.currentNode]
      }
    }
  }
</script>
