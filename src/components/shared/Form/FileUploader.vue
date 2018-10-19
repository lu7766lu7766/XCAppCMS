<template>
  <section v-if="data">
    <span v-if="data[dataKey]">{{ data[dataKey] }}</span>
    <input type="file"
           class="form-control"
           :accept="accept"
           @change="fileChange" />
    <input type="text"
           class="form-control hide"
           :name="inputName"
           v-validate="validate"
           v-model="data[dataKey]" />
    <error-message :inputName="inputName"></error-message>
  </section>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object | String,
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
      apiKey: {
        type: String,
        required: true
      },
      dataKey: {
        type: String,
        default: 'files_name'
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
          var res = await this.$uploadFiles(this.apiKey, {
            image: e.target.files[0]
          })
          if (res.success)
          {
            this.$emit('update:data', res.data)
            this.$nextTick(() =>
            {
              this.$validator.validateAll()
            })
          }
          // e.target.value = ''
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