<template>
  <list-container>

    <template slot="detail">
      <detail :data.sync="data"
              :NewsStatusConf="DerekConf"
              :NewsPollingConf="DerekConf"
              :categorys="categorys"
              :topics="topics"
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
          <th>图片</th>
          <th>名称</th>
          <th>类别</th>
          <th class="width-100">轮播</th>
          <th class="width-100">状态</th>
          <th>发布时间</th>
          <th class="width-100">操作</th>
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
          <td>{{ d.category.name }}</td>
          <td>
            <i v-if="d.polling == '1'"
               class="ion-checkmark fa-lg fa-fw text-green"></i>
            <i v-else-if="d.status == '0'"
               class="ion-close-round fa-lg fa-fw text-danger"></i>
          </td>
          <td>
            <i v-if="d.status == '1'"
               class="ion-checkmark fa-lg fa-fw text-green"></i>
            <i v-else-if="d.status == '0'"
               class="ion-close-round fa-lg fa-fw text-danger"></i>
          </td>
          <td>{{ d.url_link }}</td>
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
  import DerekConf from 'src/config/DerekStatus'

  export default {
    mixins: [ListMixins],
    components: {
      detail: require('./Detail.vue').default
    },
    data: () => ({
      DerekConf: DerekConf,
      categorys: [],
      topics: [],
      model: {
        name: '',
        category_id: '',
        publish_time: '',
        content: '',
        status: '1',
        topic_id: '',
        cover_image: {},
        upload: [],
        polling: '0'
      },
      seachData: {
        name: ''
      }
    }),
    methods: {
      async mGetList() {
        var res = await this.getList('getNewsList')
        if (res.success)
        {
          this.datas = res.data
        }
      },
      async mGetTotal() {
        var res = await this.getTotal('getNewsTotal')
        if (res.success)
        {
          this.paginate.total = res.data.total
        }
      },
      async mDataInit() {
        var {0: topicRes, 1: categoryRes} = await axios.all([
          this.$callApi('getNewsTopics'),
          this.$callApi('getNewsCategorys')
        ])
        if (topicRes.success)
        {
          this.topics = topicRes.data
        }
        if (categoryRes.success)
        {
          this.categorys = categoryRes.data
        }
      },
      post() {
        this.mRequestProccess('postNews')
      },
      put() {
        this.mRequestProccess('putNews')
      },
      async mRequestProccess(key) {
        const data = this.data
        return await this.requestProccess(key, {
          id: data.id,
          name: data.name,
          status: data.status,
          category_id: data.category_id,
          url_link: data.url_link,
          app_id: _.map(data.app_management, 'id'),
          image_id: ''
        })
      },
      mDeleteDatas() {
        this.deleteDatas('deleteNewsManageList')
      }
    }
  }
</script>