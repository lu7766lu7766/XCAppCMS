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
    <h1 class="page-header">APP管理</h1>

    <router-view></router-view>

  </div>
</template>
