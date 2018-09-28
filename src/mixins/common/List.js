import PaginateMixins from 'mixins/common/Paginate'

export default {
  mixins: [PaginateMixins],
  data: () => ({
    method: 'post',
    datas: [],
    data: {},
    request: {
      result: null,
      message: ''
    },
    // override
    model: {},
    body: {}
    //
  }),
  watch: {
    datas() {
      this.$forceUpdate()
    },
    request(newValue) {
      if (newValue.result != null) {
        setTimeout(() => {
          this.request.result = null
        }, 3000)
      }
    }
  },
  methods: {
    // override
    dataInit() { },
    mGetList() { },
    post() { },
    put() { },
    // 
    async deleteDatas(key) { 
      var res = await this.$callApi(key, {
        id: this.dataCheckedIDs
      })
      if (res.success) {
        this.mGetList()
      }
      return res
    },
    async getList(key, data = {}) {
      return await this.$callApi(key, _.assign({}, data, this.paginate, this.body))
    },
    async requestProccess(key, data = {}) {
      const res = await this.$callApi(key, data)
      if (res.success) {
        // this.datas[res.data.id] = res.data
        this.mGetList()
      }
      this.request = this.getRequest(res.success)
      return res
    },
    setData(data) {
      this.method = !data ? 'post' : 'put'
      this.data = _.cloneDeep(data || this.model)
    },
    getRequest(result) {
      const message = (this.method == 'post' ? '新增' : '更新') + (result ? '成功' : '失败')
      return {
        result: result ? 'success' : 'danger',
        message
      }
    },
    pageChange(page) {
      this.paginate.page = page
      this.mGetList()
    }
  },
  computed: {
    isAllChecked: {
      set(newValue) {
        _.forEach(this.datas, data => { data.checked = newValue })
      },
      get() {
        return !_.some(this.datas, { checked: false })
      }
    },
    dataCheckedIDs() {
      return _.remove(_.map(this.datas, data => (data.checked ? data.id : '')))
    }
  }
}