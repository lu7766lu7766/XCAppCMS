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
      <label class="col-md-2 col-form-label">发布时间</label>
      <div class="col-md-10">
        <date-picker
            type="datetime"
            width="100%"
            input-class="form-control"
            name="publish_time"
            v-validate="'required'"
            format="YYYY/MM/DD HH:mm:ss"
            v-model="data.publish_time" />
        <error-message inputName="publish_time" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">内容</label>
      <div class="col-md-10">
        <vue-editor
            name="content"
            v-validate="'required'"
            v-model="data.content"
            useCustomImageHandler
            @imageAdded="handleImageAdded">
        </vue-editor>
        <error-message inputName="content" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">图片</label>
      <div class="col-md-10">
        <file-uploader
            type="image"
            validate="required"
            inputName="cover_image"
            :data="data.cover_image.files_name"
            @upload="uploadCoverImage"></file-uploader>
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

        <!--<div class="form-check form-check-inline">-->
        <!--<label class="form-check-label">-->
        <!--<input type="checkbox" class="form-check-input" name="topics" v-model="isAllChecked" />全部-->
        <!--</label>-->
        <!--</div>-->

        <!--<div class="form-check form-check-inline" v-for="(topic, index) in topics" :key="index">-->
        <!--<label class="form-check-label">-->
        <!--<input type="checkbox"-->
        <!--class="form-check-input"-->
        <!--name="topics"-->
        <!--v-validate="'required'"-->
        <!--:value="topic.id"-->
        <!--v-model="data.topic_id" />-->
        <!--{{ topic.name }}-->
        <!--</label>-->
        <!--</div>-->

        <!--<error-message inputName="content" />-->

        <dual-list :options="topics" v-model="data.app_management" />

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
      async uploadCoverImage(file) {
        var res = await this.$uploadFiles('uploadNewsImage', {
          upload_file: file
        })
        if (res.success)
        {
          this.data.used.push(res.data)
          this.data.cover_image = res.data
        }
      },
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        var res = await this.$uploadFiles('uploadNewsImage', {
          upload_file: file
        })
        if (res.success)
        {
          let url = res.data.files_url[0]
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
          this.data.used.push(res.data)
        }
      }
    },
    computed: {
      // isAllChecked: {
      //   set(newValue) {
      //     this.data.topic_id = newValue
      //       ? _.map(this.topics, 'id')
      //       : []
      //   }
      //   ,
      //   get() {
      //     return this.data.topic_id && this.data.topic_id.length == this.topics.length
      //   }
      // }
    }
  }
</script>