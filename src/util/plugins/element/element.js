import Vue from 'vue'
import { Menu,MenuItem,Button,Input,Avatar,Dropdown,DropdownItem,DropdownMenu,Carousel,CarouselItem,Tabs,TabPane,Message,Upload,Select,Option,Backtop,Progress,Loading  } from 'element-ui';
// 确保引入样式
import 'element-ui/lib/theme-chalk/index.css';
// // 动画效果
// // fade/zoom 等
// import 'element-ui/lib/theme-chalk/base.css';
// // collapse 展开折叠
// import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

// Vue.component(CollapseTransition.name, CollapseTransition)

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
Vue.use(Progress);
Vue.use(Loading);



Vue.prototype.$message = Message;
