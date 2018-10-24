<template>
  <detail-container :title="title"
                    :disabled="errors.any()"
                    @shown="show"
                    @ok="ok">

    <div class="form-group row">
      <label class="col-md-2 col-form-label">代码</label>
      <div class="col-md-10">
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
      <label class="col-md-2 col-form-label">推播通道</label>
      <div class="col-md-10">
        <div class="form-check form-check-inline" v-for="(name, conf) in AppPushConf" :key="name">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" :value="conf" v-model="data.push_path">{{ name }}
          </label>
        </div>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">裝置</label>
      <div class="col-md-10">
        <div class="form-check form-check-inline" v-for="(name, key) in AppMobileDeviceConf" :key="key">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" :value="key" v-model="data.mobile_device">
            <span class="bg-grey app-ic" v-if="key === 'ios'">
                <i class="fab fa-apple text-white"></i>
              </span>
            <span class="bg-lime app-ic" v-else-if="key === 'android'">
                <i class="fab fa-android text-white"></i>
              </span>
          </label>
        </div>
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
      <div class="col-md-10 row">

        <div class="col-sm-9">
          <div class="form-group " v-for="(url, index) in data.redirect_url" :key="index">
            <input type="text" class="form-control"
                   :name="'redirect_url' + index"
                   v-validate="'required'"
                   v-model="data.redirect_url[index]" />
            <error-message :thisErrors="errors"
                           :inputName="'redirect_url' + index">
            </error-message>
          </div>
        </div>
        <div class="col-sm-2 p-l-0">
          <button type="button"
                  class="btn btn-grey add-change-web m-r-5"
                  @click="data.redirect_url ? data.redirect_url.push('') : (data.redirect_url = [''])">
            <i class="fas fa-lg fa-fw fa-plus"></i>
          </button>
          <button type="button"
                  class="btn btn-grey add-change-web"
                  v-if="data.redirect_url && data.redirect_url.length"
                  @click="data.redirect_url.length > 1 ? data.redirect_url.pop() : (data.redirect_url = null)">
            <i class="fas fa-lg fa-fw fa-minus"></i>
          </button>
        </div>
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

    <template v-if="data.push_path === 'aws'">
      <div class="form-group row">
        <label class="col-md-2 col-form-label">Topic ID</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="data.topic_id.topic" />
        </div>
      </div>
    </template>

    <template v-else-if="data.push_path === 'aurora'">
      <div class="form-group row">
        <label class="col-md-2 col-form-label">AppKey</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="data.topic_id.app_key" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">MasterSecret</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="data.topic_id.secret" />
        </div>
      </div>
    </template>

  </detail-container>
</template>

<script>
  import DetailMixins from 'mixins/common/Detail'

  export default {
    mixins: [DetailMixins],
    props: {
      AppPushConf: {
        type: Object,
        required: true
      },
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

<style lang="stylus" scoped>
  .add-change-web
    padding 5px
    width 38px
    height 38px
    text-align: center

  .app-ic
    border-radius: 3px
    width 22px
    height 22px
    display: inline-block
    line-height 22px
    text-align: center
    font-size: 14px
</style>