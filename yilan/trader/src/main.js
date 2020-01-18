import router from './router'
import Vue from 'vue';

import App from './App';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';


Vue.use(Antd);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
