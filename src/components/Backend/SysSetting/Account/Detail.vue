<template>
  <b-modal id="modalDetail" size="lg" ok-title="储存" cancel-title="取消">

    <div slot="modal-header">
      <h5 class="modal-title">新增/编辑</h5>
    </div>

    <form class="form-horizontal form-bordered form-editor">
      <div class="form-group row">
        <label class="col-md-2 col-form-label">帐号</label>
        <div class="col-md-10">
          <input type="text" class="form-control" value="account" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">密码</label>
        <div class="col-md-10">
          <input type="password" class="form-control" value="password" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">暱称</label>
        <div class="col-md-10">
          <input type="text" class="form-control" value="nick name" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">角色</label>
        <div class="col-md-10">
          <select class="form-control">
            <option>系统管理者</option>
            <option>大总监</option>
            <option>总监</option>
            <option>代理</option>
            <option>会员</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">状态</label>
        <div class="col-md-10">
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
        </div>
      </div>

    </form>

  </b-modal>
</template>
