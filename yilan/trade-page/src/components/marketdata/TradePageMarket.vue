<template>
  <div style="width: 100%;height:50%;margin: auto;overflow: hidden">
    <div id="trade-page-market-container">
      <!--      <el-row>-->
      <div id="trade-page-market-title">
        市场数据
      </div>

      <a-row style="width: 100%;height:30px" :gutter="2" type="flex" align="middle" id="trade-page-market-caption">
        <a-col style="height: 100%" :span=2 ><div class="market-info-tag">货币</div></a-col>
        <a-col style="height: 100%" :span=2 ><div class="market-info-tag">卖出</div></a-col>
        <a-col style="height: 100%" :span=2 ><div class="market-info-tag">买入</div></a-col>
        <a-col style="height: 100%" :span=2 ><div class="market-info-tag">点差</div></a-col>
        <a-col style="height: 100%" :span=3 ><div class="market-info-tag">最高</div></a-col>
        <a-col style="height: 100%" :span=3 ><div class="market-info-tag">最低</div></a-col>
        <a-col style="height: 100%" :span=2 ><div class="market-info-tag">卖出利息</div></a-col>
        <a-col style="height: 100%" :span=2 ><div class="market-info-tag">买入利息</div></a-col>
        <a-col style="height: 100%" :span=2 ><div class="market-info-tag">点值</div></a-col>
        <a-col style="height: 100%" :span=4 ><div class="market-info-tag">时间</div></a-col>
      </a-row>
      <div class="market-price-container"
           style="width: 100%;margin: 2px auto 0px auto;overflow-y: scroll;overflow-x: hidden;height:91%">
        <MarketDataDetail v-for="item in marketDataArray" :key="item.symbol" :market="item"></MarketDataDetail>
      </div>
      <!--      </el-row>-->
    </div>
  </div>
</template>

<script>
  import MarketDataDetail from "./MarketDataRow";

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

  .market-info-tag{
    text-align: center;
    font-weight: bolder;
    height: 100%;
    line-height: 30px;
    font-size: 13px;
  }

  #trade-page-market-caption {
    width: 100%;
    margin: 10px auto 0px auto;
    font-size: 13px;
    background: rgba(222, 222, 222, 0.7);
  }


  #trade-page-market-container {
    /*padding: 10px;*/
    height: 100%;
    width: 795px;
    overflow: hidden;
    padding: 17px 10px 0px 10px;
    border-radius: 6px;
    background: white;
  }

  #trade-page-market-title {
    margin: 0px 17px;
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

  .market-price-container::-webkit-scrollbar {
    display: none
  }

</style>
