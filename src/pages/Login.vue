<template>
  <div>
    <div
        id="page-loader"
        class="fade show">
      <span class="spinner"></span>
    </div>
    <!-- end #page-loader -->

    <div class="login-cover">
      <!-- <div class="login-cover-image"
           :style="{'background-image': `url(${bgImg})`}">
      </div> -->
      <div class="login-cover-bg"></div>
    </div>
    <!-- begin #page-container -->
    <div
        id="page-container"
        class="fade">
      <!-- begin login -->
      <div class="login bg-black animated fadeInDown">
        <!-- begin brand -->
        <div class="login-header">
          <div class="brand">
              <span class="logo"></span> <b>APP</b> CMS
              <small>APP相关设定管理系统</small>
          </div>
          <div class="icon">
              <i class="fa fa-lock"></i>
          </div>
        </div>
        <!-- end brand -->
        <!-- begin login-content -->
        <div class="login-content">
          <div class="form-group m-b-20">
            <input
                type="text" class="form-control form-control-lg inverse-mode" placeholder="帐号" required
                v-model="user.username"
                @keyup.13="doLogin()" />
          </div>
          <div class="form-group m-b-20">
            <input
                type="password" class="form-control form-control-lg inverse-mode" placeholder="密码" required
                v-model="user.password"
                @keyup.13="doLogin()" />
          </div>

          <div class="form-group login-buttons">
            <button
                type="button"
                class="btn btn-success btn-block btn-lg"
                @click="doLogin()">登入
            </button>
          </div>

          <b-alert
              variant="danger"
              :show="!requestResult.result">
            登入失敗
          </b-alert>

        </div>
        <!-- end login-content -->
      </div>
      <!-- end login -->

      <!-- <ul class="login-bg-list clearfix">
        <li class="active">
          <a style="background-image: url(/resource/img/login-bg/login-bg-17.jpg)"
             @click="bgImg='/resource/img/login-bg/login-bg-17.jpg'"></a>
        </li>
        <li>
          <a style="background-image: url(/resource/img/login-bg/login-bg-16.jpg)"
             @click="bgImg='/resource/img/login-bg/login-bg-16.jpg'"></a>
        </li>
        <li>
          <a style="background-image: url(/resource/img/login-bg/login-bg-15.jpg)"
             @click="bgImg='/resource/img/login-bg/login-bg-15.jpg'"></a>
        </li>
        <li>
          <a style="background-image: url(/resource/img/login-bg/login-bg-14.jpg)"
             @click="bgImg='/resource/img/login-bg/login-bg-14.jpg'"></a>
        </li>
        <li>
          <a style="background-image: url(/resource/img/login-bg/login-bg-13.jpg)"
             @click="bgImg='/resource/img/login-bg/login-bg-13.jpg'"></a>
        </li>
        <li>
          <a style="background-image: url(/resource/img/login-bg/login-bg-12.jpg)"
             @click="bgImg='/resource/img/login-bg/login-bg-12.jpg'"></a>
        </li>
      </ul> -->

    </div>
  </div>
</template>

<script>
  import { LoginType } from 'module/login'

  export default {
    metaInfo: {
      title: 'Login',
      link: [
        {
          rel: 'stylesheet',
          href: '/resource/plugins/jquery-jvectormap/jquery-jvectormap.css'
        },
        {
          rel: 'stylesheet',
          href: '/resource/plugins/bootstrap-calendar/css/bootstrap_calendar.css'
        },
        {
          rel: 'stylesheet',
          href: '/resource/plugins/gritter/css/jquery.gritter.css'
        },
        {
          rel: 'stylesheet',
          href: '/resource/plugins/nvd3/build/nv.d3.css'
        }
      ]
    },
    watch: {
      request(newValue) {
        if (newValue.result != null)
        {
          setTimeout(() =>
          {
            this.requestResult.result = null
          }, 3000)
        }
      }
    },
    data: () => ({
        user: {
          username: '', //'jacc',
          password: '' //'jaccis666'
        },
        bgImg: '/resource/img/login-bg/login-bg-17.jpg',
        requestResult: {
          result: true
        }
      }
    ),
    methods: {
      async doLogin() {
        var res = await this.$callApi('doLogin', this.user)
        if (res.success)
        {
          this.$store.commit(LoginType.setAccessToken, res.data)
          this.$router.push({
            name: 'welcome'
          })
        }
        else
        {
          this.requestResult.result = false
        }
      }
    },
    mounted() {
      $(document).ready(() =>
      {
        App.init()
      })
    }
  }
</script>
<style lang="stylus" scoped>
  .login-cover-bg
    background:#d9e0e7
  .btn-success:hover
    background: #008a8a !important;
    border-color: #008a8a !important;
</style>

