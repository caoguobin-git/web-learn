<template>
  <div class="trader-position-main-container">
    <a-row :gutter="2" class="trader-position-title-container">
      <a-col :span="3"><div  class="trader-title-tag">货币</div></a-col>
      <a-col :span="2"><div  class="trader-title-tag">数量</div></a-col>
      <a-col :span="1"><div  class="trader-title-tag">卖/买</div></a-col>
      <a-col :span="3"><div  class="trader-title-tag">开仓</div></a-col>
      <a-col :span="3"><div  class="trader-title-tag">平仓</div></a-col>
      <a-col :span="3"><div  class="trader-title-tag">盈/亏</div></a-col>
      <a-col :span="3"><div  class="trader-title-tag">总盈/亏</div></a-col>
      <a-col :span="4"><div  class="trader-title-tag">时间</div></a-col>
    </a-row>
    <div class="trader-open-position-container" style="width: 1200px">
      <TraderOpenPositionRow v-for="item in datasSort" :openRow="item" :marketPrecision="marketPrecisions[item.symbol]"
                             :key="item.tradeID"></TraderOpenPositionRow>

    </div>
    <a-row style="margin-top: 15px;text-align: center;width: 1200px" v-if="calcPL.pl!=0">
      <a-col :span="12" style="text-align: right">统计：</a-col>
      <a-col :span="3" style="text-align: center" :class="gainCalc">{{(calcPL.pl).toFixed(2)}}</a-col>
      <a-col :span="3" style="text-align: center" :class="gainCalc">
        {{(calcPL.totalPL).toFixed(2)}}
      </a-col>
    </a-row>
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
    height: 73%;
    width: 100%;
    margin: auto;
    overflow: hidden;
  }

  .trader-position-main-container:hover {
    overflow: scroll;
  }

  .trader-open-position-container {
    width: 1200px;
    margin-bottom: 5px;
  }

  .trader-position-title-container {
    width: 1200px;
    border-top: 1px solid rgba(112, 189, 199, 1);
  }

  .trader-title-tag {
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    /*background: rgba(246, 249, 252, 1);*/
    background: rgba(246, 249, 252, 1);
    width: 100%;
    height: 100%;
    padding: 6px 0px;
    box-sizing: border-box;
  }

  .isGain {
    color: rgba(85, 159, 132, 1);
  }

  .notGain {
    color: rgba(204, 73, 85, 1);
  }
</style>
