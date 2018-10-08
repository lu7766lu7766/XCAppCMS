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
        <label class="col-md-2 col-form-label">角色名称</label>
        <div class="col-md-10">
          <input type="text"
                 class="form-control"
                 name="display_name"
                 v-validate="'required'"
                 v-model="data.display_name" />
          <error-message :thisErrors="errors"
                         inputName="display_name">
          </error-message>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">状态</label>
        <div class="col-md-10">
          <div class="form-check form-check-inline" v-for="(name, value) in RoleEnableConf" :key="value">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" :value="value" v-model="data.enable">{{ name }}
            </label>
          </div>

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
      RoleEnableConf: {
        type: Object,
        required: true
      }
    }
  }
</script>