<template>
  <b-alert :variant="requestResult.result"
           :show="!!requestResult.result">
    {{ requestResult.message }}
  </b-alert>
</template>

<script>
  export default {
    props: {
      requestResult: {
        type: Object,
        required: true
      }
    }
  }
</script>