// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import router from './router'
import store from './store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from "jquery";//引入jquery
require('es6-promise').polyfill();

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$JsonBird = 'https://bird.ioliu.cn/v1/?url=';//用来转请求的地址，跨域所以转一下读书神器的连接（也可以使用nodejs转，但是自己的电脑关了之后就无法访问了）
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
