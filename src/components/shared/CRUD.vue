<template>
  <span class="right-content">
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        查<input class="form-check-input" type="checkbox" :value="PermissionConf.READ" v-model="mRead">
      </label>
    </div>
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        增<input class="form-check-input" type="checkbox" :value="PermissionConf.CREATE" v-model="mCreate">
      </label>
    </div>
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        改<input class="form-check-input" type="checkbox" :value="PermissionConf.UPDATE" v-model="mUpdate">
      </label>
    </div>
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        删<input class="form-check-input" type="checkbox" :value="PermissionConf.DELETE" v-model="mDelete" />
      </label>
    </div>
  </span>
</template>

<script>
  import PermissionConf from 'src/config/Permission'

  export default {
    props: {
      permission: {
        type: Number,
        required: true
      }
    },
    data: () => ({
      PermissionConf
    }),
    computed: {
      mRead: permissionComputed('READ'),
      mCreate: permissionComputed('CREATE'),
      mUpdate: permissionComputed('UPDATE'),
      mDelete: permissionComputed('DELETE')
    },
    methods: {
      updatePermission(value) {
        this.$emit('update:permission', this.permission + value)
      }
    }
  }

  function permissionComputed(key) {
    return {
      get() {
        return !!(this.permission & PermissionConf[key])
      },
      set(newValue) {
        this.updatePermission(newValue
          ? PermissionConf[key]
          : -PermissionConf[key])
      }
    }
  }
</script>