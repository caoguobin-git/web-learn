<template>
<div id="trade-page-trader-info">
  <p id="trade-page-trader-title">交易员信息</p>
  <el-menu default-active="2"   mode="horizontal" >
    <el-menu-item index="1">挂单</el-menu-item>
    <el-menu-item index="2">开仓</el-menu-item>
    <el-menu-item index="3">平仓</el-menu-item>
    <el-menu-item index="4">历史</el-menu-item>
  </el-menu>
</div>
</template>

<script>
    export default {
        name: "TradePageTrader"
    }
</script>

<style scoped>
  .el-menu-item{
    height: 30px;
    line-height: 30px;
    font-weight: bold;
  }
  #trade-page-trader-info{
    height: 580px;
    border: none;
    box-sizing: border-box;
    margin: 10px 5px 5px 5px;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    overflow:hidden;
    background: white;

  }

  #trade-page-trader-title{
    text-align: center;
    font-weight: bolder;
    color: #58979f;
    font-size: 22px;
    margin: 20px 0px 12px 0px;
    font-family: "微软雅黑", sans-serif;
  }
</style>
