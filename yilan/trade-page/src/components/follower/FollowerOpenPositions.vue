<template>
  <div class="position-main-container">
    <a-row :gutter="2" class="position-title-container">
      <a-col span="2" ><div class="follower-title-tag" >成交单据</div></a-col>
      <a-col span="2" ><div class="follower-title-tag" >账号</div></a-col>
      <a-col span="2" ><div class="follower-title-tag" >货币</div></a-col>
      <a-col span="2" ><div class="follower-title-tag" >数量</div></a-col>
      <a-col span="1" ><div class="follower-title-tag" >卖/买</div></a-col>
      <a-col span="2" ><div class="follower-title-tag" >开仓</div></a-col>
      <a-col span="2" ><div class="follower-title-tag" >平仓</div></a-col>
      <a-col span="2" ><div class="follower-title-tag" >盈/亏</div></a-col>
      <a-col span="2" ><div class="follower-title-tag" >总盈/亏</div></a-col>
      <a-col span="2" ><div class="follower-title-tag" >保证金</div></a-col>
      <a-col span="4" ><div class="follower-title-tag" >时间</div></a-col>
    </a-row>

    <div class="follower-open-position-container">
      <FollowerOpenPositionRow @closeTrueMarket="closeTrueMarket($event)" v-for="item in datas"
                               :marketPrecision="marketPrecisions[item.instrument]" :key="item.tradeID"
                               :openRow="item"></FollowerOpenPositionRow>
    </div>


    <a-row v-if="calcPL.pl!=0" :gutter="2" style="width: 1200px">
      <a-col span="13" style="text-align: right" ><div>统计：</div></a-col>
      <a-col span=2 style="text-align: center" ><div>{{(calcPL.pl).toFixed(2)}}</div></a-col>
      <a-col span="2" style="text-align: center" ><div>{{(calcPL.totalPL).toFixed(2)}}</div></a-col>
    </a-row>
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
    width: 1200px;
    margin-bottom: 5px;
  }

  .position-title-container {
    width: 1200px;
    border-top: 1px solid rgba(112, 189, 199, 1);
  }

  .follower-title-tag {
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    background: rgba(246, 249, 252, 1);
    padding: 6px 3px;
  }


</style>
