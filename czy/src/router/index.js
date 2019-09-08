import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/pages/shouye/Index.vue';

//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
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
            meta: {keepAlive: true,title: '柱状图'}, // 需要被缓存
            component: resolve => require(['@/pages/echarts/BarChart.vue'], resolve),
          },
          {
            path: 'polardiagram',
            name: 'polar-diagram',
            meta: {keepAlive: true,title: '极坐标图'}, // 需要被缓存
            component: () => import ('@/pages/echarts/polarDiagram.vue'),
          },
          {
            path: 'piechart',
            name: 'pie-chart',
            meta: {keepAlive: true,title: '饼状图'}, // 需要被缓存
            component: () => import ('@/pages/echarts/PieChart.vue'),
          },
          {
            path: 'scatterplot',
            name: 'scatter-plot',
            meta: {keepAlive: true,title: '散点图'}, // 需要被缓存
            component: () => import ('@/pages/echarts/ScatterPlot.vue'),
          },
          {
            path: 'map',
            name: 'map',
            meta: {keepAlive: true,title: '地图'}, // 需要被缓存
            component: () => import ('@/pages/echarts/Map.vue'),
          },
          {
            path: 'radar',
            name: 'RadarChart',
            meta: {keepAlive: true,title: '能力雷达图'}, // 需要被缓存
            component: () => import ('@/pages/echarts/RadarChart.vue'),
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
  routes: constantRouterMap
});
