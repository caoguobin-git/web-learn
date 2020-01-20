<template>
  <div class="trader-closed-main-container">
    <div class="trader-closed-title-container">
      <div class="trader-closed-title-tag" style="width: 6%">商品组合</div><div class="trader-closed-title-tag" style="width: 3%">数量</div><div class="trader-closed-title-tag" style="width: 3%">卖/买</div><div class="trader-closed-title-tag" style="width: 7%">开市价</div><div class="trader-closed-title-tag" style="width: 7%">关闭</div><div class="trader-closed-title-tag" style="width: 7%">盈/亏</div><div class="trader-closed-title-tag" style="width: 7%">总盈/亏</div><div class="trader-closed-title-tag" style="width: 5%">过夜利息</div><div class="trader-closed-title-tag" style="width: 7%">净盈/亏</div><div class="trader-closed-title-tag" style="width: 12%">开仓时间</div><div class="trader-closed-title-tag" style="width: 12%">平仓时间</div>
    </div>
    <div class="trader-closed-container" style="width: 1517px">
      <TraderClosedPositionRow v-for="item in datasSort" :key="item.tradeID" :marketPrecision="marketPrecisions[item.symbol]"
                               :closedRow="item"></TraderClosedPositionRow>
    </div>
  </div>
</template>
<script>
  import TraderClosedPositionRow from "./TraderClosedPositionRow";
  export default {
    name: "TraderClosedPositions",
    components: {TraderClosedPositionRow},
    props: ['datas', 'marketPrecisions'],
    computed:{
      datasSort(){
        var a =[];
        for(var i in this.datas){
          a.push(this.datas[i])
        }
        a.sort(function (a,b) {
            return b.closeTime-a.closeTime
        })
        return a;
      }
    }
  }
</script>

<style scoped>
  .trader-closed-main-container {
    height: 73%;
    width: 99.5%;
    margin: auto;
    overflow: hidden;
  }

  .trader-closed-main-container:hover {
    overflow: scroll;
  }

  .trader-closed-title-tag {
    display: inline-block;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    background: rgba(246, 249, 252, 1);
    padding: 6px 3px;
    border-right: 2px solid white;
  }

  .trader-closed-title-container {
    width: 1500px;
    border-top: 1px solid rgba(112, 189, 199, 1);
  }
</style>
