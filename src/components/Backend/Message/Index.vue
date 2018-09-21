<template>
  <div id="content" class="content">
    <ol class="breadcrumb pull-right">
      <li class="breadcrumb-item active">
        <router-link :to="{
              name: 'message-list'
            }">
          讯息管理
        </router-link>
      </li>
    </ol>
    <h1 class="page-header">讯息管理</h1>

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
              <th>推播内容</th>
              <th>装置</th>
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
              <td>lasdjflkjaslkfjaslkfjadsklfj</td>
              <td>期货原油投资</td>
              <td class="action">
                <button class="btn btn-sm btn-info" v-b-modal.modalDetail>
                  编辑
                </button>
                <a href="#" class="btn btn-sm btn-warning">推播</a>
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
              <td>asdklfjoiaejfkalmdlkal</td>
              <td>彩票互动教学</td>
              <td class="action">
                <button class="btn btn-sm btn-info" v-b-modal.modalDetail>
                  编辑
                </button>
                <a href="#" class="btn btn-sm btn-warning">推播</a>
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
	}
}
</script>