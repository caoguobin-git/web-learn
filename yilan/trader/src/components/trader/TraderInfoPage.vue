<template>
  <div class="trader-info-container" style="width: 100%; height: 100%">
    <a-row type="flex" align="middle" :gutter="2" class="trader-table-title">
      <a-col :span="2"><div class="trader-table-title-tag">成交单据</div></a-col>
      <a-col :span="2"><div class="trader-table-title-tag">账号</div></a-col>
      <a-col :span="2"><div class="trader-table-title-tag">货币</div></a-col>
      <a-col :span="1"><div class="trader-table-title-tag">数量</div></a-col>
      <a-col :span="1"><div class="trader-table-title-tag">卖/买</div></a-col>
      <a-col :span="2"><div class="trader-table-title-tag">开仓</div></a-col>
      <a-col :span="2"><div class="trader-table-title-tag">平仓</div></a-col>
      <a-col :span="2"><div class="trader-table-title-tag">盈/亏</div></a-col>
      <a-col :span="2"><div class="trader-table-title-tag">总盈/亏</div></a-col>
      <a-col :span="2"><div class="trader-table-title-tag">保证金</div></a-col>
      <a-col :span="4"><div class="trader-table-title-tag">开仓时间</div></a-col>
      <a-col :span="2"><div class="trader-table-title-tag">操作</div></a-col>
    </a-row>
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
    background: rgba(232, 243, 255, 1);
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    font-weight: bolder;
    text-align: center;
  }

  .trader-table-rows-container {
    height: 90%;
    /*background: red;*/
    width: 1200px;
  }
  .trader-table-title{
    width: 1200px;
  }

</style>
