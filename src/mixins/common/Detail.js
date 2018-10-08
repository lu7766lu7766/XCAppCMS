export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    method: {
      type: String,
      require: true
    }
  },
  watch: {
    data(newValue) {
      this.$emit('update:data', newValue)
    }
  },
  methods: {
    async ok() {
      var validateResult = await this.$validator.validateAll()
      if (!validateResult)
      {
        this.$swal({
          text: '資料未完整或有誤，請再次確認',
          type: 'error',
          confirmButtonText: '確定'
        })
      }
      this.$emit(this.method, this.data)
    },
    show() {
      this.$validator.validateAll()
    }
  },
  computed: {
    title() {
      return this.method == 'post'
        ? '新增'
        : this.method == 'put'
          ? '编辑'
          : '新增/编辑'
    }
  }
}