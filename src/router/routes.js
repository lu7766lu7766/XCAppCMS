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
        path: 'app-manage',
        name: 'app-manage-list',
        component: () => import('@/Backend/App/Manage')
      },
      {
        path: 'app-setting',
        name: 'app-setting-list',
        component: () => import('@/Backend/App/Setting')
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
      },
      {
        path: 'edit-profile',
        name: 'edit-profile',
        component: () => import('@/Backend/Profile/Index')
      },
      {
        path: 'web-link',
        name: 'web-link',
        component: () => import('@/Backend/WebLink/Index'),
        children: [
          {
            path: 'link-category',
            name: 'link-category',
            component: () => import('@/Backend/WebLink/LinkCategory/Index')
          },
          {
            path: 'link-manage',
            name: 'link-manage',
            component: () => import('@/Backend/WebLink/LinkManage/Index')
          }
        ]
      }
    ]
  },
  {path: '*', redirect: '/login'}
]