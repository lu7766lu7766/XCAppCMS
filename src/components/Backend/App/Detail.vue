<template>
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
            <td width=200>代码</td>
            <td><input type="text" class="form-control" value="account" /></td>
          </tr>
          <tr>
            <td>名称</td>
            <td><input type="text" class="form-control" value="password" /></td>
          </tr>

          <tr>
            <td>类别</td>
            <td>
              <select class="form-control">
                <option vlaue="Lottery">彩票</option>
                <option value="futures">期货</option>
                <option value="sports">体育</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              跳转开关
            </td>
            <td class="with-radio">
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="redirect">启用
                </label>
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="redirect" checked="">关闭
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>跳转网址</td>
            <td><input type="text" class="form-control" value="" /></td>
          </tr>
          <tr>
            <td>
              更新开关
            </td>
            <td class="with-radio">
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="update">启用
                </label>
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="update" checked="">关闭
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>更新网址</td>
            <td><input type="text" class="form-control" value="url" /></td>
          </tr>
          <tr>
            <td>更新文字</td>
            <td><input type="text" class="form-control" value="" /></td>
          </tr>
          <tr>
            <td>QQ ID</td>
            <td><input type="text" class="form-control" value="qq" /></td>
          </tr>
          <tr>
            <td>WeChat ID</td>
            <td><input type="text" class="form-control" value="wechat" /></td>
          </tr>
          <tr>
            <td>线上客服</td>
            <td><input type="text" class="form-control" value="service online" /></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <a href="#" class="btn btn-sm btn-primary">储存</a>
              <router-link class="btn btn-sm btn-danger" :to="{
                    name: 'app-list'
                  }">
                取消
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
