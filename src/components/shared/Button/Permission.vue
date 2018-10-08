<template>
  <button type="button"
          class="btn btn-grey m-r-5"
          v-if="currentUpdate"
          @click="$emit('click')"
          v-b-modal.modalPermission>
    权限
  </button>
</template>

<script>
  import CRUDMixins from 'mixins/common/CRUD'

  export default {
    mixins: [CRUDMixins]
  }
</script>
