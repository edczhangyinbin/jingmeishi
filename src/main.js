import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from "vue-awesome-swiper";
// 6版本
// import "swiper/swiper-bundle.css";

// 5
import 'swiper/css/swiper.css'


import axios from 'axios'
// 注入过滤器
import { date } from './assets/filters';
//  a是过滤器名  b是对应的函数
Vue.filter("date",date);

Vue.prototype.axios=axios;
Vue.use(VueAwesomeSwiper /* {default options with }*/)
Vue.config.productionTip = false

// vue实例化的位置
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
