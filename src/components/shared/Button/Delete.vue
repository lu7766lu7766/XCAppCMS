<template>
  <button type="button"
          class="btn btn-sm btn-danger m-r-5 m-b-5"
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
