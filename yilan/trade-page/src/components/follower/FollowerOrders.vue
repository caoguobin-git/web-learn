<template>
  <div class="orders-main-container">
    <div class="order-title-container">
      <div class="order-title-tag" style="width: 8%">订单ID</div>
      <div class="order-title-tag" style="width: 8%">账号</div>
      <div class="order-title-tag" style="width: 8%">单据类型</div>
      <div class="order-title-tag" style="width: 5%">状态</div>
      <div class="order-title-tag" style="width: 5%">商品组合</div>
      <div class="order-title-tag" style="width: 10%">数量</div>
      <div class="order-title-tag" style="width: 10%">卖出</div>
      <div class="order-title-tag" style="width: 8%">买进</div>
      <div class="order-title-tag" style="width: 8%">范围</div>
      <div class="order-title-tag" style="width: 8%">止损</div>
      <div class="order-title-tag" style="width: 14%">限价</div>
      <div class="order-title-tag" style="width: 14%">时间</div>
      <div class="order-title-tag" style="width: 14%">到期日</div>
    </div>
    <div class="follower-order-row-container">
      <FollowerOrderRow v-for="item in datas" :orderRow="item" :key="item.tradeID"></FollowerOrderRow>
    </div>
  </div>
</template>

<script>
  import FollowerOrderRow from "./FollowerOrderRow";

  export default {
    name: "FollowerOrders",
    components: {FollowerOrderRow},
    props: ['datas']
  }
</script>

<style scoped>
  .orders-main-container {
    height: 95%;
    width: 100%;
    margin: auto;
    overflow: hidden;
  }

  .orders-main-container:hover {
    overflow: scroll;
  }

  .follower-order-row-container {
    width: 1217px;
  }

  .order-title-container {
    width: 1200px;
    border-top: 1px solid rgba(112, 189, 199, 1);
  }

  .order-title-tag {
    display: inline-block;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    background: rgba(246, 249, 252, 1);
    padding: 6px 3px;
    border-right: 2px solid white;
  }
</style>
