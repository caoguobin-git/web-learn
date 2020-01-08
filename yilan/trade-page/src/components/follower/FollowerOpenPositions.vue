<template>
  <div class="position-main-container">
    <div class="position-title-container">
      <div class="follower-title-tag" style="width: 8%">成交单据</div>
      <div class="follower-title-tag" style="width: 10%">账号</div>
      <div class="follower-title-tag" style="width: 5%">货币</div>
      <div class="follower-title-tag" style="width: 8%">数量</div>
      <div class="follower-title-tag" style="width: 5%">卖/买</div>
      <div class="follower-title-tag" style="width: 10%">开仓</div>
      <div class="follower-title-tag" style="width: 10%">平仓</div>
      <div class="follower-title-tag" style="width: 8%">盈/亏</div>
      <div class="follower-title-tag" style="width: 8%">总盈/亏</div>
      <div class="follower-title-tag" style="width: 8%">保证金</div>
      <div class="follower-title-tag" style="width: 15%">时间</div>
    </div>
    <div class="follower-open-position-container">
      <FollowerOpenPositionRow v-for="item in datas" :key="item.tradeID" :openRow="item"></FollowerOpenPositionRow>
    </div>
    <div>
      <div style="display: inline-block;width: 64%">统计：</div>
      <div style="display: inline-block;width: 8%;text-align: center">{{(calcPL.pl).toFixed(2)}}</div>
      <div style="display: inline-block;width: 8%;text-align: center">{{(calcPL.totalPl).toFixed(2)}}</div>
    </div>
  </div>
</template>

<script>
  import FollowerOpenPositionRow from "./FollowerOpenPositionRow";

  export default {
    name: "FollowerOpenPositions",
    components: {FollowerOpenPositionRow},
    props: ['datas'],
    mounted() {
      var that = this;

    },
    computed: {
      calcPL() {
        var a = 0;
        var b = 0;
        for (var i in this.datas) {
          a += this.datas[i].pl;
          b += this.datas[i].grossPL;
        }
        var x = {
          pl: a,
          totalPl: b
        }
        return x;
      }
    }
  }
</script>


<style scoped>
  .position-main-container {
    height: 90%;
    width: 100%;
    margin: auto;
    overflow: hidden;
  }

  .position-main-container:hover {
    overflow-x: scroll;
  }

  .follower-open-position-container {
    width: 1200px;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 75%;
  }

  .position-title-container {
    width: 1200px;
    padding: 5px 0px;
    border-bottom: 1px solid silver;
  }

  .follower-title-tag {
    display: inline-block;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
  }


</style>
