<template>
  <div id="trade-page-notice-container">

    <el-row>
      <div id="trade-page-notice-title">
        近期交易提醒
      </div>
      <el-table :data="notice" max-height="440"  :cell-style="noticeRow" @row-click="sayHello"
                row-key="date" empty-text="暂无提醒" border
                stripe style="width: 395px">
        <!--        <el-table-column-->
        <!--          type="index"-->
        <!--          :index="1">-->
        <!--        </el-table-column>-->
        <el-table-column style="font-weight: bold" align="center" prop="currency" label="商品组合"
                         width="80"></el-table-column>
        <el-table-column :index="0" header-align="center" type="extend" show-overflow-tooltip
                         label="交易策略"
                         width="204" prop="notice">
        </el-table-column>
        <el-table-column align="center" prop="time" label="时间"></el-table-column>
      </el-table>

    </el-row>
  </div>
</template>

<script>
  export default {
    name: "TradePageNotice",
    data() {
      return {
        noticeRow: {
          color: 'black',
          height: '12px',
          cursor: 'pointer'
        },
        notice: [{
          currency: 'XAU/USD',
          notice: '王小虎',
          time: '123'
        }, {
          currency: 'XAG/USD',
          notice: '尽管世界贸易方面传出乐观消息，但后续的发展仍存在不确定因素。澳大利亚放缓的经济增速和政府有意义重返预算盈余的决定使澳洲联储2020年面临进一步降息的风险。而且，当利率触及0.25%下限时，有可能启动量化宽松。虽然让澳元有暂时喘息的机会，但我行预测2020年澳元兑美元将面临新的下行压力。',
          time: '123'
        }, {
          currency: 'CORN1',
          notice: '王小虎',
          time: '123'
        }]
      }
    },
    methods: {
      sayHello: function (row, column, event) {
        // alert("你好")
        console.log(row.currency)
        // console.log(column)
        // console.log(event)

      }
    }
  }
</script>

<style scoped>
  #trade-page-notice-container {
    height: 500px;
    box-sizing: border-box;
    margin: 0px 10px 5px 5px;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    background: white;
  }

  #trade-page-notice-title {
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
