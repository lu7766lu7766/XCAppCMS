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
        <error-message :thisErrors="errors"
                       inputName="name">
        </error-message>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">图片</label>
      <div class="col-md-10">
        <!--<span v-if="data.image_id"></span>-->
        <!--<file-auto-uploader target="/news/category/upload" :data.sync="data.image" />-->
        <!--<input type="text"-->
        <!--class="form-control hide"-->
        <!--name="image_id"-->
        <!--v-validate="'required'"-->
        <!--v-model="data.image" />-->
        <!--<error-message :thisErrors="errors"-->
        <!--inputName="name">-->
        <!--</error-message>-->
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">状态</label>
      <div class="col-md-10">
        <div class="form-check form-check-inline" v-for="(name, value) in NewsCategoryStatusConf" :key="value">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" :value="value" v-model="data.status">{{ name }}
          </label>
        </div>
      </div>
    </div>

  </detail-container>
</template>

<script>
  import DetailMixins from 'mixins/common/Detail'
  import FileAutoUploader from 'src/components/shared/FileAutoUploader'

  export default {
    components: {FileAutoUploader},
    mixins: [DetailMixins],
    props: {
      NewsCategoryStatusConf: {
        type: Object,
        required: true
      }
    }
  }
</script>