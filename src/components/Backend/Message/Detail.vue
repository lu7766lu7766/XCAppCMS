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

        <form class="form-horizontal form-bordered form-editor">
          <div class="form-group row">
            <label class="col-md-2 col-form-label">推播内容</label>
            <div class="col-md-10">
              <div class="input-group date">
                <textarea class="form-control">
                  hello
                </textarea>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-2 col-form-label">发布装置</label>
            <div class="col-md-10">
              <div class="input-group date">
                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="device" checked="" />全部
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="device" />iOS
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="device" />Android
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-2 col-form-label">发布APP</label>
            <div class="col-md-10">
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" name="publish" checked="" />全部
                </label>
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" name="publish" />期货原油投资
                </label>
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" name="publish" />彩票互动教学
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-2 col-form-label"></label>
            <div class="col-md-10">
              <div class="row row-space-10">
                <div class="col-xs-6">
                  <a href="#" class="btn btn-sm btn-primary" id="save">储存</a>
                </div>
                <div class="col-xs-6">
                  <router-link class="btn btn-sm btn-danger" :to="{
                      name: 'message-list'
                    }">
                    取消
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>

</template>
