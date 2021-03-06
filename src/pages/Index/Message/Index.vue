<template>
  <list-container>

    <template slot="detail">
      <detail :data.sync="data"
              :topics="myTopics"
              @post="post"
              @put="put"
              :method="method" />
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
          <td>{{ startIndex + index }}</td>
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
  import DeviceConf from 'src/config/Device'

  export default {
    mixins: [ListMixins],
    components: {
      detail: require('./Detail.vue').default
    },
    data: () => ({
      topics: [],
      model: {
        content: '',
        app_managements: []
      }
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
      async mDataInit() {
        var res = await this.$callApi('getMessageTopic')
        if (res.success)
        {
          this.topics = res.data
        }
      },
      async post() {
        var isPush = await this.isPushMessageContinue()
        var res = await this.mRequestProccess('postMessage')
        if (res.success && isPush)
        {
          this.handlePushMessage(res.data.id)
        }
      },
      async put() {
        var isPush = await this.isPushMessageContinue()
        var res = await this.mRequestProccess('putMessage')
        if (res.success && isPush)
        {
          this.handlePushMessage(res.data.id)
        }
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
      /**
       * 一併推播確認
       */
      async isPushMessageContinue() {
        return await this.confirmMessage('是否一并推播讯息')
      },
      /**
       * 推播確認
       */
      async isPushMessage() {
        return await this.confirmMessage('是否推播讯息')
      },
      /**
       * 點擊推播按鈕
       */
      async pushMessage(id) {
        var isPush = await this.isPushMessage()
        if (isPush)
        {
          this.handlePushMessage(id)
        }
      },
      /**
       * 確認視窗
       */
      async confirmMessage(message) {
        return !!(await this.$swal({
          text: message,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '是',
          cancelButtonText: '否',
          reverseButtons: true
        })).value
      },
      /**
       * 處理推播行為
       * @param id
       */
      async handlePushMessage(id) {
        var res = await this.$callApi('pushMessage', {id})
        this.requestResult = this.getRequestResult(res.success, '推播')
      }
    },
    computed: {
      myTopics() {
        return _.map(_.cloneDeep(this.topics), topic =>
        {
          topic.name = `(${DeviceConf[topic.mobile_device]})${topic.name}`
          return topic
        })
      }
    }
  }
</script>