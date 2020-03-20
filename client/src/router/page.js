export default [
    {
        path: 'index',
        component: () => import('@/views/page/home'),
        meta: { title: '首页', keywords: '', description: '' },
        children: [{ path: 'index', redirect: '/' }]
    },
    {
        path: 'goods',
        component: () => import('@/views'),
        meta: { title: '货源中心' },
        redirect: 'goods/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/page/goods'),
                meta: { title: '货源中心', keywords: '', description: '' },
            },
            {
                path: 'group/:groupId/:listId?',
                component: () => import('@/views/page/goods/group'),
                meta: { title: '商品分类', keywords: '', description: '' }
            },
            {
                path: 'details/:id',
                component: () => import('@/views/page/goods/details'),
                meta: { title: '商品详情', keywords: '', description: '' }
            },
        ]
    },
    {
        path: 'shops',
        component: () => import('@/views'),
        meta: { title: '网店装修' },
        redirect: 'shops/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/page/shops'),
                meta: { title: '网店装修', keywords: '', description: '' },
            },
            {
                path: 'details/:id',
                component: () => import('@/views/page/shops/details'),
                meta: { title: '模板介绍', keywords: '', description: '' }
            }
        ]
    },
    {
        path: 'videos',
        component: () => import('@/views'),
        meta: { title: '视频教程' },
        redirect: '/videos/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/page/videos'),
                meta: { title: '视频教程', keywords: '', description: '' }
            },
            {
                path: 'details/:id',
                component: () => import('@/views/page/videos/details'),
                meta: { title: '视频教程', keywords: '', description: '' }
            }, {
                path: 'play/:courseId/:videoId?',
                component: () => import('@/views/page/videos/play'),
                meta: { title: '播放视频', keywords: '', description: '' }
            },
        ]
    },
    {
        path: 'casess',
        component: () => import('@/views'),
        redirect: 'casess/index',
        meta: { title: '成功案例', },
        children: [
            {
                path: 'index',
                component: () => import('@/views/page/casess'),
                meta: { title: '成功案例', keywords: '', description: '' },
            }, {
                path: 'details/:id',
                component: () => import('@/views/page/casess/details'),
                meta: { title: '成功案例', keywords: '', description: '' },
            }
        ]
    },
    {
        path: 'online',
        component: () => import('@/views'),
        meta: { title: '行业动态', keywords: '', description: '' },
        redirect: 'online/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/page/online'),
                meta: { title: '行业动态', keywords: '', description: '' },
            }, {
                path: 'details/:id',
                component: () => import('@/views/page/online/details'),
                meta: { title: '行业动态', keywords: '', description: '' },
            }
        ]
    },
    {
        path: 'about/:id?',
        component: () => import('@/views/page/about'),
        meta: { title: '关于我们', metaTitle: '', metaDescription: '' }
    },
    {
        path: '/pay/:id',
        isShow: false,
        component: () => import('@/views/pay'),
        meta: { title: '收银台', requiresAuth: true },
    },

]
