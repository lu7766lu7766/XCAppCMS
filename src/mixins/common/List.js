import PaginateMixins from 'mixins/common/Paginate'
import RequestResultMixins from 'mixins/common/RequestResult'

export default {
  mixins: [PaginateMixins, RequestResultMixins],
  props: {
    apiKey: {
      type: String
    }
  },
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
    // override
    /**
     * empty model
     */
    model: {},
    /**
     * request body
     */
    seachData: {}
    //
  }),
  watch: {
    datas() {
      this.$forceUpdate()
    }
  },
  methods: {
    // override
    /**
     * get some data not relative data list
     * like total or option...
     */
    dataInit() {
      this.paginate.page = 1
      this.data = _.cloneDeep(this.model)
    },
    mDataInit() {},
    mGetList() {},
    mGetTotal() {},
    post() {},
    put() {},
    mRequestProccess() {},
    mDeleteDatas() {},
    //
    /**
     * delete confirm
     */
    async deleteConfirm() {
      return !!(await this.$swal({
        title: '再次确认',
        text: '是否确定删除资料',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        reverseButtons: true
      })).value
    },
    /**
     * it will defined mDeleteDatas() in owner component, then call this func
     * basic delete data list
     * @param {*} key
     */
    async deleteDatas(key) {
      return await this.handleDeleteData(key, {
        id: this.dataCheckedIDs
      })
    },
    /**
     *
     */
    async deleteData(key, data) {
      return await this.handleDeleteData(key, {
        id: data.id
      })
    },
    async handleDeleteData(key, request) {
      var confirmResult = await this.deleteConfirm()
      if (!confirmResult) return

      var res = await this.$callApi(key, request)
      if (res.success)
      {
        this.getSearchData()
      }
      this.requestResult = this.getRequestResult(res.success, '删除')
      return res
    },
    /**
     * it will defined mGetList() in owner component, then call this func
     * basic get data list
     * @param {*} key
     * @param {*} data
     */
    async getList(key, data = {}) {
      return await this.$callApi(key, _.assign({}, data, this.paginate, this.seachData))
    },
    /**
     * it will defined mGetList() in owner component, then call this func
     * basic get data list
     * @param {*} key
     * @param {*} data
     */
    async getTotal(key, data = {}) {
      return await this.$callApi(key, _.assign({}, data, this.seachData))
    },
    getNewPageData() {
      this.dataInit()
      this.mGetList()
      this.mGetTotal()
      this.mDataInit()
    },
    getSearchData() {
      this.dataInit()
      this.mGetList()
      this.mGetTotal()
    },
    /**
     * it will defined mRequestProccess() in owner component, then call this func
     * basic add or edit's data proccess
     * @param {*} key
     * @param {*} data
     */
    async requestProccess(key, data = {}) {
      const res = await this.$callApi(key, data)
      const isPost = this.method == 'post'
      if (res.success)
      {
        isPost
          ? this.getSearchData()
          : this.mGetList()
      }
      let message = isPost
        ? '新增'
        : '更新'
      this.requestResult = this.getRequestResult(res.success, message)
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
      const copyTarget = data || this.model
      if (!_.keys(this.data).length || this.data.id !== copyTarget.id)
      {
        this.data = _.cloneDeep(copyTarget)
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
        _.forEach(this.datas, data =>
        {
          data.checked = (typeof data.can_delete == 'undefined' || data.can_delete)
            ? newValue
            : false
        })
      },
      get() {
        return !_.some(this.datas, data =>
        {
          return (typeof data.can_delete == 'undefined' || data.can_delete) && data.checked == false
        })
      }
    },
    /**
     * get isChecked data's id
     */
    dataCheckedIDs() {
      return _.remove(_.map(this.datas, data => (data.checked
        ? data.id
        : '')))
    },
    /**
     * field #
     * start index
     */
    startIndex() {
      return (this.paginate.page - 1) * this.paginate.perpage + 1
    },
    /**
     * if has api key
     */
    getApiKey() {
      return `get${this.apiKey}List`
    },
    getTotalApiKey() {
      return `get${this.apiKey}Total`
    },
    postApiKey() {
      return `post${this.apiKey}`
    },
    putApiKey() {
      return `put${this.apiKey}`
    },
    deleteApiKey() {
      return `delete${this.apiKey}List`
    }
  },
  created() {
    this.getNewPageData()
  }
}