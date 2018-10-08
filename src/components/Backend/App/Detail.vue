<template>
  <b-modal id="modalDetail"
           size="lg"
           ok-title="储存"
           cancel-title="取消"
           :ok-disabled="errors.any()"
           @shown="show"
           @ok="ok">

    <div slot="modal-header">
      <h5 class="modal-title">{{ title }}</h5>
    </div>

    <form class="form-horizontal form-bordered form-editor">

      <div class="form-group row">
        <label class="col-md-2 col-form-label">代码</label>
        <div class="col-md-10">
          <div class="input-group date">
            <input type="text"
                   class="form-control"
                   name="code"
                   v-validate="'required'"
                   v-model="data.code">
            <error-message :thisErrors="errors"
                           inputName="code">
            </error-message>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-2 col-form-label">名称</label>
        <div class="col-md-10">
          <input type="text"
                 class="form-control"
                 name="name"
                 v-validate="'required'"
                 v-model="data.name">
          <error-message :thisErrors="errors"
                         inputName="name">
          </error-message>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">类别</label>
        <div class="col-md-10">
          <select class="form-control"
                  name="category"
                  v-validate="'required'"
                  v-model="data.category">
            <option v-for="(name, conf) in AppCategoryConf" :key="name" :value="conf">{{ name }}</option>
          </select>
          <error-message :thisErrors="errors"
                         inputName="category">
          </error-message>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">裝置</label>
        <div class="col-md-10">
          <select class="form-control"
                  v-model="data.mobile_device">
            <option v-for="(name, key) in AppMobileDeviceConf" :key="key" :value="key">{{ name }}</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">跳转开关</label>
        <div class="col-md-10">
          <div class="form-check form-check-inline" v-for="(name, conf) in AppRedirectSwitchConf" :key="name">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" :value="conf" v-model="data.redirect_switch">{{ name }}
            </label>
          </div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">跳转网址</label>
        <div class="col-md-9">
          <div class="form-group row m-b-5" v-for="(url, index) in data.redirect_url" :key="index">
            <input type="text" class="form-control"
                   :name="'redirect_url' + index"
                   v-validate="'required'"
                   v-model="data.redirect_url[index]" />
            <error-message :thisErrors="errors"
                           :inputName="'redirect_url' + index">
            </error-message>
          </div>
        </div>
        <div class="col-md-1">
          <button type="button"
                  class="btn btn-default m-b-10"
                  @click="data.redirect_url ? data.redirect_url.push('') : (data.redirect_url = [''])">＋
          </button>
          <button type="button"
                  class="btn btn-default m-b-10"
                  v-if="data.redirect_url && data.redirect_url.length"
                  @click="data.redirect_url.length > 1 ? data.redirect_url.pop() : (data.redirect_url = null)">－
          </button>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">更新开关</label>
        <div class="col-md-10">
          <div class="form-check form-check-inline" v-for="(name, conf) in AppUpdateSwitchConf" :key="name">
            <label class="form-check-label">
              <input type="radio"
                     class="form-check-input"
                     :value="conf"
                     v-model="data.update_switch">{{ name }}
            </label>
          </div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">更新网址</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="data.update_url" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">更新文字</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="data.update_content" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">QQ ID</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="data.qq_id">
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">WeChat ID</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="data.wechat_id" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">线上客服</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="data.customer_service" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">狀態</label>
        <div class="col-md-10">
          <div class="form-check form-check-inline" v-for="(name, conf) in AppStatusConf" :key="name">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" :value="conf" v-model="data.status">{{ name }}
            </label>
          </div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">Topic ID</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="data.topic_id" />
        </div>
      </div>

    </form>
  </b-modal>
</template>

<script>
  import DetailMixins from 'mixins/common/Detail'

  export default {
    mixins: [DetailMixins],
    props: {
      AppStatusConf: {
        type: Object,
        required: true
      },
      AppUpdateSwitchConf: {
        type: Object,
        required: true
      },
      AppRedirectSwitchConf: {
        type: Object,
        required: true
      },
      AppMobileDeviceConf: {
        type: Object,
        required: true
      },
      AppCategoryConf: {
        type: Object,
        required: true
      }
    }
  }
</script>