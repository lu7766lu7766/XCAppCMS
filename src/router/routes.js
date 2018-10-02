export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/Login')
  },
  {
    path: '',
    component: () => import('@/Index'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('@/Backend/Welcome')
      },
      {
        path: 'sys-setting',
        name: 'sys-setting',
        component: () => import('@/Backend/SysSetting/Index'),
        children: [
          {
            path: 'role',
            name: 'role-list',
            component: () => import('@/Backend/SysSetting/Role/Index')
          },
          {
            path: 'account',
            name: 'account-list',
            component: () => import('@/Backend/SysSetting/Account/Index')
          }
        ]
      },
      {
        path: 'app',
        name: 'app-list',
        component: () => import('@/Backend/App/Index')
      },
      {
        path: 'message',
        name: 'message-list',
        component: () => import('@/Backend/Message/Index')
      },
      {
        path: 'person-token',
        name: 'person-token-generate',
        component: () => import('@/Backend/Token/Index')
      }
    ]
  },
  {path: '*', redirect: '/login'}
]