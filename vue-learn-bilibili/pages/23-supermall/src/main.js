import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import store from "./store/store";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


import {getHomeMultiData} from "./network/home";

getHomeMultiData('pop',1).then(res=>console.log(res))
