import Vue from 'vue'
import Router from 'vue-router'
import TradePage from '@/components/trade-page'
import Test from "../components/Test";
import PageFirst from "../components/PageFirst";
import PageSecond from "../components/PageSecond";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'TradePage',
      component:TradePage
    },
    {
      path: '/hello',
      name:'TradePage',
      component: TradePage
    },
    {
      path: '/test',
      name:'Test',
      children:[
        {
          path:'page1',
          name:'page1',
          component:PageFirst
        },{
          path:'page2',
          name:'page2',
          component:PageSecond
        }
      ],
      component: Test
    }
  ]
})
