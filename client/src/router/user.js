export default [
    {
        path: 'center',
        component: () => import('@/views/user/center'),
        meta: {
            title: '个人中心', keywords: '', description: '', requiresAuth: true
        },
        redirect: 'center/account',
        children: [
            // { path: 'index', component: () => import('@/views/user/center/index/index'), meta: { title: '个人中心', keywords: '', description: '' } },
            { path: 'account', component: () => import('@/views/user/center/account'), meta: { title: '账户资料', keywords: '', description: '' } },
            { path: 'order', component: () => import('@/views/user/center/order'), meta: { title: '订单管理', keywords: '', description: '' } },
            { path: 'video', component: () => import('@/views/user/center/video'), meta: { title: '学习记录', keywords: '', description: '' } },
            { path: 'service', component: () => import('@/views/user/center/service'), meta: { title: '服务市场', keywords: '', description: '' } },
            { path: 'sign', mobile: true, component: () => import('@/views/user/center/sign'), meta: { title: '在线签合同', keywords: '', description: '' } },
            { path: 'look', mobile: true, component: () => import('@/views/user/center/look'), meta: { title: '查看合同', keywords: '', description: '' } },
        ]
    },
    { path: 'login', component: () => import('@/views/user/login'), meta: { title: '用户登陆', keywords: '', description: '' } },
    { path: 'register', component: () => import('@/views/user/register'), meta: { title: '用户注册', keywords: '', description: '' } },
    { path: 'retrieve', component: () => import('@/views/user/retrieve'), meta: { title: '找回密码', keywords: '', description: '' } },
    { path: 'center/service/details/:id', component: () => import('@/views/user/center/service/details'), meta: { title: '服务市场', keywords: '', description: '' } },
]
