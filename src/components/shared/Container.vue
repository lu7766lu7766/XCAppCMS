<template>
  <div id="content" class="content">

    <slot name="header"></slot>

    <!-- begin panel -->
    <div class="panel panel-inverse">
      <div class="panel-heading">
        <div class="panel-heading-btn">
          <a href="javascript:;"
             class="btn btn-xs btn-icon btn-circle btn-default"
             data-click="panel-expand">
            <i class="fa fa-expand"></i>
          </a>
          <a href="javascript:;"
             class="btn btn-xs btn-icon btn-circle btn-warning"
             data-click="panel-collapse">
            <i class="fa fa-minus"></i>
          </a>
        </div>
        <h4 class="panel-title">列表</h4>
      </div>
      <div class="panel-body">

        <slot></slot>

      </div>
    </div>

    <slot name="detail"></slot>

  </div>
</template>
