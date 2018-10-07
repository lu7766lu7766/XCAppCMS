<template>
  <button type="button"
          class="btn btn-sm btn-default  m-r-5 m-b-5"
          v-if="currentRead"
          @click="$emit('click')">
    搜索
  </button>
</template>

<script>
  import CRUDMixins from 'mixins/common/CRUD'

  export default {
    mixins: [CRUDMixins]
  }
</script>
