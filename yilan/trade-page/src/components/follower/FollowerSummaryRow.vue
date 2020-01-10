<template>
  <div class="follower-summary-row-container">
    <div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.instrument}}</div><div class="follower-summary-row-tag" :class="sellGain" style="width: 6%">{{(summaryRow.sellNetPL).toFixed(3)}}</div><div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.usedMarginSell}}</div><div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.sellAmount}}</div><div class="follower-summary-row-tag" style="width: 6%">{{(summaryRow.sellAvgOpen).toFixed(5)}}</div><div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.buyClose}}</div><div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.sellClose}}</div><div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.buyAvgOpen.toFixed(5)}}</div><div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.usedMarginBuy}}</div><div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.buyAmount}}</div><div class="follower-summary-row-tag" :class="buyGain" style="width: 6%">{{(summaryRow.buyNetPL).toFixed(3)}}</div><div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.usedMargin}}</div><div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.amount}}</div><div class="follower-summary-row-tag" :class="totalGain" style="width: 6%">{{(summaryRow.grossPL).toFixed(2)}}</div><div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.rolloverInterestSum}}</div>
<!--    <div class="follower-summary-instrument-container">{{summaryRow.instrument}}</div>-->
<!--    <div class="follower-summary-detail-container">11</div>-->
<!--    <div class="follower-summary-detail-container">-->
<!--      <div class="follower-summary-detail"></div>-->
<!--      <div class="follower-summary-detail"></div>-->
<!--    </div>-->

  </div>
</template>

<script>
  export default {
    name: "FollowerSummaryRow",
    props: ['summaryRow'],
    computed:{
      sellGain(){
        if (this.summaryRow.sellNetPL == 0) {
          return '';
        } else {
          return this.summaryRow.sellNetPL > 0 ? 'isGain' : 'notGain'
        }
      },
      buyGain(){
        if (this.summaryRow.buyNetPL == 0) {
          return '';
        } else {
          return this.summaryRow.buyNetPL > 0 ? 'isGain' : 'notGain'
        }
      },
      totalGain(){
        if (this.summaryRow.grossPL == 0) {
          return '';
        } else {
          return this.summaryRow.grossPL > 0 ? 'isGain' : 'notGain'
        }
      }
    }
  }
</script>

<style scoped>
  .follower-summary-detail{
    height: 36px;
  }

  .follower-summary-instrument-container{
    width: 100px;
    text-align: center;
    display: inline-block;
    height: 100%;
    font-size: 16px;
    color: rgba(97,162,227,1);
    font-weight: bolder;
    /*background: rgba(246,249,252,1);*/
    background: blue;
  }
  .follower-summary-detail-container{
    width: 60%;
    display: inline-block;
    background: red;
    line-height: 76px;
  }

  .follower-summary-detail-container{
    width: 8%;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    padding: 30px;
    color: rgba(97,162,227,1);
    font-weight: bolder;
    /*background: rgba(246,249,252,1);*/
    background: blue;
  }

  .follower-summary-row-container{
    border-bottom: 1px solid silver;
    width: 100%;
  }


  .follower-summary-row-tag {
    display: inline-block;
    font-family: "微软雅黑", sans-serif;
    font-size: 13px;
    text-align: center;
    padding: 2px 3px;
    border-right: 2px solid transparent;
  }
  .follower-summary-row-container:hover{
    background: whitesmoke;
    cursor:pointer;
  }

  .isGain {
    color: rgba(204,73,85,1);
  }

  .notGain {
    color: rgba(85,159,132,1);
  }
</style>
