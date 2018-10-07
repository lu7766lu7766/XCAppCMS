<template>
  <button class="btn btn-sm btn-info m-r-5 m-b-5"
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
