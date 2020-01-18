<template>
  <div class="trader-position-main-container">
    <div class="trader-position-title-container">
      <div class="trader-title-tag" style="width: 8%">货币</div><div class="trader-title-tag" style="width: 5%">数量</div><div class="trader-title-tag" style="width: 5%">卖/买</div><div class="trader-title-tag" style="width: 10%">开仓</div><div class="trader-title-tag" style="width: 10%">平仓</div><div class="trader-title-tag" style="width: 8%">盈/亏</div><div class="trader-title-tag" style="width: 8%">总盈/亏</div><div class="trader-title-tag" style="width: 14%">时间</div>
    </div>
    <div class="trader-open-position-container">
      <TraderOpenPositionRow v-for="item in datasSort" :openRow="item" :marketPrecision="marketPrecisions[item.symbol]"
                             :key="item.tradeID"></TraderOpenPositionRow>

    </div>
    <div style="margin-top: 15px" v-if="calcPL.pl!=0">
      <div style="display: inline-block;width: 39%;text-indent: 30px">统计：</div>
      <div style="display: inline-block;width: 9%;text-align: center" :class="gainCalc">{{(calcPL.pl).toFixed(2)}}</div>
      <div style="display: inline-block;width: 8%;text-align: center" :class="gainCalc">
        {{(calcPL.totalPL).toFixed(2)}}
      </div>
    </div>
  </div>
</template>

<script>
  import TraderOpenPositionRow from "./TraderOpenPositionRow";

  export default {
    name: "TraderOpenPositions",
    components: {TraderOpenPositionRow},
    props: ['datas', 'marketPrecisions'],
    computed: {
      datasSort() {
        var a = [];
        for (var i in this.datas) {
          a.push(this.datas[i])
        }
        a.sort(function (a, b) {
          return b.openTime - a.openTime;
        })
        return a;
      },
      gainCalc() {
        return this.calcPL > 0 ? 'isGain' : 'notGain'
      },
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
  .trader-position-main-container {
    height: 77%;
    width: 100%;
    margin: auto;
    overflow: hidden;
  }

  .trader-position-main-container:hover {
    overflow-y: scroll;
  }

  .trader-open-position-container {
    width: 1217px;
    margin-bottom: 5px;
  }

  .trader-position-title-container {
    width: 1200px;
    border-top: 1px solid rgba(112, 189, 199, 1);
  }

  .trader-title-tag {
    display: inline-block;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    background: rgba(246, 249, 252, 1);
    padding: 6px 3px;
    border-right: 2px solid white;
  }

  .isGain {
    color: rgba(85, 159, 132, 1);
  }

  .notGain {
    color: rgba(204, 73, 85, 1);
  }
</style>
