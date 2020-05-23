import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import axios from 'axios';
import VueAxios from 'vue-axios'
import { Menu,MenuItem,Button,Input,Avatar,Dropdown,DropdownItem,DropdownMenu,Carousel,CarouselItem,Tabs,TabPane,Message,Upload,Select,Option,Backtop } from 'element-ui';
// 确保引入样式
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import App from './App.vue';

// 按需引入 element 组件
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Button);
Vue.use(Input);
Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Upload);
Vue.use(Select);
Vue.use(Option);
Vue.use(Backtop);
Vue.component(Message.name, Message);
// 挂载的 vue 实例的原型
Vue.prototype.$message = Message;
// 挂载 axios
Vue.use(VueAxios,axios);

// 懒加载插件
Vue.use(VueLazyLoad,{
  loading: '/loading/loading-bubbles.svg',
  error: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
});

// 超时设置 8s
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.interceptors.response.use(function (response){
  // 直接取得响应的 data
  let res = response.data;
  // 业务错误拦截
  if(response.status == 200){
    return res;
  }else{
    // 抛出异常
    Message.warning(res.msg);
    return Promise.reject(res);
  }
},(error)=>{
  // 请求错误拦截 http 状态码
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

// 生产环境提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
