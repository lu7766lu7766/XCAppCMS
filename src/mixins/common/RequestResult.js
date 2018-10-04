export default {
  data: () => ({
    /**
     * request result
     */
    requestResult: {
      result: null,
      message: ''
    }
  }),
  watch: {
    requestResult(newValue) {
      if (newValue.result != null)
      {
        setTimeout(() =>
        {
          this.requestResult.result = null
        }, 3000)
      }
    }
  },
  methods: {
    /**
     * get alert style and word
     * @param {*} request.success
     */
    getRequestResult(result, message) {
      message = message + (result
        ? '成功'
        : '失败')
      return {
        result: result
          ? 'success'
          : 'danger',
        message
      }
    }
  }
}