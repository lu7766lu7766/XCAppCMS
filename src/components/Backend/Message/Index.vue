<template>
  <container>

    <template slot="header">
      <ol class="breadcrumb pull-right">
        <li class="breadcrumb-item active">
          <router-link :to="{
              name: 'message-list'
            }">
            讯息管理
          </router-link>
        </li>
      </ol>
      <h1 class="page-header">讯息管理</h1>

      <request-result :requestResult="requestResult" />

      <div class="row form-group">
        <div class="col-md-12">
          <button class="btn btn-sm btn-primary m-r-5 m-b-5" v-b-modal.modalDetail @click="setData()">
            新增
          </button>
          <button class="btn btn-sm btn-danger m-r-5 m-b-5" @click="mDeleteDatas()">删除</button>
        </div>
      </div>
    </template>

    <template slot="detail">
      <detail :data.sync="data" :topics="topics" @post="post" @put="put" :method="method" />
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
        <th>推播内容</th>
        <th>装置</th>
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
        <td>{{ d.content }}</td>
        <td>{{ _.map(d.app_managements, 'name').join(', ') }}</td>
        <td class="action">
          <button class="btn btn-sm btn-info m-r-5 m-b-5" v-b-modal.modalDetail @click="setData(d)">
            编辑
          </button>
          <button class="btn btn-sm btn-warning m-r-5 m-b-5" @click="pushMessage(d.id)">推播</button>
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
      model: {
        content: '',
        app_managements: []
      },
      topics: []
    }),
    methods: {
      async mGetList() {
        var res = await this.getList('getMessageList')
        if (res.success)
        {
          this.datas = res.data
        }
      },
      async mGetToal() {
        var res = await this.getTotal('getMessageTotal')
        if (res.success)
        {
          this.paginate.total = res.data.count
        }
      },
      async dataInit() {
        var res = await this.$callApi('getMessageTopic')
        if (res.success)
        {
          this.topics = res.data
        }
      },
      post() {
        this.mRequestProccess('postMessage')
      },
      put() {
        this.mRequestProccess('putMessage')
      },
      async mRequestProccess(key) {
        const data = this.data
        return await this.requestProccess(key, {
          id: data.id,
          content: data.content,
          topic_id: _.map(data.app_managements, 'id')
        })
      },
      mDeleteDatas() {
        this.deleteDatas('deleteAppList')
      },
      pushMessage(id) {
        this.$callApi('pushMessage', {id})
        this.request = this.getRequestResult(res.success, '推播')
      }
    }
  }
</script>