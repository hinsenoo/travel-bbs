import Vue from 'vue';
import { Menu,MenuItem } from 'element-ui';
// 确保引入样式
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import App from './App.vue';

// 按需引入 element 组件
Vue.use(Menu);
Vue.use(MenuItem);

// 生产环境提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
