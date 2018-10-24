<template>
  <span class="crud-box d-inline-flex">
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        查<input class="form-check-input" type="checkbox" :value="PermissionConf.READ" v-model="roleRead">
      </label>
    </div>
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        增<input class="form-check-input" type="checkbox" :value="PermissionConf.CREATE" v-model="roleCreate">
      </label>
    </div>
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        改<input class="form-check-input" type="checkbox" :value="PermissionConf.UPDATE" v-model="roleUpdate">
      </label>
    </div>
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        删<input class="form-check-input" type="checkbox" :value="PermissionConf.DELETE" v-model="roleDelete" />
      </label>
    </div>
  </span>
</template>

<script>
  import PermissionConf from 'src/config/Permission'

  export default {
    props: {
      // myPermission: {
      //   type: Number,
      //   required: true
      // },
      rolePermission: {
        type: Number,
        required: true
      }
    },
    data: () => ({
      PermissionConf
    }),
    computed: {
      // my permission , not use now
      // myRead: myPermissionComputed('READ'),
      // myCreate: myPermissionComputed('CREATE'),
      // myUpdate: myPermissionComputed('UPDATE'),
      // myDelete: myPermissionComputed('DELETE'),
      roleRead: rolePermissionComputed('READ'),
      roleCreate: rolePermissionComputed('CREATE'),
      roleUpdate: rolePermissionComputed('UPDATE'),
      roleDelete: rolePermissionComputed('DELETE')
    },
    methods: {
      // updateMyPermission(value) {
      //   this.$emit('update:myPermission', this.myPermission + value)
      // },
      updateRolePermission(value) {
        this.$emit('update:rolePermission', this.rolePermission + value)
      }
    }
  }

  // function myPermissionComputed(key) {
  //   return {
  //     get() {
  //       return !!(this.myPermission & PermissionConf[key])
  //     },
  //     set(newValue) {
  //       this.updateMyPermission(newValue
  //         ? PermissionConf[key]
  //         : -PermissionConf[key])
  //     }
  //   }
  // }

  function rolePermissionComputed(key) {
    return {
      get() {
        return !!(this.rolePermission & PermissionConf[key])
      },
      set(newValue) {
        this.updateRolePermission(newValue
          ? PermissionConf[key]
          : -PermissionConf[key])
      }
    }
  }
</script>