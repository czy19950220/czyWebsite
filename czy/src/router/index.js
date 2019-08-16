import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/components/layout'

//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/canvas',
    name: 'canvas',
    meta: {title: 'canvas'},
    component: resolve => require(['@/pages/canvas/Index.vue'], resolve)
  },
  {
    path: '/login',
    name: 'user',
    meta: {title: '登录界面'},
    component: resolve => require(['@/pages/login/Index.vue'], resolve)
  },
  {
    path: '/czy',
    name: 'czy',
    meta: {title: '首页页面'},
    redirect:'/czy/dashboard',
    component: resolve => require(['@/pages/shouye/Index.vue'], resolve),
    children:[
      {
        path: 'dashboard',
        name: 'index',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component : resolve => require(['@/pages/index/Index.vue'],resolve)
      },
      {
        path: 'novel',
        name: 'novel',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component : resolve => require(['@/pages/novel/Index.vue'],resolve)
      },
      {
        path: 'flappybird',
        name: 'flappyBird',
        meta: {
          keepAlive: false // no需要被缓存
        },
        component : resolve => require(['@/pages/flappybird/Index.vue'],resolve)
      },
      {
        path: 'blogdetail',
        name: 'blogdetail',
        meta: {
          keepAlive: false // 需要被缓存
        },
        component : resolve => require(['@/pages/blog/Index.vue'],resolve)
      },
      {
        path: 'blogtable',
        name: 'blog-table',
        meta: {keepAlive: true}, // 需要被缓存
        component : resolve => require(['@/pages/blog/blogTable.vue'],resolve)
      },
      {
        path: 'echarts-barchart',
        name: 'bar-chart',
        meta: {keepAlive: false}, // 需要被缓存
        component: resolve => require(['@/pages/echarts/BarChart.vue'], resolve),
      },
      {
        path: 'echarts-polardiagram',
        name: 'polar-diagram',
        meta: {keepAlive: false}, // 需要被缓存
        component: resolve => require(['@/pages/echarts/polarDiagram.vue'], resolve),
      }

    ]
  },
  {
    path: 'echarts',
    name: 'echarts',
    meta: {keepAlive: true}, // 需要被缓存
    component: resolve => require(['@/pages/echarts/BarChart.vue'], resolve),
  },
  {
    path: '*',
    name: 'not-found',
    component: resolve => require(['@/pages/404/NotFound.vue'], resolve)
  },
]

//实例化vue的时候只挂载constantRouter
export default new Router({
  mode:'history',
  routes: constantRouterMap
});
