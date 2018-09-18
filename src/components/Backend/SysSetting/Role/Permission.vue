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
      <h4 class="panel-title">权限</h4>
    </div>
    <div class="panel-body">
      <table class="table">
        <tbody>
          <tr>
            <td>
              <div class="col-md-12">
                系统设置
                <span class="right-content">
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      查<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      增<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      改<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      删<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="col-md-10" style="margin-left: 20px">
                功能设定
                <span class="right-content">
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      查<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      增<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      改<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      删<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="col-md-10" style="margin-left: 20px">
                角色设定
                <span class="right-content">
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      查<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      增<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      改<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      删<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                </span>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="col-md-10">
                APP管理
                <span class="right-content">
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      查<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      增<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      改<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      删<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                </span>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="col-md-10">
                推播讯息
                <span class="right-content">
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      查<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      增<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      改<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      删<input class="form-check-input" type="checkbox">
                    </label>
                  </div>
                </span>

              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="row form-group">
                <div class="col-md-12">
                  <a href="javascript:;" class="btn btn-sm btn-primary">储存</a>
                  <router-link class="btn btn-sm btn-danger" :to="{
                      name: 'role-list'
                    }">
                    取消
                  </router-link>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
