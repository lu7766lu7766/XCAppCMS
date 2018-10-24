<template>
  <button type="button"
          class="btn btn-primary m-r-5"
          v-if="currentCreate"
          @click="$emit('click')"
          v-b-modal.modalDetail>
    新增
  </button>
</template>

<script>
  import CRUDMixins from 'mixins/common/CRUD'

  export default {
    mixins: [CRUDMixins]
  }
</script>
