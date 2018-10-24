<template>
  <button type="button"
          class="btn btn-danger"
          v-if="currentDelete"
          @click="$emit('click')">
    删除
  </button>
</template>

<script>
  import CRUDMixins from 'mixins/common/CRUD'

  export default {
    mixins: [CRUDMixins]
  }
</script>
