import Vue from 'vue'
import Router from 'vue-router'
import Trader from "../components/trader/Trader";
import News from "../components/news/News";
import Notice from "../components/notice/Notice";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Trader',
      component: Trader
    },
    {
      path:'/trader',
      name:'Trader',
      component: Trader
    },
    {
      path:'/news',
      name:'News',
      component: News
    },
    {
      path:'/notice',
      name:'Notice',
      component: Notice
    }
  ]
})
