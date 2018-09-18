<template>
	<div>
		<!-- begin #page-loader -->
		<div id="page-loader" class="fade show">
			<span class="spinner"></span>
		</div>
		<!-- end #page-loader -->

		<!-- begin #page-container -->
		<div id="page-container" class="page-container fade page-sidebar-fixed page-header-fixed">
			<!-- begin #header -->
			<div id="header" class="header navbar-default">
				<!-- begin navbar-header -->
				<div class="navbar-header">
					<router-link class="navbar-brand" :to="{
							name: 'index'
						}">
						<span class="navbar-logo"></span>
						<b>APP后台</b>
					</router-link>
					<button type="button" class="navbar-toggle" data-click="sidebar-toggled">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>
				<!-- end navbar-header -->

				<!-- begin header-nav -->
				<ul class="navbar-nav navbar-right">
					<li class="dropdown navbar-user">
						<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
							<img src="/resource/img/user/user-13.jpg" alt="" />
							<span class="d-none d-md-inline">测试页面</span>
							<b class="caret"></b>
						</a>
						<div class="dropdown-menu dropdown-menu-right">
							<a href="javascript:;" class="dropdown-item">Edit Profile</a>
							<a href="javascript:;" class="dropdown-item">
								<span class="badge badge-danger pull-right">2</span> Inbox</a>
							<div class="dropdown-divider"></div>
							<a href="javascript:;" class="dropdown-item">Log Out</a>
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
								<div class="info">
									测试页面
									<small>天线宝宝的好朋友</small>
								</div>
							</a>
						</li>
					</ul>
					<!-- end sidebar user -->
					<!-- begin sidebar nav -->

					<ul class="nav">
						<li class="has-sub" :class="{active: mainMenu == 'sys-setting'}">
							<a href="javascript:;">
								<b class="caret"></b>
								<span>系统设置</span>
							</a>
							<ul class="sub-menu">
								<li :class="{active: nowMenu == 'role-list'}">
									<router-link :to="{
										name: 'role-list'
									}">
										<span>角色设定</span>
									</router-link>
								</li>
								<li :class="{active: nowMenu == 'account-list'}">
									<router-link :to="{
										name: 'account-list'
									}">
										<span>帐号管理</span>
									</router-link>
								</li>
							</ul>
						</li>
						<li :class="{active: nowMenu == 'app-list'}">
							<router-link :to="{
									name: 'app-list'
								}">
								<span>APP管理</span>
							</router-link>
						</li>
						<li :class="{active: nowMenu == 'message-list'}">
							<router-link :to="{
									name: 'message-list'
								}">
								<span>讯息推播</span>
							</router-link>
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
export default {
	metaInfo: {
		title: 'APP后台',
		link: [
			// { rel: 'favicon', href: 'favicon.ico' },
			{ rel: 'stylesheet', href: 'http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' },
			{ rel: 'stylesheet', href: '/resource/plugins/jquery-ui/jquery-ui.min.css' },
			// { rel: 'stylesheet', href: '/resource/plugins/bootstrap/4.1.0/css/bootstrap.min.css' },
			{ rel: 'stylesheet', href: '/resource/plugins/font-awesome/5.0/css/fontawesome-all.min.css' },
			{ rel: 'stylesheet', href: '/resource/plugins/animate/animate.min.css' },
			{ rel: 'stylesheet', href: '/resource/css/material/style.min.css' },
			{ rel: 'stylesheet', href: '/resource/css/material/style-responsive.min.css' },
			{ rel: 'stylesheet', href: '/resource/css/material/theme/default.css' },
			{ rel: 'stylesheet', href: '/resource/plugins/ionicons/css/ionicons.min.css' }
		]
	},
	computed: {
		mainMenu() {
			return this.$route.matched[1].name
		},
		nowMenu() {
			return this.$route.name
		}
	},
	mounted() {
		$(document).ready(function() {
			App.init()
		})
	}
}
</script>

<style lang="stylus">
@import '/resource/plugins/bootstrap/4.1.0/css/bootstrap.min.css'

#page-container
	th
		&.with-checkbox, &.index
			width 50px

		&.action
			width 200px

	td
		&.action
			text-align right

.ion-checkmark
	color green

.ion-close-round
	color red

.form-editor label.col-form-label
	text-align right
</style>


