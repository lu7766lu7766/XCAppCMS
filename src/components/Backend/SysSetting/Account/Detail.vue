<template>
  <section>
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
        <h4 class="panel-title">新增/编辑</h4>
      </div>
      <div class="panel-body">
        <table class="table table-editor">
          <tbody>
            <tr>
              <td width=200>帐号</td>
              <td><input type="text" class="form-control" value="account" /></td>
            </tr>
            <tr>
              <td>密码</td>
              <td><input type="text" class="form-control" value="password" /></td>
            </tr>
            <tr>
              <td>暱称</td>
              <td><input type="text" class="form-control" value="nick name" /></td>
            </tr>
            <tr>
              <td>角色</td>
              <td>
                <select class="form-control">
                  <option>系统管理者</option>
                  <option>大总监</option>
                  <option>总监</option>
                  <option>代理</option>
                  <option>会员</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                状态
              </td>
              <td class="with-radio">
                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="status" checked="">启用
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="status">关闭
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <a href="#" class="btn btn-sm btn-primary">储存</a>
                <router-link class="btn btn-sm btn-danger" :to="{
                    name: 'role-list'
                  }">
                  取消
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
