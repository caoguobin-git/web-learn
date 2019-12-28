<template>
<!--  <el-container>-->
  <el-row>
    <el-col :span=24>
      <el-row id="trade-header-row">
        <el-col :span=24>
          <TradePageHeader></TradePageHeader>
        </el-col>
      </el-row>
      <el-row id="trade-body-row" :style="{height:bodyHeight+'px'}">
        <el-col style="height:100%" :span=4>
          <TradePageMarket style="height: 100%" :marketDatas="marketDatas"></TradePageMarket>
        </el-col>
        <el-col style="height:100%" :span=13>
          <el-row >
            <TradePageTrader :style="{height:traderHeight+'px'}" ></TradePageTrader>
          </el-row>
          <el-row >
            <TradePageFollower :style="{height:followerHeight+'px'}"></TradePageFollower>
          </el-row>
        </el-col>
        <el-col :span=7>
          <el-row>
            <TradePageNotice :style="{height:noticeHeight+'px'}"></TradePageNotice>
          </el-row>
          <el-row >
            <TradePageNews :style="{height:newsHeight+'px'}"></TradePageNews>
          </el-row>
        </el-col>
      </el-row>
      <el-row id="trade-footer-row">
        <TradePageFooter></TradePageFooter>
      </el-row>
    </el-col>
  </el-row>

</template>

<script>
  import PageFirst from "./components/PageFirst";
  import TradePageHeader from "./components/header/TradePageHeader";
  import TradePageFooter from "./components/footer/TradePageFooter";
  import TradePageMarket from "./components/marketdata/TradePageMarket";
  import TradePageTrader from "./components/trader/TradePageTrader";
  import TradePageFollower from "./components/follower/TradePageFollower";
  import TradePageNotice from "./components/notice/TradePageNotice";
  import TradePageNews from "./components/news/TradePageNews";

  export default {
    name: 'App',
    components: {
      TradePageNews,
      TradePageNotice,
      TradePageFollower, TradePageTrader, TradePageMarket, TradePageFooter, TradePageHeader, PageFirst
    },
    data() {
      return {
        widthLeft: '427px',
        widthRight: '427px',
        windowHeight:885,
        marketDatas: {}
      }
    },
    computed:{
      noticeHeight:function(){
        return (this.windowHeight-120)*0.55;
      },
      newsHeight:function(){
        return (this.windowHeight-120)-this.noticeHeight;
      },
      traderHeight:function(){
        return (this.windowHeight-120)*0.65;
      },
      followerHeight:function(){
        return (this.windowHeight-120)-this.traderHeight;
      },
      bodyHeight:function(){
        return this.windowHeight-110;
      },
      headerHeight:function(){
        return this.windowHeight*0.06
      },
      marketHeight:function () {
        return this.windowHeight*0.912
      }
    },
    watch: {
      marketDatas: function (val, valOld) {
      }
    },
    methods: {
      createMarketConnect: function () {
        var socketId = 'asdfasdfasdfasdf' + 'market';
        var myVue = this;
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          console.log("您的浏览器支持WebSocket");
          //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
          //等同于socket = new WebSocket("ws://localhost:8083/checkcentersys/websocket/20");
          this.socketForMarket = new WebSocket('ws://192.168.0.104:8088/websocket/' + socketId);
          //打开事件
          this.socketForMarket.onopen = function () {
            console.log("Socket " + socketId + "已打开");
          };
          //获得消息事件
          this.socketForMarket.onmessage = function (msg) {
            // console.log(msg.data)
            var messages = msg.data.split(";");
            if (messages[0] === "marketdata") {

              myVue.handlerMarketDatas(messages)
              // myVue.marketDatas.push(messages)
            }
            // console.log(messages)
          };
          //关闭事件
          this.socketForMarket.onclose = function () {
            console.log("Socket已关闭");
            setTimeout(function () {
              myVue.createMarketConnect();
            }, 3000)
          };
          //发生了错误事件
          this.socketForMarket.onerror = function () {
            alert("Socket发生了错误");
            //此时可以尝试刷新页面
          }

        }
      },
      handlerMarketDatas: function (message) {
        // this.marketDatas[val[1]] = val
        this.$set(this.marketDatas, message[1], {
          symbol: message[1],
          sell: parseFloat(message[2]),
          buy: parseFloat(message[3]),
          high: parseFloat(message[4]),
          low: parseFloat(message[5]),
          rollS: parseFloat(message[6]),
          rollB: parseFloat(message[7]),
          time: parseInt(message[8]),
          pointSize: parseFloat(message[9]),
          precision: parseInt(message[10])
        })
      }
    },
    mounted() {
      // this.createMarketConnect();
      this.windowHeight=window.innerHeight;
      var that =this;
      window.onresize=function () {
        that.windowHeight=window.innerHeight;
      }
    }
  }
</script>

<style>
  html, body {
    margin: 0px;
    padding: 0px;
    background: rgba(239, 239, 239, 1);
  }

  .el-tooltip__popper {
    max-width: 300px;
    padding: 10px;
    line-height: 16px;
    text-indent: 24px;
    background: white;
    color: black;
  }
  /**::-webkit-scrollbar{*/
  /*  display: none;*/
  /*}*/

</style>
