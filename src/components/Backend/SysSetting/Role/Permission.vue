<template>

  <b-modal id="modalPermission" size="lg" ok-title="储存" cancel-title="取消">

    <div slot="modal-header">
      <h5 class="modal-title">權限</h5>
    </div>

    <form class="form-horizontal form-bordered form-editor">

      <div class="jstree-default">
        <ul>
          <li>
            系统设置
            <crud />
            <ul>
              <li class="jstree-leaf">
                <i class="jstree-icon jstree-ocl" role="presentation"></i>
                角色設定
                <crud />
              </li>
              <li class="jstree-leaf">
                <i class="jstree-icon jstree-ocl" role="presentation"></i>
                帳號管理
                <crud />
              </li>
            </ul>
          </li>
          <li>
            APP管理
            <crud />
          </li>
          <li>
            訊息推播
            <crud />
          </li>
        </ul>
      </div>
    </form>

  </b-modal>
</template>

<script>
export default {
	components: {
		crud: require('@/shared/CRUD.vue').default
	},
	mounted() {}
}
</script>
<style lang="stylus" scoped>
@import '/resource/plugins/jstree/dist/themes/default/style.min.css'

.jstree-default ul
  padding-left 0px

  li
    list-style-type none
</style>
