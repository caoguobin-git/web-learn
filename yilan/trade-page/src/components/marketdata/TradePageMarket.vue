<template>
  <div id="trade-page-market-container">
    <!--      <el-row>-->
    <div id="trade-page-market-title">
      市场数据
    </div>

    <div style="width: 98%;" id="trade-page-market-caption">
      <div style="width: 10%;font-weight: bolder;text-align: center">货币</div>
      <div style="width: 6%;font-weight: bolder;text-align: center">卖出</div>
      <div style="width: 6%;font-weight: bolder;text-align: center">买入</div>
      <div style="width: 5%;font-weight: bolder;text-align: center">点差</div>
      <div style="width: 6%;font-weight: bolder;text-align: center">最高</div>
      <div style="width: 6%;font-weight: bolder;text-align: center">最低</div>
      <div style="width: 10%;font-weight: bolder;text-align: center">卖出利息</div>
      <div style="width: 10%;font-weight: bolder;text-align: center">买入利息</div>
      <div style="width: 10%;font-weight: bolder;text-align: center">点值</div>
      <div style="width: 10%;font-weight: bolder;text-align: center">时间</div>
    </div>
    <div style="width: 100%;margin: 2px auto 0px auto;overflow-y: scroll;overflow-x: hidden;height:93%">
      <MarketDataDetail v-for="item in marketDataArray" :key="item.symbol" :market="item"></MarketDataDetail>
    </div>
    <!--      </el-row>-->
  </div>
</template>

<script>
  import MarketDataDetail from "../marketdatadetail/MarketDataDetail";

  export default {
    name: "TradePageMarket",
    components: {MarketDataDetail},
    props: ['marketDatas'],
    data() {
      return {

        myCellStyle: {padding: '3px 0px'},
        marketRow: {
          color: 'black',
          height: '12px',
          cursor: 'pointer'
        },
        marketDataMap: {
          "EUR/USD": {},
          "USD/JPY": {},
          "GBP/USD": {},
          "USD/CHF": {},
          "EUR/CHF": {},
          "AUD/USD": {},
          "USD/CAD": {},
          "NZD/USD": {},
          "EUR/GBP": {},
          "EUR/JPY": {},
          "GBP/JPY": {},
          "CHF/JPY": {},
          "GBP/CHF": {},
          "EUR/AUD": {},
          "EUR/CAD": {},
          "AUD/CAD": {},
          "AUD/JPY": {},
          "CAD/JPY": {},
          "NZD/JPY": {},
          "GBP/CAD": {},
          "GBP/NZD": {},
          "GBP/AUD": {},
          "AUD/NZD": {},
          "USD/SEK": {},
          "EUR/SEK": {},
          "EUR/NOK": {},
          "USD/NOK": {},
          "USD/MXN": {},
          "AUD/CHF": {},
          "EUR/NZD": {},
          "USD/ZAR": {},
          "USD/HKD": {},
          "ZAR/JPY": {},
          "USD/TRY": {},
          "EUR/TRY": {},
          "NZD/CHF": {},
          "CAD/CHF": {},
          "NZD/CAD": {},
          "TRY/JPY": {},
          "USD/CNH": {},
          "AUS200": {},
          "ESP35": {},
          "FRA40": {},
          "GER30": {},
          "HKG33": {},
          "JPN225": {},
          "NAS100": {},
          "SPX500": {},
          "UK100": {},
          "US30": {},
          "Copper": {},
          "CHN50": {},
          "EUSTX50": {},
          "USDOLLAR": {},
          "US2000": {},
          "USOil": {},
          "UKOil": {},
          "SOYF": {},
          "NGAS": {},
          "WHEATF": {},
          "CORNF": {},
          "Bund": {},
          "XAU/USD": {},
          "XAG/USD": {},
          "BTC/USD": {},
          "ETH/USD": {},
          "LTC/USD": {},
          "BCH/USD": {},
          "XRP/USD": {},
          "EMBasket": {},
          "JPYBasket": {},
          "CryptoMajor": {},
          "USEquities": {}
        }
      }
    },
    mounted() {

    },
    computed: {
      tableHeight: function () {
        return 800;
      },
      marketDataArray: function () {
        let arr = []
        for (let i in this.marketDatas) {
          var a = this.marketDatas[i];
          a.sell = parseFloat(a.sell).toFixed(a.precision);
          a.buy = parseFloat(a.buy).toFixed(a.precision);
          a.high = parseFloat(a.high).toFixed(a.precision);
          a.low = parseFloat(a.low).toFixed(a.precision);
          a.diancha = ((a.buy - a.sell) / a.pointSize).toFixed(2);
          a.pipCost = parseFloat(a.pipCost).toFixed(2);
          arr.push(a)
        }
        return arr;
      }
    },
    methods: {},

    watch: {
      marketDatas: function (val, valOld) {

      }
    }
  }

</script>

<style scoped>

  #trade-page-market-caption {
    width: 100%;
    margin: 10px auto 0px auto;
    font-size: 13px;
  }

  #trade-page-market-caption > div {
    display: inline-block;
    overflow: hidden;
    word-break: break-all;
    white-space: pre;
    padding: 2px 5px;
  }

  #trade-page-market-container {
    margin: 5px 5px 5px 10px;
    padding:10px;
    height: 92%;
    width: 800px;
    overflow:hidden;
    padding-top: 17px;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    background: white;
    position: relative;
  }

  #trade-page-market-title {
    margin: 3px 17px;
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

</style>
