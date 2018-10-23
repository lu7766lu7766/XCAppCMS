<template>
  <section>
    <span v-if="data">{{ data }}</span>
    <div class="input-group">
      <input type="file"
             class="custom-file-input"
             :accept="accept"
             @change="fileChange" />
      <label class="custom-file-label"></label>
      <input type="text"
             class="form-control hide"
             :name="inputName"
             v-validate="validate"
             v-model="data" />
      <error-message :inputName="inputName"></error-message>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      data: {
        type: String,
        require: true
      },
      validate: {
        type: String | Object,
        default: ''
      },
      inputName: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'file'
      }
    },
    inject: {
      $validator: {
        from: 'validator'
      }
    },
    methods: {
      async fileChange(e) {
        if (e.target.files.length)
        {
          await this.$emit('upload', e.target.files[0])
          this.$nextTick(() =>
          {
            this.$validator.validateAll()
          })
        }
      }
    },
    computed: {
      accept() {
        switch (this.type)
        {
          case 'image':
            return 'image/jpeg,image/png,image/gif'
            break
          default:
            return ''
            break
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .custom-file-label, .custom-file-input
    height 34px

  .custom-file-input ~ .custom-file-label::after
    content "上传"
    line-height 20px
    height 32px
</style>