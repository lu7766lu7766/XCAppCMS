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
    }
  }
</script>