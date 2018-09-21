<template>
  <b-modal id="modalDetail" size="lg" ok-title="储存" cancel-title="取消">

    <div slot="modal-header">
      <h5 class="modal-title">新增/编辑</h5>
    </div>

    <form class="form-horizontal form-bordered form-editor">
      <div class="form-group row">
        <label class="col-md-2 col-form-label">代码</label>
        <div class="col-md-10">
          <input type="text" class="form-control" value="account" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">名称</label>
        <div class="col-md-10">
          <input type="text" class="form-control" value="password" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">类别</label>
        <div class="col-md-10">
          <select class="form-control">
            <option vlaue="Lottery">彩票</option>
            <option value="futures">期货</option>
            <option value="sports">体育</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">跳转开关</label>
        <div class="col-md-10">
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
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">跳转网址</label>
        <div class="col-md-10">
          <input type="text" class="form-control" value="" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">更新开关</label>
        <div class="col-md-10">
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
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">更新网址</label>
        <div class="col-md-10">
          <input type="text" class="form-control" value="url" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">更新文字</label>
        <div class="col-md-10">
          <input type="text" class="form-control" value="" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">QQ ID</label>
        <div class="col-md-10">
          <input type="text" class="form-control" value="qq" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">WeChat ID</label>
        <div class="col-md-10">
          <input type="text" class="form-control" value="wechat" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-2 col-form-label">线上客服</label>
        <div class="col-md-10">
          <input type="text" class="form-control" value="service online" />
        </div>
      </div>

    </form>

  </b-modal>
</template>
