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
    ok() {
      this.$emit(this.method, this.data)
    }
  },
  computed: {
    title() {
      return this.method == 'post' ? '新增' : this.method == 'put' ? '编辑' : '新增/编辑'
    }
  }
}