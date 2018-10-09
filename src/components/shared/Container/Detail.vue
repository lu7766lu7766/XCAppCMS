<template>
  <b-modal id="modalDetail"
           size="lg"
           :title="title"
           :disabled="disabled"
           header-text-variant="light"
           @shown="$emit('shown')">

    <form class="form-horizontal">
      <slot></slot>
    </form>

    <template slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-primary2" :disabled="disabled" @click="$emit('ok'); close()">储存</button>
      <button type="button" class="btn btn-secondary" @click="close()">取消</button>
    </template>

  </b-modal>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.$root.$emit('bv::hide::modal', 'modalDetail')
      }
    }
  }
</script>