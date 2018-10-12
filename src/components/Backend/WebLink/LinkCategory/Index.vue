<template>
  <list-container>

    <template slot="detail">
      <detail :data.sync="data"
              :LinkCategoryEnableConf="LinkCategoryEnableConf"
              @post="post"
              @put="put"
              :method="method" />
    </template>

    <request-result :requestResult="requestResult" />

    <div class="row form-group">
      <div class="col-sm-3">
        <create-btn @click="setData()"></create-btn>
        <delete-btn @click="mDeleteDatas()"></delete-btn>
      </div>
      <div class="col-sm-9 form-inline justify-content-end panel-search">
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
              <label for="checkbox_all" class="m-b-0">&nbsp;</label>
            </div>
          </th>
          <th class="width-30">#</th>
          <th>圖片</th>
          <th>名稱</th>
          <th class="width-100">状态</th>
          <th class="width-200">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(d, index) in datas" :key="index">
          <td>
            <div class="checkbox check-box">
              <input type="checkbox" :id="'checkbox_'+d.id" v-model="d.checked">
              <label :for="'checkbox_'+d.id" class="m-b-0">&nbsp;</label>
            </div>
          </td>
          <td>{{ startIndex + index }}</td>
          <td></td>
          <td>{{ d.name }}</td>
          <td>
            <i v-if="d.status == 'enable'" class="ion-checkmark fa-lg fa-fw text-green"></i>
            <i v-else-if="d.status == 'disable'" class="ion-close-round fa-lg fa-fw text-danger"></i>
          </td>
          <td class="action">
            <update-btn @click="setData(d)"></update-btn>
            <delete-btn @click="mDeleteDatas()"></delete-btn>
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
  import IndexMixins from 'mixins/common/Index'
  import { getChildren, proccessSubNode } from 'src/store/module/node'

  export default {
    mixins: [ListMixins, IndexMixins],
    components: {
      detail: require('./Detail').default
    },
    data: () => ({
      LinkCategoryEnableConf: {
        enable: '启用',
        disable: '关闭'
      },
      model: {
        name: '',
        status: 'enable',
        image_id: ''
      },
      seachData: {
        name: ''
      }
    }),
    methods: {
      async mGetList() {
        var res = await this.getList('getLinkCategoryList')
        if (res.success)
        {
          this.datas = res.data
        }
      },
      async mGetTotal() {
        var res = await this.getTotal('getLinkCategoryTotal')
        if (res.success)
        {
          this.paginate.total = res.data
        }
      },
      post() {
        this.mRequestProccess('postLinkCategory')
      },
      put() {
        this.mRequestProccess('putLinkCategory')
      },
      async mRequestProccess(key) {
        const data = this.data
        return await this.requestProccess(key, {
          id: data.id,
          name: data.name,
          status: data.status
        })
      },
      mDeleteDatas() {
        this.deleteDatas('deleteLinkCategoryList')
      }
    }
  }
</script>