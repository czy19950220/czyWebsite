import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

const state = {
  users: {},//存储用户信息
  isAuthenicated: false,
  user: null,
  chapters: [],//章节
  sourceId: '',//小说id
  isCollapse: true,//导航
  tagMenu: [
    {
      closable:false,
      tagName: 'Index',
      tagRouter: '/czy/dashboard',
      breadcrumb: 'Index'
    }
  ],//导航标签和面包屑
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
