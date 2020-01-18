<template>
  <div class="trader-info-container" style="width: 105%;height: 100%">
    <div class="trader-table-title">
      <div class="trader-table-title-tag" style="width: 8%">成交单据</div><div class="trader-table-title-tag" style="width: 10%">账号</div><div class="trader-table-title-tag" style="width: 8%">货币</div><div class="trader-table-title-tag" style="width: 5%">数量</div><div class="trader-table-title-tag" style="width: 5%">卖/买</div><div class="trader-table-title-tag" style="width: 8%">开仓</div><div class="trader-table-title-tag" style="width: 8%">平仓</div><div class="trader-table-title-tag" style="width: 10%">盈/亏</div><div class="trader-table-title-tag" style="width: 10%">总盈/亏</div><div class="trader-table-title-tag" style="width: 5%">保证金</div><div class="trader-table-title-tag" style="width: 10%">开仓时间</div><div class="trader-table-title-tag" style="width: 8%">操作</div>
    </div>
    <div class="trader-table-rows-container">
      <TraderInfoRow></TraderInfoRow>
      <TraderInfoRow></TraderInfoRow>
      <TraderInfoRow></TraderInfoRow>
      <TraderInfoRow></TraderInfoRow>
      <TraderInfoRow></TraderInfoRow>
      <TraderInfoRow></TraderInfoRow>
      <TraderInfoRow></TraderInfoRow>
      <TraderInfoRow></TraderInfoRow>
      <TraderInfoRow></TraderInfoRow>
    </div>
  </div>
</template>

<script>
  import TraderInfoRow from "./TraderInfoRow";

  export default {
    name: "TraderInfoPage",
    components: {TraderInfoRow}
  }
</script>

<style scoped>
  .trader-table-title-tag {
    display: inline-grid;
    background: rgba(232,243,255,1);
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    font-weight: bolder;
    text-align: center;
    margin-left: 2px;
  }
.trader-table-rows-container{
  height: 90%;
  /*background: red;*/
  overflow: scroll;
}
</style>
