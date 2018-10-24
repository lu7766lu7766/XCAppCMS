export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login')
  },
  {
    path: '',
    component: () => import('pages/Index'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('pages/Index/Welcome')
      },
      {
        path: 'sys-setting',
        name: 'sys-setting',
        component: () => import('pages/Index/SysSetting/Index'),
        children: [
          {
            path: 'role',
            name: 'role-list',
            component: () => import('pages/Index/SysSetting/Role/Index')
          },
          {
            path: 'account',
            name: 'account-list',
            component: () => import('pages/Index/SysSetting/Account/Index')
          }
        ]
      },
      {
        path: 'app-manage',
        name: 'app-manage-list',
        component: () => import('pages/Index/App/Manage')
      },
      {
        path: 'app-setting',
        name: 'app-setting-list',
        component: () => import('pages/Index/App/Setting')
      },
      {
        path: 'message',
        name: 'message-list',
        component: () => import('pages/Index/Message/Index')
      },
      {
        path: 'person-token',
        name: 'person-token-generate',
        component: () => import('pages/Index/Token/Index')
      },
      {
        path: 'edit-profile',
        name: 'edit-profile',
        component: () => import('pages/Index/Profile/Index')
      },
      {
        path: 'web-link',
        name: 'web-link',
        component: () => import('pages/Index/WebLink/Index'),
        children: [
          {
            path: 'link-category',
            name: 'link-category',
            component: () => import('pages/Index/WebLink/LinkCategory/Index')
          },
          {
            path: 'link-manage',
            name: 'link-manage',
            component: () => import('pages/Index/WebLink/LinkManage/Index')
          }
        ]
      },
      ,
      {
        path: 'news',
        name: 'news',
        component: () => import('pages/Index/WebLink/Index'),
        children: [
          {
            path: 'category',
            name: 'news-category',
            component: () => import('pages/Index/News/Category/Index')
          },
          {
            path: 'manage',
            name: 'news-manage',
            component: () => import('pages/Index/News/Manage/Index')
          }
        ]
      }
    ]
  },
  {path: '*', redirect: '/login'}
]