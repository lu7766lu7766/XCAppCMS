<template>
  <button type="button"
          class="btn btn-warning text-white"
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
