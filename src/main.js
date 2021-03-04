import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import md5 from 'js-md5'
import VueCookie from 'vue-cookie'
import api from './util/api/index'
import axios from './util/plugins/axios/index'
import './util/plugins/element/element'
// import infiniteScroll from 'vue-infinite-scroll'
import InfiniteLoading from 'vue-infinite-loading';
import store from './store'
import router from './router/router';
import App from './App.vue';
import storage from './util/storage'

// 对html标签进行转码
let Base64 = require('js-base64').Base64;


Vue.prototype.$Base64 = Base64;
Vue.prototype.$md5 = md5;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$storage = storage;


// 懒加载插件
Vue.use(VueLazyLoad,{
  loading: '/loading/loading-bubbles.svg',
  error: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
});
Vue.use(InfiniteLoading);
Vue.use(VueCookie);

// // 超时设置 8s
// axios.defaults.timeout = 8000;
// // 根据环境变量获取不同的请求地址
// // axios.defaults.baseURL = env.baseURL;
// // 接口错误拦截
// axios.interceptors.response.use(function (response){
//   // 直接取得响应的 data
//   let res = response.data;
//   // 业务错误拦截
//   if(response.status == 200){
//     return res;
//   }else{
//     // 抛出异常
//     Message.warning(res.msg);
//     return Promise.reject(res);
//   }
// },(error)=>{
//   // 请求错误拦截 http 状态码
//   let res = error.response;
//   Message.error(res.data.message);
//   return Promise.reject(error);
// });

// 生产环境提示
Vue.config.productionTip = false

new Vue({
  // vuex
  store,
  router,
  render: h => h(App),
}).$mount('#app')
