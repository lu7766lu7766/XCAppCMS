<template>
  <section>

    <b-alert show variant="success">新增成功</b-alert>

    <div class="row form-group">
      <div class="col-md-6">
        <router-link class="btn btn-sm btn-primary" :to="{
              name: 'account-detail'
            }">
          新增
        </router-link>
        <a href="javascript:;" class="btn btn-sm btn-danger">删除</a>
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
              <th class="with-checkbox" width=100>
                <div class="checkbox checkbox-css">
                  <input type="checkbox" value="" id="table_checkbox_1">
                  <label for="table_checkbox_1">&nbsp;</label>
                </div>
              </th>
              <th class="index">#</th>
              <th>帐号</th>
              <th>暱称</th>
              <th>角色名称</th>
              <th>状态</th>
              <th>最后登入IP</th>
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
              <td>admin</td>
              <td>管理员</td>
              <td>系统管理员</td>
              <td>
                <i class="ion-checkmark fa-lg fa-fw pull-left m-r-10"></i>
              </td>
              <td>127.0.0.1</td>
              <td class="action">
                <router-link class="btn btn-sm btn-info" :to="{
                      name: 'account-detail'
                    }">
                  编辑
                </router-link>
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
              <td>arron</td>
              <td>管理员</td>
              <td>系统管理员</td>
              <td>
                <i class="ion-close-round fa-lg fa-fw pull-left m-r-10"></i>
              </td>
              <td>10.10.1.3</td>
              <td class="action">
                <router-link class="btn btn-sm btn-info" :to="{
                      name: 'account-detail'
                    }">
                  编辑
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <paginate />

      </div>
    </div>
  </section>
</template>