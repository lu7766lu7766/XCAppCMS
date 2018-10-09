import PaginateMixins from 'mixins/common/Paginate'
import RequestResultMixins from 'mixins/common/RequestResult'

export default {
  mixins: [PaginateMixins, RequestResultMixins],
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
    dataInit() { },
    mGetList() { },
    mGetTotal() {},
    post() { },
    put() { },
    mRequestProccess() { },
    mDeleteDatas() { },
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
      var confirmResult = await this.deleteConfirm()
      if (!confirmResult) return

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
     *
     */
    async deleteData(key, data) {
      var confirmResult = await this.deleteConfirm()
      if (!confirmResult) return

      var res = await this.$callApi(key, {
        id: data.id
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
      this.mGetList()
      this.mGetTotal()
      this.dataInit()
    },
    getSearchData() {
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
      if (res.success)
      {
        // this.datas[res.data.id] = res.data
        this.mGetList()
      }
      let message = (this.method == 'post'
        ? '新增'
        : '更新')
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
  },
  created() {
    this.getNewPageData()
  }
}