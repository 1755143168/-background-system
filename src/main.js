import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
//引入element
// eslint-disable-next-line no-unused-vars
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入全局样式
import './assets/css/global.css'
//消息提示组件
import { Message } from "element-ui";
//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
