import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/pages/shouye/Index.vue';

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
    redirect: '/czy/dashboard',
    component: resolve => require(['@/pages/shouye/Index.vue'], resolve),
    children: [
      {
        path: 'dashboard',
        name: 'index',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: resolve => require(['@/pages/index/Index.vue'], resolve)
      },
      {
        path: 'novel',
        name: 'novel',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: resolve => require(['@/pages/novel/Index.vue'], resolve)
      },
      {
        path: 'flappybird',
        name: 'flappyBird',
        meta: {
          keepAlive: false // no需要被缓存
        },
        component: resolve => require(['@/pages/flappybird/Index.vue'], resolve)
      },
      {
        path: 'blogdetail',
        name: 'blogdetail',
        meta: {
          keepAlive: false // 需要被缓存
        },
        component: resolve => require(['@/pages/blog/Index.vue'], resolve)
      },
      {
        path: 'blogtable',
        name: 'blog-table',
        meta: {keepAlive: true}, // 需要被缓存
        component: resolve => require(['@/pages/blog/blogTable.vue'], resolve)
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
export const constantRouterMap2 = [
  {
    path: '/login',
    name: 'user',
    meta: {title: '登录界面'},
    component: () => import('@/pages/login/Index.vue')
  },
  {
    path: '/canvas',
    name: 'canvas',
    meta: {title: 'canvas'},
    component: resolve => require(['@/pages/canvas/Index.vue'], resolve)
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Index',
        component: () => import('@/pages/index/Index.vue'),
        meta: {title: 'Index', icon: 'dashboard'}
      },
      {
        path: 'novel',
        name: 'novel',
        redirect: '/novel/bookrack',
        meta: {keepAlive: true,title: '小说'},// 需要被缓存
        component: () => import('@/pages/novel/Novel.vue'),
        children: [
          {
            path: 'search',
            meta: {keepAlive: true,title: '小说搜索'},// 需要被缓存
            component: () => import('@/pages/novel/Index.vue')
          },
          {
            path: 'detail',
            meta: {keepAlive: true,title: '小说详情'},// 需要被缓存
            component: () => import('@/pages/novel/Detail.vue')
          },
          {
            path: 'read',
            meta: {keepAlive: true,title: '小说阅读'},// 需要被缓存
            component: () => import('@/pages/novel/Read.vue')
          },
          {
            path: 'bookrack',
            meta: {keepAlive: false,title: '小说书架'},// 需要被缓存
            component: () => import('@/pages/novel/Bookrack.vue')
          }
        ]
      },
      {
        path: 'flappybird',
        name: 'flappyBird',
        meta: {
          keepAlive: false,title: '像素鸟' // no需要被缓存
        },
        component: () => import('@/pages/flappybird/Index.vue')
      },
      {
        path: 'blogdetail/',
        name: 'blog-detail',
        meta: {keepAlive: false,title: '博文'},// 需要被缓存
        component: () => import('@/pages/blog/Index.vue')
      },
      {
        path: 'blogtable',
        name: 'blog-table',
        meta: {keepAlive: true,title: '博文统计'}, // 需要被缓存
        component: () => import('@/pages/blog/blogTable.vue')
      },
      {
        path: 'echarts',
        name: 'echarts',
        meta: {keepAlive: true,title: 'echarts'}, // 需要被缓存
        component: resolve => require(['@/pages/echarts/Index.vue'], resolve),
        children: [
          {
            path: 'barchart',
            name: 'bar-chart',
            meta: {keepAlive: false,title: 'barchart'}, // 需要被缓存
            component: resolve => require(['@/pages/echarts/BarChart.vue'], resolve),
          },
          {
            path: 'polardiagram',
            name: 'polar-diagram',
            meta: {keepAlive: false,title: 'polar-diagram'}, // 需要被缓存
            component: () => import ('@/pages/echarts/polarDiagram.vue'),
          }
        ]
      },
    ]
  },
  {
    path: '*',
    name: 'not-found',
    component: resolve => require(['@/pages/404/NotFound.vue'], resolve)
  },
]


//实例化vue的时候只挂载constantRouter
export default new Router({
  mode: 'history',
  routes: constantRouterMap2
});
