import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import('@/Login')
    },
    {
      path: "",
      component: () => import('@/Index'),
      children: [
        {
          path: '',
          name: "index",
          component: () => import('@/Backend/Index')
        },
        {
          path: 'sys-setting',
          name: 'sys-setting',
          component: () => import('@/Backend/SysSetting/Index'),
          children: [
            {
              path: 'role',
              component: () => import('@/Backend/SysSetting/Role/Index'),
              children: [
                {
                  path: 'list',
                  name: "role-list",
                  component: () => import('@/Backend/SysSetting/Role/List')
                },
                {
                  path: 'detail',
                  name: "role-detail",
                  component: () => import('@/Backend/SysSetting/Role/Detail')
                },
                {
                  path: 'permission',
                  name: "role-permission",
                  component: () => import('@/Backend/SysSetting/Role/Permission')
                }
              ]
            },
            {
              path: 'account',
              component: () => import('@/Backend/SysSetting/Account/Index'),
              children: [
                {
                  path: 'list',
                  name: "account-list",
                  component: () => import('@/Backend/SysSetting/Account/List')
                },
                {
                  path: 'detail',
                  name: "account-detail",
                  component: () => import('@/Backend/SysSetting/Account/Detail')
                },
              ]
            }
          ]
        },
        {
          path: 'app',
          component: () => import('@/Backend/App/Index'),
          children: [
            {
              path: 'list',
              name: "app-list",
              component: () => import('@/Backend/App/List')
            },
            {
              path: 'detail',
              name: "app-detail",
              component: () => import('@/Backend/App/Detail')
            }
          ]
        },
        {
          path: 'message',
          component: () => import('@/Backend/Message/Index'),
          children: [
            {
              path: 'list',
              name: "message-list",
              component: () => import('@/Backend/Message/List')
            },
            {
              path: 'detail',
              name: "message-detail",
              component: () => import('@/Backend/Message/Detail')
            }
          ]
        }
      ]
    },
    { path: '*', redirect: '/' }
  ]
})
