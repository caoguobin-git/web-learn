<template>
  <div class="follower-closed-main-container">
    <div class="follower-closed-title" style="width: 1500px">
      <div class="follower-closed-title-tag" style="width: 7%">成交单据</div>
      <div class="follower-closed-title-tag" style="width: 7%">账号</div>
      <div class="follower-closed-title-tag" style="width: 6%">商品组合</div>
      <div class="follower-closed-title-tag" style="width: 3%">数量</div>
      <div class="follower-closed-title-tag" style="width: 3%">卖/买</div>
      <div class="follower-closed-title-tag" style="width: 7%">开市价</div>
      <div class="follower-closed-title-tag" style="width: 7%">关闭</div>
      <div class="follower-closed-title-tag" style="width: 7%">盈/亏</div>
      <div class="follower-closed-title-tag" style="width: 7%">总盈/亏</div>
      <div class="follower-closed-title-tag" style="width: 5%">过夜利息</div>
      <div class="follower-closed-title-tag" style="width: 7%">净盈/亏</div>
      <div class="follower-closed-title-tag" style="width: 14%">开仓时间</div>
      <div class="follower-closed-title-tag" style="width: 14%">平仓时间</div>
    </div>
    <div class="follower-closed-container" style="width: 1500px">
      <FollowerClosedPositionRow v-for="item in datas" :key="item.tradeID"
                                 :closedRow="item"></FollowerClosedPositionRow>
    </div>
  </div>
</template>

<script>
  import FollowerClosedPositionRow from "./FollowerClosedPositionRow";

  export default {
    name: "FollowerClosedPositions",
    components: {FollowerClosedPositionRow},
    props: ['datas'],
  }
</script>

<style scoped>
  .follower-closed-main-container {
    height: 90%;
    width: 100%;
    margin: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    font-size: 14px;
  }

  .follower-closed-main-container:hover {
    overflow-x: scroll;
  }

  .follower-closed-title-tag{
    text-align: center;
    font-weight: bold;
  }
  .follower-closed-title {
    padding: 5px 0px;
    border-bottom: 1px solid silver;
  }

  .follower-closed-container {
    height: 250px;
    overflow: scroll;
  }

  .follower-closed-title > div {
    display: inline-block;
  }
</style>
