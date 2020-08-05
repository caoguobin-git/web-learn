import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import store from "./store/store";

Vue.config.productionTip = false

//使用一个空的Vue实例作为消息总线
Vue.prototype.$bus=new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

