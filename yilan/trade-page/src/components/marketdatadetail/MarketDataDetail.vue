<template>
  <div class="market-detail-container">
    <div style="width: 10%;font-weight: bolder;">{{market.symbol}}</div>
    <div :class="sellPriceClass" class="price-container" style="width: 6%;text-align: right">{{market.sell}}</div>
    <div :class="buyPriceClass" class="price-container" style="width: 6%;text-align: right">{{market.buy}}</div>
    <div :class="spreadClass" style="width: 5%">{{market.diancha}}</div>
    <div style="width: 6%">{{market.high}}</div>
    <div style="width: 6%">{{market.low}}</div>
    <div style="width: 10%">{{market.rollS}}</div>
    <div style="width: 10%">{{market.rollB}}</div>
    <div style="width: 10%">{{market.pipCost}}</div>
    <div style="width: 10%">{{market.time}}</div>
  </div>
</template>

<script>
  export default {
    name: "MarketDataDetail",
    props:['market'],
    data() {
      return {
        hello: 'hello',
        sellPriceClass:'',
        buyPriceClass:'',
        spreadClass:'',
        sellPriceTimeout:{},
        buyPriceTimeout:{},
        spreadTimeout:{}
      }
    },
    watch:{
      market(val1,val2){

        clearTimeout(this.sellPriceTimeout);
        clearTimeout(this.buyPriceTimeout);
        clearTimeout(this.spreadTimeout);

        var that=this;
        var a = setTimeout(function () {
          that.sellPriceClass='';
        },1000)
        var b = setTimeout(function () {
          that.buyPriceClass='';
        },1000)
        var c = setTimeout(function () {
          that.spreadClass='';
        },1000)

        that.sellPriceTimeout=a;
        that.buyPriceTimeout=b;
        that.spreadTimeout=c;

        if ((val1.sell-val2.sell)>0){
          this.sellPriceClass='price-up'
        }else if ((val1.sell-val2.sell)<0){
          this.sellPriceClass='price-down'
        }

        if ((val1.buy-val2.buy)>0){
          this.buyPriceClass='price-up'
        }else if ((val1.sell-val2.sell)<0){
          this.buyPriceClass='price-down'
        }

        if ((val1.diancha-val2.diancha)>0){
          this.spreadClass='price-up-spread'
        }else if ((val1.diancha-val2.diancha)<0){
          this.spreadClass='price-down-spread'
        }
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
  .price-up{
    color: white;
    background: rgba(53,153,211,1);
  }
  .price-down{
    background: rgba(255,72,102,1);
    color: white;
  }
  .price-up-spread{
    color: rgba(53,153,211,1);
  }
  .price-down-spread{
    color: rgba(255,72,102,1);
  }

  .market-detail-container>.price-container{
    border:.5px solid silver;
    font-weight: bolder;
    border-radius: 3px;
    font-size: 5px;
    transition: all .1s ease-in;
  }
  .market-detail-container{
    width: 100%;
    padding-top: 5px;
    border-bottom: 1px solid silver;
    box-sizing: border-box;
    cursor: pointer;
  }
  .market-detail-container:hover{
    background: #eeeeee;

  }
  .market-detail-container>div{
    display: inline-block;
    overflow: hidden;
    word-break: break-all;
    white-space: pre;
    font-size: 12px;
    padding: 2px 5px;text-align: center;
  }
</style>
