export default [
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
        name: "welcome",
        component: () => import('@/Backend/Welcome')
      },
      {
        path: 'sys-setting',
        name: 'sys-setting',
        component: () => import('@/Backend/SysSetting/Index'),
        children: [
          {
            path: 'role',
            component: () => import('@/Backend/SysSetting/Role/Index'),
            name: "role-list"
          },
          {
            path: 'account',
            component: () => import('@/Backend/SysSetting/Account/Index'),
            name: "account-list"
          }
        ]
      },
      {
        path: 'app',
        component: () => import('@/Backend/App/Index'),
        name: "app-list"
      },
      {
        path: 'message',
        component: () => import('@/Backend/Message/Index'),
        name: "message-list"
      }
    ]
  },
  { path: '*', redirect: '/login' }
]