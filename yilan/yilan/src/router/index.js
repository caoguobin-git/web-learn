import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/login-page/login-page'
import LoginBox from "../components/login-page/LoginBox";
import RegisterBox from "../components/login-page/RegisterBox";
import TradePage from "../components/trade-page/TradePage";
import TraderOpen from "../components/trade-page/trader/trader-open/TraderOpen";
import TraderClose from "../components/trade-page/trader/trader-close/TraderClose";
import FollowerClose from "../components/trade-page/follower/follower-close/FollowerClose";
import FollowerOpen from "../components/trade-page/follower/follower-open/FollowerOpen";
import TradePageTrader from "../components/trade-page/trader/TradePageTrader";
import TradePageFollower from "../components/trade-page/follower/TradePageFollower";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        trader: TradePageTrader,
        follower: TradePageFollower
      }
    }, {
      path: '/trade',
      name: 'TradePage',
      component:TradePage,
      children:[
        {path:'/follower',name:'TradePageFollower',component:TradePageFollower},
        {path:'/trader',name:'TradePageTrader',component:TradePageTrader}
      ]
    },
    {
      path:'/trade/follower/open',
      name:'/FollowerOpen',
      components:{
        trader:TraderOpen,
        follower:FollowerOpen
      }
    },
    {
      path:'/trade/trader/open',
      name:'/TraderOpen',
      components:{
        trader:TraderOpen,
        follower:FollowerOpen
      }
    },
    {
      path:'/trade/trader/close',
      name:'/TraderOpen',
      components:{
        trader:TraderClose,
        follower:FollowerOpen
      }
    }
  ]
})
