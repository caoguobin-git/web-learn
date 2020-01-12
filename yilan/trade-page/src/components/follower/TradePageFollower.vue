<template>
  <div id="trade-page-follower-info">
    <div id="trade-page-follower-title">我的交易信息</div>
    <component @changeDisplayPage="changeDisplayPage($event)" :marketPrecisions="marketPrecisions" :is="currentFollowerInfo"></component>
  </div>
</template>


<script>
  import TradePageFollowerIndex from "./TradePageFollowerIndex";
  import TradePageFollowerLogin from "./TradePageFollowerLogin";
  import TradePageFollowerDisplay from "./TradePageFollowerDisplay";
  export default {
    name: "TradePageFollower",
    props:['marketPrecisions'],
    components: {TradePageFollowerDisplay, TradePageFollowerLogin, TradePageFollowerIndex},
    data(){
      return{
        loginFxcmOk:true,
        currentFollowerInfo:'TradePageFollowerIndex'
      }
    },
    methods:{
      changeDisplayPage(event){
        this.currentFollowerInfo=event
      }
    }
  }
</script>

<style scoped>
  .el-menu-item {
    height: 30px;
    line-height: 30px;
    font-weight: bold;
  }

  #trade-page-follower-info {
    height: 100%;
    box-sizing: border-box;
    margin: 5px;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    background: white;
    overflow: hidden;
  }
  #trade-page-follower-title{
    margin: 18px 17px 8px;
    font-size: 18px;
    height: 17px;
    line-height: 17px;
    font-family: "微软雅黑", sans-serif;
    color: rgba(88,151,159,1);
    text-indent: 10px;
    border-left: 2px solid rgba(112,189,199,1);
  }
</style>
