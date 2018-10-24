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
                v-model="data.category">
          <option v-for="(category, index) in categorys" :key="index" :value="category.id">{{ category.name }}</option>
        </select>
        <error-message inputName="category" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">发布时间</label>
      <div class="col-md-10">
        <div class="input-group date"
             data-date-format="yyyy-mm-dd"
             data-date-start-date="Date.default">
          <input type="text"
                 class="form-control"
                 name="publish_time"
                 v-validate="'required'"
                 v-model="data.publish_time">
          <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
        </div>
        <error-message inputName="publish_time" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">内容</label>
      <div class="col-md-10">
        <textarea class="form-control"
                  name="content"
                  rows="5"
                  v-validate="'required'"
                  v-model="data.content">
          </textarea>
        <error-message :thisErrors="errors"
                       inputName="content">
        </error-message>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">图片</label>
      <div class="col-md-10">
        <file-uploader
            type="image"
            validate="required"
            inputName="cover_image"
            :data="getImageProp(data).files_name"
            @upload="upload"></file-uploader>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">轮播</label>
      <div class="col-md-10">
        <div class="form-check form-check-inline" v-for="(name, conf) in NewsPollingConf" :key="name">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" :value="conf" v-model="data.polling">{{ name }}
          </label>
        </div>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">狀態</label>
      <div class="col-md-10">
        <div class="form-check form-check-inline" v-for="(name, conf) in NewsStatusConf" :key="name">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" :value="conf" v-model="data.status">{{ name }}
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
            <input type="checkbox"
                   class="form-check-input"
                   v-validate="'required'"
                   v-model="data.topic_id"
                   :value="topic.id" />
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
      NewsStatusConf: {
        type: Object,
        required: true
      },
      NewsPollingConf: {
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
    methods: {
      async upload(file) {

      },
      getImageProp(data) {
        return data.cover_image
          ? data.cover_image
          : data.used
            ? data.used[0]
            : {}
      }
    },
    computed: {
      isAllChecked: {
        set(newValue) {
          this.data.topic_id = newValue
            ? _.map(this.topics, 'id')
            : []
        },
        get() {
          return this.data.topic_id && this.data.topic_id.length == this.topics.length
        }
      }
    }
  }
</script>