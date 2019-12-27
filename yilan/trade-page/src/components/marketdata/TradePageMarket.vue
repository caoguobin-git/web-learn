<template>
  <div id="trade-page-market-container">
    <el-row>
      <div id="trade-page-market-title">
        市场数据
      </div>
      <el-table :data="marketDataArray" max-height="800px"
                empty-text="暂无数据" border :cell-style="myCellStyle"
                stripe style="width: 395px">
        <el-table-column align="center" width="90" prop="symbol" label="货币"></el-table-column>
        <el-table-column align="center" width="80" prop="sell" label="卖出"></el-table-column>
        <el-table-column align="center" width="80" prop="buy" label="买入"></el-table-column>
        <el-table-column align="center" width="80" prop="diancha" label="点差"></el-table-column>
        <el-table-column align="center" width="80" prop="high" label="最高"></el-table-column>
        <el-table-column align="center" width="80" prop="low" label="最低"></el-table-column>
        <el-table-column align="center" width="100" prop="rollS" label="卖出利息"></el-table-column>
        <el-table-column align="center" width="100" prop="rollB" label="买入利息"></el-table-column>
        <el-table-column align="center" width="80" prop="time" label="时间"></el-table-column>
      </el-table>

    </el-row>
  </div>
</template>

<script>
  export default {
    name: "TradePageMarket",
    props: ['marketDatas'],
    data() {
      return {
        myCellStyle:{padding:'3px 0px'},
        marketRow: {
          color: 'black',
          height: '12px',
          cursor: 'pointer'
        },
      }
    },
    mounted() {
      // var that=this;
      // setInterval(function () {
      //   console.log(that.marketDatas['AUD/USD'])
      // },1000)
    },
    computed: {
      marketDataArray: function () {
        let arr = []
        for (let i in this.marketDatas) {
          var a = this.marketDatas[i];
          a.sell = parseFloat(a.sell).toFixed(a.precision);
          a.buy = parseFloat(a.buy).toFixed(a.precision);
          a.high = parseFloat(a.high).toFixed(a.precision);
          a.low = parseFloat(a.low).toFixed(a.precision);
          a.time=12
          a.diancha=((a.buy-a.sell)/a.pointSize).toFixed(2)
          arr.push(a)
        }
        return arr;
      }
    },
    watch: {
      marketDatas: function (val, valOld) {
        console.log(val)
      }
    }
  }
</script>

<style scoped>
  #trade-page-market-container {
    height: 875px;
    margin: 0px 5px 5px 10px;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    background: white;
  }

  #trade-page-market-title {
    margin: 18px 17px;
    font-size: 18px;
    height: 17px;
    line-height: 17px;
    font-family: "微软雅黑", sans-serif;
    color: rgba(88, 151, 159, 1);
    text-indent: 10px;
    border-left: 2px solid rgba(112, 189, 199, 1);
  }

  .el-table {
    overflow: hidden;
    text-align: center;
    margin: auto;
    font-size: 12px;
  }

  .el-table__body-wrapper::-webkit-scrollbar {
    /*width: 0;宽度为0隐藏*/
    width: 0px;
  }
</style>
