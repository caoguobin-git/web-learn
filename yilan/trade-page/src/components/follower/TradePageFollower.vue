<template>
  <div id="trade-page-follower-info">
    <div id="trade-page-follower-title">我的交易信息</div>
    <el-menu class="el-menu-demo" default-active="2" mode="horizontal">
      <el-menu-item index="1">挂单</el-menu-item>
      <el-menu-item index="2">开仓</el-menu-item>
      <el-menu-item index="3">平仓</el-menu-item>
      <el-menu-item index="4">历史</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "TradePageFollower"
  }
</script>

<style scoped>
  .el-menu-item {
    height: 30px;
    line-height: 30px;
    font-weight: bold;
  }

  #trade-page-follower-info {
    height: 285px;
    box-sizing: border-box;
    margin: 5px;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    background: white;
    overflow: hidden;
  }
  #trade-page-follower-title{
    margin: 18px 17px;
    font-size: 18px;
    height: 17px;
    line-height: 17px;
    font-family: "微软雅黑", sans-serif;
    color: rgba(88,151,159,1);
    text-indent: 10px;
    border-left: 2px solid rgba(112,189,199,1);
  }
</style>
