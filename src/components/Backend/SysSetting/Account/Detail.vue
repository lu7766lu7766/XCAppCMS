<template>
  <b-modal id="modalDetail" size="lg" ok-title="储存" cancel-title="取消" @ok="ok">

    <div slot="modal-header">
      <h5 class="modal-title">{{ title }}</h5>
    </div>

    <form class="form-horizontal form-bordered form-editor">
      <div class="form-group row">
        <label class="col-md-2 col-form-label">帐号</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="data.account" :readonly="method == 'put'" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">密码</label>
        <div class="col-md-10">
          <input type="password" class="form-control" v-model="data.password" placeholder="长度至少4码" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">密码确认</label>
        <div class="col-md-10">
          <input type="password" class="form-control" v-model="data.confirm_password" placeholder="请与密码相同" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">暱称</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="data.display_name" placeholder="长度最多10码" />
        </div>
      </div>

      <div class="form-group row" v-if="data.roles">
        <label class="col-md-2 col-form-label">角色</label>
        <div class="col-md-10">
          <select class="form-control" v-model="data.roles[0].id">
            <option v-for="(id, name) in roles" :key="id" :value="id">{{ name }}</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">状态</label>
        <div class="col-md-10">
          <div class="form-check form-check-inline" v-for="(key, name) in status" :key="key">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" name="status" :value="key" v-model="data.status">{{ name}}
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
		roles: {
			type: Object,
			required: true
		},
		status: {
			type: Object,
			required: true
		}
	}
}
</script>