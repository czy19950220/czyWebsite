import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      meta: { title: '博客首页'},
      component: resolve => require(['@/pages/index/Index.vue'],resolve)
    },
    {
      path: '/blog',
      name: 'Blog',
      component: resolve => require(['@/pages/blog/Index.vue'],resolve)
    },
    {
      path: '/login',
      name: 'user',
      meta: { title: '登录界面'},
      component: resolve => require(['@/pages/login/Index.vue'],resolve)
    }
  ]
})
