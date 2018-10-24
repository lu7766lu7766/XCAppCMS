<template>
  <div>
    <!-- begin #page-loader -->
    <div id="page-loader" class="fade show">
      <span class="spinner"></span>
    </div>
    <!-- end #page-loader -->

    <!-- begin #page-container -->
    <div id="page-container"
         class="page-container fade page-sidebar-fixed show page-header-fixed"
         :class="{'page-sidebar-minified': !isShowMenu}">
      <!-- begin #header -->
      <div id="header" class="header navbar-default">
        <!-- begin navbar-header -->
        <div class="navbar-header">
          <router-link class="navbar-brand" :to="{
  							name: 'welcome'
  						}">
            <span class="navbar-logo"></span>
            <b>APP</b> CMS
          </router-link>
          <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <!-- end navbar-header -->

        <!-- begin header-nav -->
        <ul class="navbar-nav navbar-right p-0">
          <li class="dropdown navbar-user">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
              <img src="/resource/img/user/user-13.jpg" alt="" />
              <span class="d-none d-md-inline" v-if="account">{{ account.display_name }}</span>
              <b class="caret"></b>
            </a>
            <div class="dropdown-menu dropdown-menu-right">

              <router-link class="dropdown-item" :to="{
                    name: 'edit-profile'
                }">个人设定
              </router-link>

              <router-link class="dropdown-item" :to="{
                    name: 'person-token-generate'
                  }">
                产生令牌
              </router-link>

              <div class="dropdown-divider"></div>
              <a href="javascript:;" class="dropdown-item" @click="logout()">
                登出
              </a>
            </div>
          </li>
        </ul>
        <!-- end header navigation right -->
      </div>
      <!-- end #header -->

      <!-- begin #sidebar -->
      <div id="sidebar" class="sidebar">
        <!-- begin sidebar scrollbar -->
        <div data-scrollbar="true" data-height="100%">
          <!-- begin sidebar user -->
          <ul class="nav">
            <li class="nav-profile">
              <a href="javascript:;" data-toggle="nav-profile">
                <div class="cover with-shadow"></div>
                <div class="image">
                  <img src="/resource/img/user/user-13.jpg" alt="" />
                </div>
                <div class="info" v-if="account">
                  {{ account.display_name }}
                </div>
              </a>
            </li>
          </ul>
          <!-- end sidebar user -->
          <!-- begin sidebar nav -->

          <ul class="nav">
            <j-menu v-for="(node, index) in menus" :key="index" :node="node" />
            <li>
              <a href="javascript:;window.open('https://hackmd.io/s/S1BT9O4q7', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500')"
                 target="">
                <i class="fas fa-external-link-square-alt" />
                <span>串接说明</span>
              </a>
            </li>
            <!-- begin sidebar minify button -->
            <li>
              <a href="javascript:;" class="sidebar-minify-btn" @click="isShowMenu = !isShowMenu">
                <i class="fa fa-angle-double-left"></i>
              </a>
            </li>
            <!-- end sidebar minify button -->
          </ul>
          <!-- end sidebar nav -->
        </div>
        <!-- end sidebar scrollbar -->
      </div>
      <div class="sidebar-bg"></div>
      <!-- end #sidebar -->

      <!-- begin #content -->
      <router-view></router-view>
      <!-- end #content -->

      <!-- end scroll to top btn -->
    </div>
  </div>
</template>

<script>
  import CheckLoginMixins from 'mixins/common/CheckLogin'
  import IndexMixins from 'mixins/common/Index'
  import {
    LoginType
  } from 'module/login'

  export default {
    metaInfo: {
      title: 'APP后台',
      link: [
        {
          rel: 'stylesheet',
          href: '/resource/plugins/ionicons/css/ionicons.min.css'
        }
      ]
    },
    mixins: [CheckLoginMixins, IndexMixins],
    components: {
      JMenu: require('@/Menu1').default
    },
    data: () => ({
      isShowMenu: true
    }),
    methods: {
      logout() {
        this.$store.commit(LoginType.clearAccessToken)
        this.$router.push({
          name: 'login'
        })
      },
      dataInit() {
        axios.all([this.getMyNodes(), this.getAccount()]).then(() =>
        {
          this.$nextTick(() =>
          {
            App.init()
          })
        })
      }
    },
    mounted() {
      this.dataInit()
    }
  }
</script>

<style lang="stylus">

  .table
    &-box
      > thead
        > tr
          > th
            border-top: 1px solid #b6c2c9 !important
            padding: 8px 10px
            font-weight: bolder;
      > tbody
        > tr
          > td
            vertical-align: middle
            padding: 5px 10px
      .btn
        line-height: 12px
    .check-box
      label
        display: none
    &-status
      width: 100px

  @media all and (max-width: 965px)
    .panel-body
      > .row
        > div
          max-width: 100%
          flex: 100%
          &.panel-search
            justify-content: flex-start !important
            margin-top: 10px

  .panel
    &-search
      select.form-control
        width: 100%
      input
        height 34px
      .form-group, .btn
        @media all and (max-width: 575px)
          width: 100% !important
          margin-right 0 !important
          margin-bottom 10px

  .form-txt
    line-height: 34px
    padding-left: 0

  .modal-header
    background-color: #2d353c
    color: #fff
    padding: 10px 15px

  .modal-footer
    button
      width: 70px
      &.btn-primary2
        background: #f59c1a
        border-color: #f59c1a
        color: #fff
        &.disabled
          background: #f59c1a
          border-color: #f59c1a
          &:focus, &:hover
            background: #f59c1a
            border-color: #f59c1a

  .badge
    padding: 3px 7px
    border-radius: 10px
    line-height: 1.25


</style>


