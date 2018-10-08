<template>
  <button type="button"
          class="btn btn-green m-r-5"
          v-if="currentUpdate"
          @click="$emit('click')"
          v-b-modal.modalDetail>
    编辑
  </button>
</template>

<script>
  import CRUDMixins from 'mixins/common/CRUD'

  export default {
    mixins: [CRUDMixins]
  }
</script>
