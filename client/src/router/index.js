import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './page'
import user from './user'
import store from '@/store'
Vue.use(VueRouter)
const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/page'),
      meta: { title: '首页' },
      redirect: '/index',
      children: routes
    },
    {
      path: '/user',
      component: () => import('@/views/user'),
      meta: { title: '个人中心' },
      redirect: '/user/center',
      children: user
    },
    {
      path: '/weiPay',
      component: () => import('@/views/pay/weiPay'),
      meta: { title: '微信收银台', requiresAuth: true }
    },
    {
      path: '/test',
      component: () => import('@/test')
    },
    {
      path: '*',
      component: () => import('@/views/error/404'),
      meta: { title: '资源未找到', metaTitle: '', metaDescription: '' },
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
router.beforeEach(async (to, from, next) => {
  let isLogin = true;

  // 验证该路由是否需要登陆才能访问
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    if (Vue.prototype.fnStorage.getStore('user') && Vue.prototype.fnStorage.getStore('user').id) {

    } else {
      next('/user/login');
      return
    }
  }
  next();
})
export default router
