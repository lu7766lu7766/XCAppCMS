<template>
  <span class="parsley-errors-list filled"
        v-show="thisErrors.has(inputName)">
    {{ thisErrors.first(inputName) }}
  </span>
</template>

<script>
  export default {
    props: {
      thisErrors: {
        type: Object,
        required: true
      },
      inputName: {
        type: String,
        required: true
      }
    }
  }
</script>