import PaginateMixins from 'mixins/common/Paginate'

export default {
  mixins: [PaginateMixins],
  data: () => ({
    /**
     * means what is doing now
     */
    method: 'post',
    /**
     * data list
     */
    datas: [],
    /**
     * editing data
     */
    data: {},
    /**
     * request result
     */
    request: {
      result: null,
      message: ''
    },
    // override
    /**
     * empty model
     */
    model: {},
    /**
     * request body
     */
    body: {}
    //
  }),
  watch: {
    datas() {
      this.$forceUpdate()
    },
    request(newValue) {
      if (newValue.result != null)
      {
        setTimeout(() =>
        {
          this.request.result = null
        }, 3000)
      }
    }
  },
  methods: {
    // override
    /**
     * get some data not relative data list
     * like total or option...
     */
    dataInit() { },
    mGetList() { },
    post() { },
    put() { },
    mRequestProccess() { },
    mDeleteDatas() { },
    // 
    /**
     * it will defined mDeleteDatas() in owner component, then call this func
     * basic delete data list
     * @param {*} key
     */
    async deleteDatas(key) {
      var res = await this.$callApi(key, {
        id: this.dataCheckedIDs
      })
      if (res.success)
      {
        this.mGetList()
      }
      return res
    },
    /**
     * it will defined mGetList() in owner component, then call this func
     * basic get data list
     * @param {*} key
     * @param {*} data
     */
    async getList(key, data = {}) {
      return await this.$callApi(key, _.assign({}, data, this.paginate, this.body))
    },
    /**
     * it will defined mRequestProccess() in owner component, then call this func
     * basic add or edit's data proccess
     * @param {*} key
     * @param {*} data
     */
    async requestProccess(key, data = {}) {
      const res = await this.$callApi(key, data)
      if (res.success)
      {
        // this.datas[res.data.id] = res.data
        this.mGetList()
      }
      this.request = this.getRequest(res.success)
      return res
    },
    /**
     * trigger on add or edit button click
     * @param {*} data
     */
    setData(data) {
      this.method = !data
        ? 'post'
        : 'put'
      const copyModel = data || this.model
      if (this.data.id === copyModel.id) return
      this.data = _.cloneDeep(copyModel)
    },
    /**
     * get alert style and word
     * @param {*} request.success
     */
    getRequest(result) {
      const message = (this.method == 'post'
        ? '新增'
        : '更新') + (result
        ? '成功'
        : '失败')
      return {
        result: result
          ? 'success'
          : 'danger',
        message
      }
    },
    /**
     * page change
     * @param {*} page
     */
    pageChange(page) {
      this.paginate.page = page
      this.mGetList()
    }
  },
  computed: {
    /**
     * datas must has checked property
     * all checkbox
     */
    isAllChecked: {
      set(newValue) {
        _.forEach(this.datas, data => { data.checked = newValue })
      },
      get() {
        return !_.some(this.datas, {checked: false})
      }
    },
    /**
     * get isChecked data's id
     */
    dataCheckedIDs() {
      return _.remove(_.map(this.datas, data => (data.checked
        ? data.id
        : '')))
    }
  }
}