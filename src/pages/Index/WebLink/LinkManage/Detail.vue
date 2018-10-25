<template>
  <detail-container :title="title"
                    :disabled="errors.any()"
                    @shown="show"
                    @ok="ok">
    <div class="form-group row">
      <label class="col-md-2 col-form-label">名称</label>
      <div class="col-md-10">
        <input type="text"
               class="form-control"
               name="name"
               v-validate="'required'"
               v-model="data.name" />
        <error-message inputName="name" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">类别</label>
      <div class="col-md-10">
        <select class="form-control"
                name="category"
                v-validate="'required'"
                v-model="data.category_id">
          <option v-for="(category, index) in categorys" :key="index" :value="category.id">{{ category.name }}</option>
        </select>
        <error-message inputName="category" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">网址</label>
      <div class="col-md-10">
        <input type="text"
               class="form-control"
               name="url_link"
               v-validate="'required'"
               v-model="data.url_link" />
        <error-message inputName="url_link" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">图片</label>
      <div class="col-md-10">
        <!--<input type="text"-->
        <!--class="form-control"-->
        <!--name="display_name"-->
        <!--v-validate="'required|max:10'"-->
        <!--v-model="data.display_name"-->
        <!--placeholder="长度最多10码" />-->
        <!--<error-message :thisErrors="errors"-->
        <!--inputName="display_name">-->
        <!--</error-message>-->
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">状态</label>
      <div class="col-md-10">
        <div class="form-check form-check-inline" v-for="(name, key) in WebLinkEnableConf" :key="key">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" name="status" :value="key" v-model="data.status">{{ name}}
          </label>
        </div>

      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">发布APP</label>
      <div class="col-md-10">

        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input type="checkbox" class="form-check-input" v-model="isAllChecked" />全部
          </label>
        </div>

        <div class="form-check form-check-inline" v-for="(topic, index) in topics" :key="index">
          <label class="form-check-label">
            <input type="checkbox" class="form-check-input" v-model="data.app_management" :value="topic" />
            {{ topic.name }}
          </label>
        </div>

      </div>
    </div>

  </detail-container>
</template>

<script>
  import DetailMixins from 'mixins/common/Detail'

  export default {
    mixins: [DetailMixins],
    props: {
      WebLinkEnableConf: {
        type: Object,
        required: true
      },
      topics: {
        type: Array,
        required: true
      },
      categorys: {
        type: Array,
        required: true
      }
    },
    computed: {
      isAllChecked: {
        set(newValue) {
          this.data.app_management = newValue
            ? this.topics
            : []
        },
        get() {
          return this.data.app_management && this.data.app_management.length == this.topics.length
        }
      }
    }
  }
</script>