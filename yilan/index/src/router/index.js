import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TradePageMarket
  from "../../../trade-page/src/components/marketdata/TradePageMarket";

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:'/hello',
      name:'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/test',
      name:'Test',
      component:TradePageMarket
    }
  ]
})
