<template>
  <detail-container :title="title"
                    :disabled="errors.any()"
                    @shown="show"
                    @ok="ok">
    <div class="form-group row">
      <label class="col-md-2 col-form-label">帐号</label>
      <div class="col-md-10">
        <input type="text"
               class="form-control"
               name="account"
               v-validate="'required|min:4|max:32'"
               v-model="data.account"
               :readonly="method == 'put'" />
        <error-message inputName="account" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">密码</label>
      <div class="col-md-10">
        <input type="password"
               class="form-control"
               name="password"
               v-validate="method === 'post' ? 'required|min:4|max:32' : ''"
               v-model="data.password"
               placeholder="长度至少4码" />
        <error-message inputName="password" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">密码确认</label>
      <div class="col-md-10">
        <input type="password"
               class="form-control"
               name="confirm_password"
               v-validate="method === 'post' ? {required: true, min: 4, max: 32, is: data.password} : ''"
               v-model="data.confirm_password"
               placeholder="请与密码相同" />
        <error-message inputName="confirm_password" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">暱称</label>
      <div class="col-md-10">
        <input type="text"
               class="form-control"
               name="display_name"
               v-validate="'required|max:10'"
               v-model="data.display_name"
               placeholder="长度最多10码" />
        <error-message :thisErrors="errors"
                       inputName="display_name">
        </error-message>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">角色</label>
      <div class="col-md-10">
        <!--<select class="form-control" multiple v-model="data.roles">-->
        <!--<option v-for="(id, name) in roles" :key="id" :value="{ id, display_name: name}">{{ name }}</option>-->
        <!--</select>-->
        <multi-select name="roles"
                      v-validate="'required'"
                      v-model="data.roles"
                      :options="roleOptions"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      label="display_name"
                      track-by="id"
                      placeholder="请选择角色"></multi-select>
        <error-message inputName="roles" />
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

  </detail-container>
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
    },
    computed: {
      roleOptions() {
        return _.reduce(this.roles, (result, id, display_name) =>
        {
          result.push({
            id, display_name
          })
          return result
        }, [])
      }
    }
  }
</script>

<style lang="stylus">
  .account-size
    font-size: 13px
    input
      font-size: 13px
</style>
