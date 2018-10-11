<template>
  <list-container>

    <template slot="detail">
      <detail :data.sync="data" :topics="topics" @post="post" @put="put" :method="method" />
    </template>

    <request-result :requestResult="requestResult" />

    <div class="row form-group">
      <div class="col-md-12">
        <create-btn @click="setData()"></create-btn>
        <delete-btn @click="mDeleteDatas()"></delete-btn>
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
          <th>推播内容</th>
          <th>装置</th>
          <th class="width-150">操作</th>
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
          <td>{{ d.id }}</td>
          <td>{{ d.content }}</td>
          <td>{{ _.map(d.app_managements, 'name').join(', ') }}</td>
          <td class="action">
            <update-btn @click="setData(d)"></update-btn>
            <button class="btn btn-yellow text-white" @click="pushMessage(d.id)">推播</button>
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
      async mGetTotal() {
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
        this.deleteDatas('deleteMessageList')
      },
      pushMessage(id) {
        this.$callApi('pushMessage', {id})
        this.requestResult = this.getRequestResult(res.success, '推播')
      }
    }
  }
</script>