<template>
  <a-row class="market-detail-container" :gutter="2" type="flex" align="middle">
    <a-col :span=2 style="font-weight: bolder" ><div>{{market.symbol}}</div></a-col>
    <a-col :span=2 ><div style="text-align: right;padding-right: 5px" :class="sellPriceClass" class="price-container">{{market.sell}}</div></a-col>
    <a-col :span=2 ><div style="text-align: right;padding-right: 5px" :class="buyPriceClass" class="price-container">{{market.buy}}</div></a-col>
    <a-col :span=2 ><div :class="spreadClass">{{market.diancha}}</div></a-col>
    <a-col :span=3 ><div>{{market.high}}</div></a-col>
    <a-col :span=3 ><div>{{market.low}}</div></a-col>
    <a-col :span=2 ><div>{{market.rollS}}</div></a-col>
    <a-col :span=2 ><div>{{market.rollB}}</div></a-col>
    <a-col :span=2 ><div>{{market.pipCost}}</div></a-col>
    <a-col :span=4 ><div>{{new Date(market.PriceTime).toLocaleString()}}</div></a-col>
  </a-row>
</template>

<script>
  export default {
    name: "MarketDataDetail",
    props: ['market'],
    data() {
      return {
        hello: 'hello',
        sellPriceClass: '',
        buyPriceClass: '',
        spreadClass: '',
        sellPriceTimeout: {},
        buyPriceTimeout: {},
        spreadTimeout: {}
      }
    },
    watch: {
      market(val1, val2) {
        clearTimeout(this.sellPriceTimeout);
        clearTimeout(this.buyPriceTimeout);
        clearTimeout(this.spreadTimeout);

        var that = this;
        var a = setTimeout(function () {
          that.sellPriceClass = '';
        }, 1000)
        var b = setTimeout(function () {
          that.buyPriceClass = '';
        }, 1000)
        var c = setTimeout(function () {
          that.spreadClass = '';
        }, 1000)

        that.sellPriceTimeout = a;
        that.buyPriceTimeout = b;
        that.spreadTimeout = c;

        if ((val1.sell - val2.sell) > 0) {
          this.sellPriceClass = 'price-up'
        } else if ((val1.sell - val2.sell) < 0) {
          this.sellPriceClass = 'price-down'
        }

        if ((val1.buy - val2.buy) > 0) {
          this.buyPriceClass = 'price-up'
        } else if ((val1.sell - val2.sell) < 0) {
          this.buyPriceClass = 'price-down'
        }

        if ((val1.diancha - val2.diancha) > 0) {
          this.spreadClass = 'price-up-spread'
        } else if ((val1.diancha - val2.diancha) < 0) {
          this.spreadClass = 'price-down-spread'
        }
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .price-up {
    color: white;
    background: rgba(53, 153, 211, 1);
  }

  .price-down {
    background: rgba(255, 72, 102, 1);
    color: white;
  }

  .price-up-spread {
    color: rgba(53, 153, 211, 1);
    font-weight: bolder;
  }

  .price-down-spread {
    color: rgba(255, 72, 102, 1);
    font-weight: bolder;
  }

  .price-container{
    border-radius: 3px;
  }

  .market-detail-container {
    width: 100%;
    border-bottom: 1px solid silver;
    padding: 2px 0px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .market-detail-container:hover {
    background: #ededed;

  }

  .market-detail-container > div {
    display: inline-block;
    overflow: hidden;
    word-break: break-all;
    white-space: pre;
    font-size: 12px;
    padding: 2px 5px;
    text-align: center;
  }
</style>
