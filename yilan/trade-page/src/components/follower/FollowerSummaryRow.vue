<template>
  <tbody class="follower-summary-tbody">
  <tr>
    <td class=" follower-summary-instrument" rowspan="2">{{summaryRow.instrument}}</td>
    <td class="follower-summary-center-tag-buy" style="padding-left: 33px;color: rgba(85,159,132,1)">买入：</td>
    <td class="follower-summary-center-tag-buy">数量: {{summaryRow.buyAmount}}</td>
    <td class="follower-summary-center-tag-buy">平均开仓: <span style="color: rgba(85,159,132,1)">{{summaryRow.buyAvgOpen==0?0:(summaryRow.buyAvgOpen).toFixed(marketPrecision)}}</span></td>
    <td class="follower-summary-center-tag-buy">平仓: <span style="color: rgba(85,159,132,1)">{{summaryRow.sellClose==0?0:(summaryRow.sellClose).toFixed(marketPrecision)}}</span></td>
    <td class="follower-summary-center-tag-buy">保证金: {{summaryRow.usedMarginBuy}}</td>
    <td class="follower-summary-center-tag-buy">盈/亏: <span :class="buyGain">{{(summaryRow.buyNetPL).toFixed(2)}}</span></td>
    <td class="follower-summary-center-tag-buy" style="padding-left: 20px;padding-right:20px;border-left: 1px dashed silver;border-right: 1px solid rgba(226,227,231,1)">净数量: <span :class="numGain">{{summaryRow.amount}}</span>
    </td>
  </tr>
  <tr>
    <td class="follower-summary-center-tag-sell" style="padding-left: 33px;color: rgba(204,73,85,1)">卖出:</td>
    <td class="follower-summary-center-tag-sell">数量: {{summaryRow.sellAmount}}</td>
    <td class="follower-summary-center-tag-sell">平均开仓: <span style="color: rgba(204,73,85,1)">{{summaryRow.sellAvgOpen==0?0:(summaryRow.sellAvgOpen).toFixed(marketPrecision)}}</span></td>
    <td class="follower-summary-center-tag-sell">平仓: <span style="color: rgba(204,73,85,1)">{{summaryRow.buyClose==0?0:(summaryRow.buyClose).toFixed(marketPrecision)}}</span></td>
    <td class="follower-summary-center-tag-sell" >保证金: {{summaryRow.usedMarginSell}}</td>
    <td class="follower-summary-center-tag-sell" style="padding-right: 48px">盈/亏: <span :class="sellGain">{{(summaryRow.sellNetPL).toFixed(2)}}</span></td>
    <td class="follower-summary-center-tag-sell" style="padding-left: 20px;padding-right:20px;border-left: 1px dashed silver;border-right: 1px solid rgba(226,227,231,1)">
      净盈亏: <span :class="totalGain">{{(summaryRow.grossPL).toFixed(2)}}</span>
    </td>
  </tr>
  </tbody>
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

  .isGain {
    color: rgba(204, 73, 85, 1);
  }

  .notGain {
    color: rgba(85, 159, 132, 1);
  }

.follower-summary-tbody{
  cursor: pointer;
}
.follower-summary-tbody:hover{
  background: rgba(236, 236, 236, 0.4);
}


  .follower-summary-instrument {
    width: 116px;
    font-size: 16px;
    font-weight: bolder;
    font-family: "微软雅黑", sans-serif;
    color: rgba(97, 162, 227, 1);
    background: rgba(246, 249, 252, 1);
    text-align: center;
    border-left: 1px solid rgba(226,227,231,1);
    border-bottom: 1px solid rgba(226,227,231,1);
  }

  .follower-summary-center-tag-buy, .follower-summary-center-tag-sell {
    font-size: 14px;
    font-family: "微软雅黑", sans-serif;
    padding-left: 15px;
  }

  .follower-summary-center-tag-buy {
    padding-top: 12px;
  }

  .follower-summary-center-tag-sell {
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(226,227,231,1);
  }
</style>
