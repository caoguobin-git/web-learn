<template>
  <div class="follower-summary-main-container">
    <div class="follower-summary-title-container">
        <div class="follower-summary-title-tag" style="width: 6%">商品组合</div><div class="follower-summary-title-tag" style="width: 6%">卖出盈/亏</div><div class="follower-summary-title-tag" style="width: 6%">卖出保证金</div><div class="follower-summary-title-tag" style="width: 6%">卖出数量</div><div class="follower-summary-title-tag" style="width: 6%">平均卖价</div><div class="follower-summary-title-tag" style="width: 6%">买入平仓</div><div class="follower-summary-title-tag" style="width: 6%">卖出平仓</div><div class="follower-summary-title-tag" style="width: 6%">平均买入</div><div class="follower-summary-title-tag" style="width: 6%">买入保证金</div><div class="follower-summary-title-tag" style="width: 6%">买入数量</div><div class="follower-summary-title-tag" style="width: 6%">买入盈/亏</div><div class="follower-summary-title-tag" style="width: 6%">保证金要求</div><div class="follower-summary-title-tag" style="width: 6%">数量</div><div class="follower-summary-title-tag" style="width: 6%">总盈/亏</div><div class="follower-summary-title-tag" style="width: 6%">过夜利息</div>
    </div>
    <div class="follower-summary-container">
      <FollowerSummaryRow v-for="item in datas" :key="item.offerID" :summaryRow="item"></FollowerSummaryRow>
    </div>
  </div>
</template>

<script>
    import FollowerSummaryRow from "./FollowerSummaryRow";
    export default {
        name: "FollowerSummary",
      components: {FollowerSummaryRow},
      props:['datas']
    }
</script>

<style scoped>

.follower-summary-main-container {
  height: 95%;
  width: 100%;
  margin: auto;
  overflow: hidden;
}

.follower-summary-main-container:hover {
  overflow: scroll;
}

  .follower-summary-title-container{
    width: 1400px;

  }
  .follower-summary-container{
    border-top: 1px solid rgba(112,189,199,1);

    border-right: 1px solid silver;
    border-left: 1px solid silver;
  }
.follower-summary-title-tag{
  display: inline-block;
  font-weight: bold;
  font-size: 14px;
  text-align: center;

  background: rgba(246,249,252,1);
  padding: 6px 3px;
  border-right: 2px solid white;
}
  .follower-summary-container{
    width: 1417px;
    overflow: hidden;
  }
</style>
