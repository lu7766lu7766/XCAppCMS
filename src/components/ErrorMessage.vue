<template>
  <span class="parsley-errors-list filled"
        v-show="errors.has(inputName)">
    {{ errors.first(inputName) }}
  </span>
</template>

<script>
  export default {
    props: {
      inputName: {
        type: String,
        required: true
      }
    },
    inject: {
      $validator: {
        from: 'validator'
      }
    }
  }
</script>