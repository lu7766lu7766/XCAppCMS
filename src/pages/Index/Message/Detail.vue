<template>
  <detail-container :title="title"
                    :disabled="errors.any()"
                    @shown="show"
                    @ok="ok">

    <div class="form-group row">
      <label class="col-md-2 col-form-label">推播内容</label>
      <div class="col-md-10">
          <textarea class="form-control"
                    name="content"
                    rows="5"
                    v-validate="'required'"
                    v-model="data.content">
          </textarea>
        <error-message inputName="content" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">发布APP</label>
      <div class="col-md-10">

        <dual-list :options="topics" v-model="data.app_managements" />

      </div>
    </div>

  </detail-container>
</template>

<script>
  import DetailMixins from 'mixins/common/Detail'
  import DualList from 'src/components/Form/DualList'

  export default {
    components: {DualList},
    mixins: [DetailMixins],
    props: {
      topics: {
        type: Array,
        required: true
      }
    }
  }
</script>