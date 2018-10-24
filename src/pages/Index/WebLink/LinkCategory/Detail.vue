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
        <!--<input type="text"-->
        <!--class="form-control"-->
        <!--name="name"-->
        <!--v-validate="'required'"-->
        <!--v-model="data.name" />-->
        <!--<error-message :thisErrors="errors"-->
        <!--inputName="name">-->
        <!--</error-message>-->
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">状态</label>
      <div class="col-md-10">
        <div class="form-check form-check-inline" v-for="(name, value) in LinkCategoryEnableConf" :key="value">
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

  export default {
    mixins: [DetailMixins],
    props: {
      LinkCategoryEnableConf: {
        type: Object,
        required: true
      }
    }
  }
</script>