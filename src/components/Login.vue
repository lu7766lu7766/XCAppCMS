<template>
  <div>
    <div id="page-loader" class="fade show">
      <span class="spinner"></span>
    </div>
    <!-- end #page-loader -->

    <div class="login-cover">
      <div class="login-cover-image" style="background-image: url(/resource/img/login-bg/login-bg-17.jpg)" data-id="login-cover-image"></div>
      <div class="login-cover-bg"></div>
    </div>
    <!-- begin #page-container -->
    <div id="page-container" class="fade">
      <!-- begin login -->
      <div class="login login-v2" data-pageload-addclass="animated fadeIn">
        <!-- begin brand -->
        <div class="login-header">
          <div class="brand">
            <span class="logo"></span>
            <b>APP</b> CMS
          </div>
          <div class="icon">
            <i class="fa fa-lock"></i>
          </div>
        </div>
        <!-- end brand -->
        <!-- begin login-content -->
        <div class="login-content">
          <div class="form-group m-b-20">
            <input type="text" class="form-control form-control-lg" placeholder="Email Address" required v-model="user.username" />
          </div>
          <div class="form-group m-b-20">
            <input type="password" class="form-control form-control-lg" placeholder="Password" required v-model="user.password" />
          </div>
          <div class="form-group login-buttons">
            <button type="button" class="btn btn-success btn-block btn-lg" @click="doLogin()">登入</button>
          </div>

          <b-alert variant="danger" :show="!request.result">登入失敗</b-alert>

        </div>
        <!-- end login-content -->
      </div>
      <!-- end login -->

      <ul class="login-bg-list clearfix">
        <li class="active">
          <a href="javascript:;" data-click="change-bg" data-img="/resource/img/login-bg/login-bg-17.jpg" style="background-image: url(/resource/img/login-bg/login-bg-17.jpg)"></a>
        </li>
        <li>
          <a href="javascript:;" data-click="change-bg" data-img="/resource/img/login-bg/login-bg-16.jpg" style="background-image: url(/resource/img/login-bg/login-bg-16.jpg)"></a>
        </li>
        <li>
          <a href="javascript:;" data-click="change-bg" data-img="/resource/img/login-bg/login-bg-15.jpg" style="background-image: url(/resource/img/login-bg/login-bg-15.jpg)"></a>
        </li>
        <li>
          <a href="javascript:;" data-click="change-bg" data-img="/resource/img/login-bg/login-bg-14.jpg" style="background-image: url(/resource/img/login-bg/login-bg-14.jpg)"></a>
        </li>
        <li>
          <a href="javascript:;" data-click="change-bg" data-img="/resource/img/login-bg/login-bg-13.jpg" style="background-image: url(/resource/img/login-bg/login-bg-13.jpg)"></a>
        </li>
        <li>
          <a href="javascript:;" data-click="change-bg" data-img="/resource/img/login-bg/login-bg-12.jpg" style="background-image: url(/resource/img/login-bg/login-bg-12.jpg)"></a>
        </li>
      </ul>

    </div>
  </div>
</template>

<script >
import { LoginType } from 'module/login'

export default {
	metaInfo: {
		title: 'Login',
		link: [
			{ rel: 'stylesheet', href: '/resource/plugins/jquery-jvectormap/jquery-jvectormap.css' },
			{ rel: 'stylesheet', href: '/resource/assets/plugins/bootstrap-calendar/css/bootstrap_calendar.css' },
			{ rel: 'stylesheet', href: '/resource/plugins/gritter/css/jquery.gritter.css' },
			{ rel: 'stylesheet', href: '/resource/plugins/nvd3/build/nv.d3.css' }
		]
	},
	data: () => ({
		user: {
			username: 'jacc',
			password: 'jaccis666'
		},
		request: {
			result: true
		}
	}),
	methods: {
		async doLogin() {
			var res = await this.$callApi('doLogin', this.user)
			if (res.success) {
				this.$store.commit(LoginType.setAccessToken, res.data)
				this.$router.push({
					name: 'welcome'
				})
			} else {
				this.request.result = false
			}
		}
	},
	created() {},
	mounted() {
		$(document).ready(function() {
			App.init()
		})
	}
}
</script>