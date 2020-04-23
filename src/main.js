import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import { Menu,MenuItem,Button,Input,Avatar,Dropdown,DropdownItem,DropdownMenu,Carousel,CarouselItem,Tabs,TabPane } from 'element-ui';
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

// 懒加载插件
Vue.use(VueLazyLoad,{
  loading: '/loading/loading-spinning-bubbles.svg',
  error: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
});

// 生产环境提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
