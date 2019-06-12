// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import router from './router'
import store from './store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css';
import $ from "jquery";//引入jquery
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
require('es6-promise').polyfill();
import axios from './http';

// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min.js')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')
require ('froala-editor/js/languages/zh_cn')

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$JsonBird = 'https://bird.ioliu.cn/v1/?url=';//用来转请求的地址，跨域所以转一下读书神器的连接（也可以使用nodejs转，但是自己的电脑关了之后就无法访问了）
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  NProgress.start()
  const isLogin = localStorage.token ? true : false;
  //console.log(localStorage.token)
  if (to.path == "/login" || to.path == "/register") {
    next();
    NProgress.done();
  } else {
    isLogin ? next() : next("/login");
    NProgress.done();
  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
