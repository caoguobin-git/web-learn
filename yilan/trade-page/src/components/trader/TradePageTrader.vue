<template>
  <div id="trade-page-trader-info">
    <p id="trade-page-trader-title">交易员信息</p>
    <el-menu default-active="2" mode="horizontal">
      <el-menu-item index="1">挂单</el-menu-item>
      <el-menu-item @click="currentTab='OpenPositions'" index="2">开仓</el-menu-item>
      <el-menu-item @click="currentTab='ClosedPositions'" index="3">平仓</el-menu-item>
      <el-menu-item @click="currentTab='HistoryPositions'" index="4">历史</el-menu-item>
    </el-menu>
    <component :is="traderCurrentDisplay"></component>
    <p style="margin-bottom: 0px">盈利信息设置</p>
  </div>
</template>

<script>
  import TraderOpenPositions from "./TraderOpenPositions";
  import TraderClosedPositions from "./TraderClosedPositions";
  import TraderHistoryPositions from "./TraderHistoryPositions";

  export default {
    name: "TradePageTrader",
    components: {TraderHistoryPositions, TraderClosedPositions, TraderOpenPositions},
    data() {
      return {
        currentTab: 'OpenPositions'
      }
    },
    computed: {
      traderCurrentDisplay() {
        return 'Trader' + this.currentTab;
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

  #trade-page-trader-info {
    height: 100%;
    border: none;
    box-sizing: border-box;
    margin: 5px;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    overflow: hidden;
    background: white;

  }

  #trade-page-trader-title {
    text-align: center;
    font-weight: bolder;
    color: #58979f;
    font-size: 22px;
    margin: 20px 0px 12px 0px;
    font-family: "微软雅黑", sans-serif;
  }
</style>
