<template>
  <div id="content" class="content">
    <ol class="breadcrumb pull-right">
      <li class="breadcrumb-item">
        <a href="javascript:;">系统设定</a>
      </li>
      <li class="breadcrumb-item active">
        <router-link :to="{
            name: 'account-list'
          }">
          帐号管理
        </router-link>
      </li>
    </ol>
    <h1 class="page-header">帐号管理</h1>

    <router-view></router-view>

  </div>
</template>
