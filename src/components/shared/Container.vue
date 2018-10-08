<template>
  <div id="content" class="content">

    <slot name="header"></slot>

    <!-- begin panel -->
    <div class="panel panel-inverse" style="clear:both;">
      <div class="panel-heading">
        <h5 class="m-b-0">{{ title }}</h5>
      </div>
      <div class="panel-body p-t-30 p-b-30">

        <slot></slot>

      </div>
    </div>

    <slot name="detail"></slot>

  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '列表'
      }
    }
  }
</script>
