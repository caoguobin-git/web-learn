// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';

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
