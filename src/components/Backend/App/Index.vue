<template>
  <container>

    <template slot="header">
      <ol class="breadcrumb pull-right">
        <li class="breadcrumb-item active">
          <router-link :to="{
            name: 'message-list'
          }">
            APP管理
          </router-link>
        </li>
      </ol>
      <h1 class="page-header">APP管理</h1>

      <request-result :requestResult="requestResult" />

      <div class="row form-group">
        <div class="col-md-6">
          <button type="button" class="btn btn-sm btn-primary m-r-5 m-b-5" v-b-modal.modalDetail @click="setData()">
            新增
          </button>
          <button type="button" class="btn btn-sm btn-danger m-r-5 m-b-5" @click="mDeleteDatas()">删除</button>
        </div>
        <div class="col-md-6" style="text-align: right;">
          <div class="form-inline" style="display: block;">
            <select class="form-control" v-model="body.category">
              <option value="">类别</option>
              <option v-for="(name, conf) in AppCategoryConf" :key="name" :value="conf">{{ name }}</option>
            </select>
            <select class="form-control" v-model="body.mobile_device">
              <option value="">裝置</option>
              <option v-for="(name, index) in AppMobileDeviceConf" :key="index" :value="name">{{ name }}</option>
            </select>
            <input type="text" class="form-control" placeholder="关键字" v-model="body.name" @keyup.13="mGetList()" />
            <button type="button" class="btn btn-sm btn-default" @click="mGetList()">搜索</button>
          </div>
        </div>
      </div>
    </template>

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

    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th class="with-checkbox">
          <div class="checkbox checkbox-css">
            <input type="checkbox" id="checkbox_all" v-model="isAllChecked">
            <label for="checkbox_all">&nbsp;</label>
          </div>
        </th>
        <th class="index">#</th>
        <th>代码</th>
        <th>名称</th>
        <th>裝置</th>
        <th>类别</th>
        <th>跳转开关</th>
        <th>更新开关</th>
        <th class="action">操作</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(d, index) in datas" :key="index">
        <td class="with-checkbox">
          <div class="checkbox checkbox-css">
            <input type="checkbox" :id="'checkbox_'+d.id" v-model="d.checked">
            <label :for="'checkbox_'+d.id">&nbsp;</label>
          </div>
        </td>
        <td>{{ d.id }}</td>
        <td>{{ d.code }}</td>
        <td>{{ d.name }}</td>
        <td>{{ d.mobile_device.toUpperCase() }}</td>
        <td>{{ AppCategoryConf[d.category] }}</td>
        <td>
          <i v-if="d.redirect_switch == 'on'" class="ion-checkmark fa-lg fa-fw pull-left m-r-10"></i>
          <i v-else-if="d.redirect_switch == 'off'" class="ion-close-round fa-lg fa-fw pull-left m-r-10"></i>
        </td>
        <td>
          <i v-if="d.update_switch == 'on'" class="ion-checkmark fa-lg fa-fw pull-left m-r-10"></i>
          <i v-if="d.update_switch == 'off'" class="ion-close-round fa-lg fa-fw pull-left m-r-10"></i>
        </td>
        <td class="action">
          <button class="btn btn-sm btn-info m-r-5 m-b-5" v-b-modal.modalDetail @click="setData(d)">
            编辑
          </button>
        </td>
      </tr>

      </tbody>
    </table>

    <paginate :page="paginate.page" :lastPage="lastPage" @pageChange="pageChange" />

  </container>
</template>

<script>
  import ListMixins from 'mixins/common/List'

  export default {
    mixins: [ListMixins],
    components: {
      detail: require('./Detail.vue').default
    },
    data: () => ({
      AppStatusConf: {
        unpublished: '未上架',
        verifying: '审核中',
        published: '已上架',
        removed: '已下架'
      },
      AppCategoryConf: {
        lottery: '彩票',
        futures: '期货',
        sports: '体育'
      },
      AppUpdateSwitchConf: {
        on: '开启',
        off: '关闭'
      },
      AppRedirectSwitchConf: {
        on: '开启',
        off: '关闭'
      },
      AppMobileDeviceConf: ['ios', 'android'],
      model: {
        id: '',
        code: '',
        name: '',
        category: '',
        mobile_device: 'ios',
        redirect_switch: 'off',
        redirect_url: [''],
        update_switch: 'off',
        update_url: '',
        update_content: '',
        qq_id: '',
        wechat_id: '',
        customer_service: '',
        status: 'unpublished',
        topic_id: ''
      },
      body: {
        category: '',
        mobile_device: '',
        name: ''
      }
    }),
    methods: {
      async mGetList() {
        var res = await this.getList('getAppList')
        if (res.success)
        {
          this.datas = res.data
        }
      },
      async mGetTotal() {
        var res = await this.getTotal('getAppTotal')
        if (res.success)
        {
          this.paginate.total = res.data
        }
      },
      post() {
        this.mRequestProccess('postAppDetail')
      },
      put() {
        this.mRequestProccess('putAppDetail')
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
        this.deleteDatas('deleteAppList')
      }
    }
  }
</script>