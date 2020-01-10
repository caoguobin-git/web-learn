<template>
  <div class="follower-closed-main-container">
    <div class="follower-closed-title-container">
      <div class="follower-closed-title-tag" style="width: 7%">成交单据</div><div class="follower-closed-title-tag" style="width: 7%">账号</div><div class="follower-closed-title-tag" style="width: 6%">商品组合</div><div class="follower-closed-title-tag" style="width: 3%">数量</div><div class="follower-closed-title-tag" style="width: 3%">卖/买</div><div class="follower-closed-title-tag" style="width: 7%">开市价</div><div class="follower-closed-title-tag" style="width: 7%">关闭</div><div class="follower-closed-title-tag" style="width: 7%">盈/亏</div><div class="follower-closed-title-tag" style="width: 7%">总盈/亏</div><div class="follower-closed-title-tag" style="width: 5%">过夜利息</div><div class="follower-closed-title-tag" style="width: 7%">净盈/亏</div><div class="follower-closed-title-tag" style="width: 12%">开仓时间</div><div class="follower-closed-title-tag" style="width: 12%">平仓时间</div></div>
    <div class="follower-closed-container" style="width: 1517px">
      <FollowerClosedPositionRow v-for="item in closedSort" :key="item.tradeID"
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
    computed:{
      closedSort(){
        return this.datas;
      }
    }
  }
</script>

<style scoped>
  .follower-closed-main-container {
    height: 95%;
    width: 100%;
    margin: auto;
    overflow: hidden;
  }

  .follower-closed-main-container:hover {
    overflow: scroll;
  }

  .follower-closed-title-tag{
    display: inline-block;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    background: rgba(246,249,252,1);
    padding: 6px 3px;
    border-right: 2px solid white;
  }
  .follower-closed-title-container {
    width: 1500px;
    border-top: 1px solid rgba(112,189,199,1);
  }



</style>
