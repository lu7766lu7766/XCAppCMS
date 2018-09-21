<template>
  <div id="content" class="content">
    <ol class="breadcrumb pull-right">
      <li class="breadcrumb-item">
        <a href="javascript:;">系统设定</a>
      </li>
      <li class="breadcrumb-item active">
        <router-link :to="{
            name: 'role-list'
          }">
          角色设定
        </router-link>
      </li>
    </ol>
    <h1 class="page-header">角色设定</h1>

    <b-alert show variant="success">編輯成功</b-alert>

    <div class="row form-group">
      <div class="col-md-12">
        <button class="btn btn-sm btn-primary" v-b-modal.modalDetail>
          新增
        </button>
        <a href="javascript:;" class="btn btn-sm btn-danger">删除</a>
      </div>
    </div>
    <!-- begin panel -->
    <div class="panel panel-inverse">
      <div class="panel-heading">
        <div class="panel-heading-btn">
          <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand">
            <i class="fa fa-expand"></i>
          </a>
          <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse">
            <i class="fa fa-minus"></i>
          </a>
        </div>
        <h4 class="panel-title">列表</h4>
      </div>
      <div class="panel-body">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th class="with-checkbox">
                <div class="checkbox checkbox-css">
                  <input type="checkbox" value="" id="table_checkbox_1">
                  <label for="table_checkbox_1">&nbsp;</label>
                </div>
              </th>
              <th class="index">#</th>
              <th>角色名称</th>
              <th>状态</th>
              <th class="action">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="with-checkbox">
                <div class="checkbox checkbox-css">
                  <input type="checkbox" value="" id="table_checkbox_2">
                  <label for="table_checkbox_2">&nbsp;</label>
                </div>
              </td>
              <td>1</td>
              <td>角色管理员</td>
              <td>
                <i class="ion-checkmark fa-lg fa-fw pull-left m-r-10"></i>
              </td>
              <td class="action">
                <button class="btn btn-sm btn-warning" v-b-modal.modalPermission>
                  权限
                </button>
                <button class="btn btn-sm btn-info" v-b-modal.modalDetail>
                  编辑
                </button>
              </td>
            </tr>
            <tr>
              <td class="with-checkbox">
                <div class="checkbox checkbox-css">
                  <input type="checkbox" value="" id="table_checkbox_2" checked="">
                  <label for="table_checkbox_2">&nbsp;</label>
                </div>
              </td>
              <td>2</td>
              <td>客服人员</td>
              <td>
                <i class="ion-close-round fa-lg fa-fw pull-left m-r-10"></i>
              </td>
              <td class="action">
                <button class="btn btn-sm btn-warning" v-b-modal.modalPermission>
                  权限
                </button>
                <button class="btn btn-sm btn-info" v-b-modal.modalDetail>
                  编辑
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <paginate />

      </div>
    </div>

    <detail />
    <permission />

  </div>
</template>

<script>
export default {
	components: {
		detail: require('./Detail').default,
		permission: require('./Permission').default
	}
}
</script>