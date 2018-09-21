<template>
  <div id="content" class="content">
    <ol class="breadcrumb pull-right">
      <li class="breadcrumb-item active">
        <router-link :to="{
            name: 'message-list'
          }">
          APP管理
        </router-link>
      </li>
    </ol>
    <h1 class="page-header">APP管理</h1>

    <alert :show.sync="isShowAlert" styleType="danger">刪除失敗</alert>

    <div class="row form-group">
      <div class="col-md-6">
        <button type="button" class="btn btn-sm btn-primary" v-b-modal.modalDetail>
          新增
        </button>
        <button type="button" class="btn btn-sm btn-danger" @click="isShowAlert = !isShowAlert">删除</button>
      </div>
      <div class="col-md-6" style="text-align: right;">
        <div class="form-inline" style="display: block;">
          <select class="form-control">
            <option>全部</option>
            <option>系统管理员</option>
            <option>网站管理员</option>
          </select>
          <input type="text" class="form-control" placeholder="关键字" />
          <a href="javascript:;" class="btn btn-sm btn-default">搜索</a>
        </div>
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
              <th>代码</th>
              <th>名称</th>
              <th>类别</th>
              <th>跳转开关</th>
              <th>更新开关</th>
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
              <td>ABC</td>
              <td>期货原油投资</td>
              <td>期货</td>
              <td>
                <i class="ion-checkmark fa-lg fa-fw pull-left m-r-10"></i>
              </td>
              <td>
                <i class="ion-close-round fa-lg fa-fw pull-left m-r-10"></i>
              </td>
              <td class="action">
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
              <td>LLL</td>
              <td>彩票互动教学</td>
              <td>彩票</td>
              <td>
                <i class="ion-close-round fa-lg fa-fw pull-left m-r-10"></i>
              </td>
              <td>
                <i class="ion-close-round fa-lg fa-fw pull-left m-r-10"></i>
              </td>
              <td class="action">
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

  </div>
</template>

<script>
export default {
	components: {
		detail: require('./Detail.vue').default
	},
	data: () => ({
		isShowAlert: false
	})
}
</script>