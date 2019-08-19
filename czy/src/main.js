// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
require('es6-promise').polyfill();
import axios from './http';

//echarts
/**region*/
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
// 如果需要配合 ECharts 扩展使用，只需要直接引入扩展包即可
// 以 ECharts-GL 为例：
// 需要安装依赖：npm install --save echarts-gl，并添加如下引用
import 'echarts-gl'
// 注册组件后即可使用
Vue.component('v-chart', ECharts)
/*endregion*/

// Import and use Vue Froala lib.

Vue.use(ElementUI);
//import 'styles/index.scss' // global css

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$sIP2 = 'https://czy-15736873451.club:3003';
Vue.prototype.$sIP = 'https://118.25.73.39:3003';
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
