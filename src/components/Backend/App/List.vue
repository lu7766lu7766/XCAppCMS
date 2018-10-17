<template>
  <list-container>

    <template slot="detail">
      <detail :data.sync="data"
              :AppStatusConf="AppStatusConf"
              :AppUpdateSwitchConf="AppUpdateSwitchConf"
              :AppRedirectSwitchConf="AppRedirectSwitchConf"
              :AppMobileDeviceConf="AppMobileDeviceConf"
              :AppCategoryConf="AppCategoryConf"
              @post="post"
              @put="put"
              :method="method" />
    </template>

    <request-result :requestResult="requestResult" />

    <div class="row m-b-20">
      <div class="col-sm-3">
        <create-btn @click="setData()"></create-btn>
        <delete-btn @click="mDeleteDatas()"></delete-btn>
      </div>
      <div class="col-sm-9 form-inline justify-content-end panel-search">
        <div class="form-group m-r-10 width-100">
          <select class="form-control" v-model="seachData.category">
            <option value="">类别</option>
            <option v-for="(name, conf) in AppCategoryConf" :key="name" :value="conf">{{ name }}</option>
          </select>
        </div>
        <div class="form-group m-r-10 width-100">
          <select class="form-control" v-model="seachData.mobile_device">
            <option value="">裝置</option>
            <option v-for="(name, key) in AppMobileDeviceConf" :key="key" :value="key">{{ name }}</option>
          </select>
        </div>
        <div class="form-group m-r-10 width-100">
          <select class="form-control" v-model="seachData.status">
            <option value="">状态</option>
            <option v-for="(name, key) in AppStatusConf" :key="key" :value="key">{{ name }}</option>
          </select>
        </div>
        <div class="form-group m-r-10">
          <input type="text"
                 class="form-control"
                 placeholder="关键字"
                 v-model="seachData.name"
                 @keyup.13="getSearchData()" />
        </div>
        <search-btn @click="getSearchData()"></search-btn>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover table-box text-center">
        <thead>
        <tr>
          <th class="width-30">
            <div class="checkbox check-box">
              <input type="checkbox" id="checkbox_all" v-model="isAllChecked">
              <label for="checkbox_all">&nbsp;</label>
            </div>
          </th>
          <th class="width-30">#</th>
          <th>代码</th>
          <th>名称</th>
          <th>类别</th>
          <th>裝置</th>
          <th>归属</th>
          <th class="width-100">状态</th>
          <th class="width-100">跳转开关</th>
          <th class="width-100">更新开关</th>
          <th class="width-100">操作</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(d, index) in datas" :key="index">
          <td>
            <div class="checkbox check-box">
              <input type="checkbox" :id="'checkbox_'+d.id" v-model="d.checked">
              <label :for="'checkbox_'+d.id">&nbsp;</label>
            </div>
          </td>
          <td>{{ startIndex + index }}</td>
          <td>{{ d.code }}</td>
          <td>{{ d.name }}</td>
          <td>{{ AppCategoryConf[d.category] }}</td>
          <td>
            <span class="bg-lime app-ic" v-if="d.mobile_device == 'android'">
              <i class="fab fa-android fa-lg text-white"></i>
            </span>
            <span class="bg-grey app-ic" v-else-if="d.mobile_device == 'ios'">
              <i class="fab fa-apple fa-lg text-white"></i>
            </span>
          </td>
          <td></td>
          <td>
            {{ AppStatusConf[d.status] }}
          </td>
          <td>
            <i v-if="d.redirect_switch == 'on'" class="ion-checkmark fa-lg fa-fw text-green"></i>
            <i v-else-if="d.redirect_switch == 'off'" class="ion-close-round fa-lg fa-fw text-danger"></i>
          </td>
          <td>
            <i v-if="d.update_switch == 'on'" class="ion-checkmark fa-lg fa-fw text-green"></i>
            <i v-if="d.update_switch == 'off'" class="ion-close-round fa-lg fa-fw text-danger"></i>
          </td>
          <td class="action">
            <update-btn @click="setData(d)"></update-btn>
          </td>
        </tr>

        </tbody>
      </table>
    </div>

    <paginate :page="paginate.page" :lastPage="lastPage" @pageChange="pageChange" />

  </list-container>
</template>

<script>
  import ListMixins from 'mixins/common/List'
  import SwitchConf from 'src/config/FunnySwitch'

  export default {
    mixins: [ListMixins],
    components: {
      detail: require('./Detail.vue').default
    },
    data: () => ({
      AppStatusConf: {},
      AppCategoryConf: {},
      AppMobileDeviceConf: {},
      AppUpdateSwitchConf: SwitchConf,
      AppRedirectSwitchConf: SwitchConf,
      model: {
        id: '',
        code: '',
        name: '',
        category: 'futures',
        mobile_device: 'ios',
        redirect_switch: 'off',
        redirect_url: null,
        update_switch: 'off',
        update_url: '',
        update_content: '',
        qq_id: '',
        wechat_id: '',
        customer_service: '',
        status: 'unpublished',
        topic_id: ''
      },
      seachData: {
        category: '',
        mobile_device: '',
        name: '',
        status: ''
      }
    }),
    methods: {
      async mGetList() {
        var res = await this.getList(this.getApiKey)
        if (res.success)
        {
          this.datas = res.data
        }
      },
      async mGetTotal() {
        var res = await this.getTotal(this.getTotalApiKey)
        if (res.success)
        {
          this.paginate.total = res.data
        }
      },
      async dataInit() {
        var res = await this.$callApi('getAppOption')
        if (res.success)
        {
          this.AppCategoryConf = res.data.category
          this.AppMobileDeviceConf = res.data.device
          this.AppStatusConf = res.data.status
        }
      },
      post() {
        this.mRequestProccess(this.postApiKey)
      },
      put() {
        this.mRequestProccess(this.putApiKey)
      },
      async mRequestProccess(key) {
        const data = this.data
        return await this.requestProccess(key, {
          id: data.id,
          code: data.code,
          name: data.name,
          category: data.category,
          mobile_device: data.mobile_device,
          redirect_switch: data.redirect_switch,
          redirect_url: data.redirect_url,
          update_switch: data.update_switch,
          update_url: data.update_url,
          update_content: data.update_content,
          qq_id: data.qq_id,
          wechat_id: data.wechat_id,
          customer_service: data.customer_service,
          status: data.status,
          topic_id: data.topic_id
        })
      },
      mDeleteDatas() {
        this.deleteDatas(this.deleteApiKey)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .app-ic
    border-radius: 3px
    width 22px
    height 22px
    display: inline-block
    line-height 22px
</style>
