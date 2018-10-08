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

    <form class="form-horizontal">

      <div class="form-group row">
        <label class="col-md-2 col-form-label">推播内容</label>
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
        <label class="col-md-2 col-form-label">发布APP</label>
        <div class="col-md-10">

          <div class="form-check form-check-inline">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input" v-model="isAllChecked" />全部
            </label>
          </div>

          <div class="form-check form-check-inline" v-for="(topic, index) in topics" :key="index">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input" v-model="data.app_managements" :value="topic" />
              {{ topic.name }}
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
      topics: {
        type: Array,
        required: true
      }
    },
    computed: {
      isAllChecked: {
        set(newValue) {
          this.data.app_managements = newValue
            ? this.topics
            : []
        },
        get() {
          return this.data.app_managements && this.data.app_managements.length == this.topics.length
        }
      }
    }
  }
</script>