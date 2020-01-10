<template>
  <div class="order-row-container">
    <div class="follower-order-row-tag" style="width: 8%">{{orderRow.orderID}}</div>
    <div class="follower-order-row-tag" style="width: 8%">{{orderRow.accountName}}</div>
    <div class="follower-order-row-tag" style="width: 5%">{{orderRow.type}}</div>
    <div class="follower-order-row-tag" style="width: 10%">{{orderRow.status}}</div>
    <div class="follower-order-row-tag" style="width: 10%">{{orderRow.offerID}}</div>
    <div class="follower-order-row-tag" style="width: 8%">{{orderRow.amount}}</div>
    <div class="follower-order-row-tag" style="width: 8%">{{orderRow.rate}}</div>
    <div class="follower-order-row-tag" style="width: 8%">{{orderRow.rate}}</div>
    <div class="follower-order-row-tag" style="width: 15%"></div>
  </div>
</template>

<script>
  export default {
    name: "FollowerOrderRow",
    props: ['orderRow']
  }
</script>

<style scoped>
  .order-row-container {
    width: 100%;
    padding: 3px 0px;

  }

  .order-row-container:hover {
    background: whitesmoke;
    cursor: pointer;
  }

  .isGain {
    color: rgba(204, 73, 85, 1);
  }

  .notGain {
    color: rgba(85, 159, 132, 1);
  }

  .follower-order-row-tag {
    display: inline-block;
    font-family: "微软雅黑", sans-serif;
    font-size: 13px;
    text-align: center;
    padding: 2px 3px;
  }
</style>
