import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/Index'
import Blog from '@/pages/blog/Index'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Blog',
      name: 'Blog',
      component: Blog
    }
  ]
})
