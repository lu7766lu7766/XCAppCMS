<template>
  <div id="content" class="content">
    <ol class="breadcrumb pull-right">
      <li class="breadcrumb-item">
        <a href="javascript:;">系统设定</a>
      </li>
      <li class="breadcrumb-item active">
        <router-link :to="{
            name: 'role-list'
          }">
          角色设定
        </router-link>
      </li>
    </ol>
    <h1 class="page-header">角色设定</h1>

    <router-view></router-view>

  </div>
</template>
