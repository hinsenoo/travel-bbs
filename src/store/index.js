// 我们组装模块并导出 store 的地方
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex);

// 定义状态
const state ={
    // 用户信息
    userMessage: {},
    loginStatus: false,
    followingIdList: {},
    loginModal: '0',
    likeArticleIdList: {},
    collectIdList: {},
}
export default new Vuex.Store({
    state,
    actions,
    mutations
})