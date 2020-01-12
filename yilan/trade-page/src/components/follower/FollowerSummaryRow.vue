<template>
  <!--  <div class="follower-summary-row-container">-->
<!--  <div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.instrument}}</div>-->
<!--  <div class="follower-summary-row-tag" :class="sellGain" style="width: 6%">{{(summaryRow.sellNetPL).toFixed(2)}}</div>-->
<!--  <div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.usedMarginSell}}</div>-->
<!--  <div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.sellAmount}}</div>-->
<!--  <div class="follower-summary-row-tag" style="width: 6%">{{(summaryRow.sellAvgOpen).toFixed(marketPrecision)}}</div>-->
<!--  <div class="follower-summary-row-tag" style="width: 6%">{{(summaryRow.buyClose).toFixed(marketPrecision)}}</div>-->
<!--  <div class="follower-summary-row-tag" style="width: 6%">{{(summaryRow.sellClose).toFixed(marketPrecision)}}</div>-->
<!--  <div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.buyAvgOpen.toFixed(marketPrecision)}}</div>-->
<!--  <div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.usedMarginBuy}}</div>-->
<!--  <div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.buyAmount}}</div>-->
<!--  <div class="follower-summary-row-tag" :class="buyGain" style="width: 6%">{{(summaryRow.buyNetPL).toFixed(2)}}</div>-->
<!--  <div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.usedMargin}}</div>-->
<!--  <div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.amount}}</div>-->
<!--  <div class="follower-summary-row-tag" :class="totalGain" style="width: 6%">{{(summaryRow.grossPL).toFixed(2)}}</div>-->
<!--  <div class="follower-summary-row-tag" style="width: 6%">{{summaryRow.rolloverInterestSum}}</div>-->
  <!--    <div class="follower-summary-instrument-container">{{summaryRow.instrument}}</div>-->
  <!--    <div class="follower-summary-detail-container">11</div>-->
  <!--    <div class="follower-summary-detail-container">-->
  <!--      <div class="follower-summary-detail"></div>-->
  <!--      <div class="follower-summary-detail"></div>-->
  <!--    </div>-->
  <!--  </div>-->

  <div class="summary-row-container">
    <div class="summary-row-left">{{summaryRow.instrument}}</div>
    <div class="summary-row-center">
      <div class="summary-row-center-row summary-row-center-row-buy">
        <div class="summary-row-center-row-tag summary-row-center-row-amount"><span style="color: blue">买入</span>&nbsp;&nbsp;数量：{{summaryRow.buyAmount}}
        </div>
        <div class="summary-row-center-row-tag summary-row-center-row-avg">平均开仓：<span style="color: blue">{{summaryRow.buyAvgOpen.toFixed(marketPrecision)}}</span>
        </div>
        <div class="summary-row-center-row-tag summary-row-center-row-close">平仓：{{(summaryRow.buyClose).toFixed(marketPrecision)}}</div>
        <div class="summary-row-center-row-tag summary-row-center-row-pl">盈/亏：{{(summaryRow.buyNetPL).toFixed(2)}}</div>
        <div class="summary-row-center-row-tag summary-row-center-row-margin">保证金：{{summaryRow.usedMarginBuy}}</div>
      </div>
      <div class="summary-row-center-row summary-row-center-row-sell">
        <div class="summary-row-center-row-tag summary-row-center-row-amount"><span style="color: red">卖出</span>&nbsp;&nbsp;数量：{{summaryRow.sellAmount}}
        </div>
        <div class="summary-row-center-row-tag summary-row-center-row-avg">平均开仓：<span style="color: red">{{(summaryRow.sellAvgOpen).toFixed(marketPrecision)}}</span>
        </div>
        <div class="summary-row-center-row-tag summary-row-center-row-close">平仓:{{(summaryRow.sellClose).toFixed(marketPrecision)}}</div>
        <div class="summary-row-center-row-tag summary-row-center-row-pl">盈/亏：{{(summaryRow.sellNetPL).toFixed(2)}}</div>
        <div class="summary-row-center-row-tag summary-row-center-row-margin">保证金：{{summaryRow.usedMarginSell}}</div>
      </div>


    </div>
    <div class="summary-row-right">
      <div class="summary-row-center-row summary-row-center-row-buy">
        <div class="summary-row-center-row-tag summary-row-center-row-amount" style="width: 100%;text-indent: 40px">
          净数量：{{summaryRow.amount}}
        </div>
      </div>
      <div class="summary-row-center-row summary-row-center-row-sell">
        <div class="summary-row-center-row-tag summary-row-center-row-amount"
             style="width: 100%;text-indent: 40px">净盈亏：<span :class="totalGain">{{(summaryRow.grossPL).toFixed(2)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FollowerSummaryRow",
    props: ['summaryRow', 'marketPrecision'],
    computed: {
      numGain() {
        if (this.summaryRow.amount == 0) {
          return '';
        } else {
          return this.summaryRow.amount > 0 ? 'isGain' : 'notGain'
        }
      },
      sellGain() {
        if (this.summaryRow.sellNetPL == 0) {
          return '';
        } else {
          return this.summaryRow.sellNetPL > 0 ? 'isGain' : 'notGain'
        }
      },
      buyGain() {
        if (this.summaryRow.buyNetPL == 0) {
          return '';
        } else {
          return this.summaryRow.buyNetPL > 0 ? 'isGain' : 'notGain'
        }
      },
      totalGain() {
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
  .follower-summary-detail {
    height: 36px;
  }

  .follower-summary-instrument-container {
    width: 100px;
    text-align: center;
    display: inline-block;
    height: 100%;
    font-size: 16px;
    color: rgba(97, 162, 227, 1);
    font-weight: bolder;
    /*background: rgba(246,249,252,1);*/
    background: blue;
  }

  .follower-summary-detail-container {
    width: 60%;
    display: inline-block;
    background: red;
    line-height: 76px;
  }

  .follower-summary-detail-container {
    width: 8%;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    padding: 30px;
    color: rgba(97, 162, 227, 1);
    font-weight: bolder;
    /*background: rgba(246,249,252,1);*/
    background: blue;
  }

  .follower-summary-row-container {
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

  .follower-summary-row-container:hover {
    background: whitesmoke;
    cursor: pointer;
  }

  .isGain {
    color: rgba(204, 73, 85, 1);
  }

  .notGain {
    color: rgba(85, 159, 132, 1);
  }


  .summary-row-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    height: 60px;
    border-left: 1px solid silver;
    border-right: 1px solid silver;
    border-bottom: 1px solid silver;
  }

  .summary-row-left {
    flex-grow: 1;
    height: 100%;
    line-height: 60px;
    text-align: center;
    font-weight: bolder;
    color: rgba(97, 162, 227, 1);
  }

  .summary-row-center {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-flow: column nowrap;
    border-right: 1px solid silver;
    border-left: 1px solid silver;

  }

  .summary-row-right {
    height: 100%;
    flex-grow: 1;
  }

  .summary-row-center-row {
    flex-grow: 1;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
  }

  .summary-row-center-row-buy {
    padding-top: 10px;
  }

  .summary-row-center-row-sell {
    padding-bottom: 10px;
  }

  .summary-row-center-row-tag {
    width: 19%;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    font-size: 13px;
    text-indent: 20px;
  }
</style>
