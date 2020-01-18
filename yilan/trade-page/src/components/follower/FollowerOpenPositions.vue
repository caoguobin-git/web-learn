<template>
  <div class="position-main-container">
    <div class="position-title-container">
      <div class="follower-title-tag" style="width: 8%">成交单据</div><div class="follower-title-tag" style="width: 8%">账号</div><div class="follower-title-tag" style="width: 8%">货币</div><div class="follower-title-tag" style="width: 5%">数量</div><div class="follower-title-tag" style="width: 5%">卖/买</div><div class="follower-title-tag" style="width: 10%">开仓</div><div class="follower-title-tag" style="width: 10%">平仓</div><div class="follower-title-tag" style="width: 8%">盈/亏</div><div class="follower-title-tag" style="width: 8%">总盈/亏</div><div class="follower-title-tag" style="width: 8%">保证金</div><div class="follower-title-tag" style="width: 14%">时间</div>
    </div>
    <div class="follower-open-position-container">
      <FollowerOpenPositionRow @closeTrueMarket="closeTrueMarket($event)" v-for="item in datas"
                               :marketPrecision="marketPrecisions[item.instrument]"  :key="item.tradeID"
                               :openRow="item"></FollowerOpenPositionRow>
    </div>
    <div v-if="calcPL.pl!=0">
      <div style="display: inline-block;width: 57%;text-indent: 30px">统计：</div>
      <div style="display: inline-block;width: 9%;text-align: center">{{(calcPL.pl).toFixed(2)}}</div>
      <div style="display: inline-block;width: 8%;text-align: center">{{(calcPL.totalPL).toFixed(2)}}</div>
    </div>
  </div>
</template>

<script>
  import FollowerOpenPositionRow from "./FollowerOpenPositionRow";

  export default {
    name: "FollowerOpenPositions",
    components: {FollowerOpenPositionRow},
    props: ['datas', 'marketPrecisions'],
    mounted() {
      var that = this;

    },
    methods: {
      closeTrueMarket(data) {
        this.$emit('closeTrueMarket', data)
      }
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
          totalPL: b
        }
        return x;
      }
    }
  }
</script>


<style scoped>
  .position-main-container {
    height: 95%;
    width: 100%;
    margin: auto;
    overflow: hidden;
  }

  .position-main-container:hover {
    overflow: scroll;
  }

  .follower-open-position-container {
    width: 1217px;
    margin-bottom: 5px;
  }

  .position-title-container {
    width: 1200px;
    border-top: 1px solid rgba(112, 189, 199, 1);
  }

  .follower-title-tag {
    display: inline-block;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    background: rgba(246, 249, 252, 1);
    padding: 6px 3px;
    border-right: 2px solid white;
  }


</style>
