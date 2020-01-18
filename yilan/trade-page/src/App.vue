<template>
  <!--  <el-container>-->
  <el-row>
    <el-col :span=24>
      <el-row id="trade-header-row">
        <el-col :span=24>
          <el-row>
            <TradePageHeader></TradePageHeader>
          </el-row>
        </el-col>
      </el-row>
      <el-row id="trade-body-row" :gutter="10" :style="{height:bodyHeight+'px'}">
        <el-col class="market-data-col" :style="{height:traderHeight+followerHeight+5+'px'}" :span="marketSpan">
          <span :style="marketSpanStyle" class="change-market-size-btn" @click="changeMarketSize"><i
            :class="marketSpanBtnClass"></i> </span>

          <TradePageMarket @changeMarketSize="changeMarketSize" :style="{height:traderHeight+followerHeight+5+'px'}"
                           :marketDatas="marketDatas"></TradePageMarket>
        </el-col>
        <el-col class="trade-data-col" style="height:100%;padding-left: 10px" :span="17-marketSpan">
          <el-row>
            <TradePageTrader @getTraderHistory="getTraderHistory"
                             :style="{height:traderHeight-5+'px'}"
                             :followerToken="usertoken"
                             :TraderHistoryData="traderHistoryData"
                             :TraderOpenPositionsData="traderOpens"
                             :TraderClosedPositionsData="traderCloseds"
                             :marketPrecisions="marketPrecisions"></TradePageTrader>
          </el-row>
          <el-row>
            <TradePageFollower :marketPrecisions="marketPrecisions"
                               :style="{height:followerHeight+'px'}"></TradePageFollower>
          </el-row>
        </el-col>
        <el-col class="notice-data-col" style="height:100%" :span=7>
          <el-row>
            <TradePageNotice :style="{height:noticeHeight-5+'px'}"></TradePageNotice>
          </el-row>
          <el-row>
            <TradePageNews :newsData="newsData" :style="{height:newsHeight+'px'}"></TradePageNews>
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
      TradePageFollower, TradePageTrader, TradePageMarket, TradePageFooter, TradePageHeader
    },
    data() {
      return {
        widthLeft: '427px',
        widthRight: '427px',
        windowHeight: 885,
        marketDatas: {},
        marketPrecisions: {},
        socketForMarket: {},
        marketSpan: 3,
        traderOpens: {},
        traderCloseds: {},
        traderHistoryData: '<div class="history-notice">请选择查询日期进行查询</div>',
        usertoken: '123',
        newsData:{}
      }
    },
    computed: {
      marketSpanBtnClass() {
        return this.marketSpan != 10 ? 'el-icon-arrow-right' : 'el-icon-arrow-left'
      },

      marketSpanStyle() {
        return this.marketSpan != 10 ? {'border-radius': '0px 4px 4px 0px'} : {'border-radius': '4px 0px 0px 4px'}
      },
      noticeHeight: function () {
        return (this.windowHeight - 120) * 0.55;
      },
      newsHeight: function () {
        return (this.windowHeight - 120) - this.noticeHeight;
      },
      traderHeight: function () {
        return (this.windowHeight - 120) * 0.60;
      },
      followerHeight: function () {
        return (this.windowHeight - 120) - this.traderHeight;
      },
      bodyHeight: function () {
        return this.windowHeight - 110;
      },
      headerHeight: function () {
        return this.windowHeight * 0.06
      },
      marketHeight: function () {
        return this.windowHeight * 0.912
      }
    },
    watch: {
      marketDatas: function (val, valOld) {
      }
    },
    methods: {
      handleNews(data){
        this.$set(this.newsData,data.newsId,data);
      },
      handleTraderHistory(data) {
        this.traderHistoryData = data;
      },
      getTraderHistory(data) {
        this.traderHistoryData = '<div class="history-loading">查询中. . .</div>'
        this.socketForMarket.send('traderHistory;' + data)
      },
      handleTraderClosedDatas(message) {
        this.$delete(this.traderOpens, message[1]);
        this.$set(this.traderCloseds, message[1], {
          tradeId: message[1],
          symbol: message[2],
          amount: parseFloat(message[3]),
          side: message[4],
          open: parseFloat(message[5]),
          close: parseFloat(message[6]),
          pl: parseFloat(message[7]),
          grossPL: parseFloat(message[8]),
          rolloverInterest: parseFloat(message[9]),
          netPL: (parseFloat(message[10])).toFixed(2),
          openTime: parseFloat(message[11]),
          closeTime: parseFloat(message[12]),
        })
      },
      handleTraderOpenDatas(message) {
        this.$set(this.traderOpens, message[1], {
          tradeId: message[1],
          symbol: message[2],
          amount: parseFloat(message[3]),
          side: message[4],
          open: parseFloat(message[5]),
          close: parseFloat(message[6]),
          pl: parseFloat(message[7]),
          grossPL: parseFloat(message[8]),
          openTime: parseFloat(message[9]),
          account: message[10]
        })

      },

      changeMarketSize() {
        this.marketSpan = this.marketSpan == 10 ? 3 : 10;
      },
      createMarketConnect: function () {
        var socketId = this.usertoken + 'market';
        var myVue = this;
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
          //等同于socket = new WebSocket("ws://localhost:8083/checkcentersys/websocket/20");
          this.socketForMarket = new WebSocket('ws://192.168.0.106:8090/price');
          //打开事件
          this.socketForMarket.onopen = function () {
            console.log("已建立市场连接：" + myVue.usertoken);
          };
          //获得消息事件
          this.socketForMarket.onmessage = function (msg) {
            // console.log(msg)
            var type = msg.data.substring(0, msg.data.indexOf(';'));
            // console.log(messages)
            if (type === "marketdata") {
              let messages = msg.data.split(";");
              myVue.handleMarketDatas(messages)
            } else if (type === "traderOpen") {
              let messages = msg.data.split(";");

              myVue.handleTraderOpenDatas(messages)
            } else if (type === "traderClosed") {
              let messages = msg.data.split(";");

              myVue.handleTraderClosedDatas(messages)
            } else if (type === "traderHistory") {
              myVue.handleTraderHistory(msg.data.substring(14))
            }else if (type==='news'){
              console.log()
              var news= JSON.parse(msg.data.substring(5))
               myVue.handleNews(news);
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
      handleMarketDatas: function (message) {
        // this.marketDatas[val[1]] = val
        this.$set(this.marketDatas, message[1], {
          symbol: message[1],
          sell: parseFloat(message[2]),
          buy: parseFloat(message[3]),
          high: parseFloat(message[4]),
          low: parseFloat(message[5]),
          rollS: parseFloat(message[6]),
          rollB: parseFloat(message[7]),
          time: new Date(parseFloat(message[8])).toLocaleTimeString(),
          pointSize: parseFloat(message[9]),
          precision: parseInt(message[10]),
          pipCost: parseFloat(message[11])
        })
        this.$set(this.marketPrecisions, message[1], parseInt(message[10]))
      },
      init() {
        this.createMarketConnect();
        this.windowHeight = window.innerHeight * 0.99;
      }
    },
    mounted() {

      this.init();
      var that = this;
      window.onresize = function () {
        that.windowHeight = window.innerHeight - 10;
      }
    }
  }
</script>

<style>
  html, body {
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    background: rgba(239, 239, 239, 1);
  }

  .market-data-col, .trade-data-col, .change-market-size-btn {
    transition: all .5s ease-out;
  }

  .market-data-col {
    position: relative;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    /*margin: 5px 5px 10px 10px;*/
    margin-top: 5px;
    padding-bottom: 10px;
    border-radius: 6px;
    background: white;
    overflow: hidden;
  }


  #trade-body-row {

  }


  .el-menu-item {
    border: none;
  }

  /**::-webkit-scrollbar{*/
  /*  display: none;*/
  /*}*/

  .change-market-size-btn {
    position: absolute;
    float: right;
    z-index: 10;
    /*right: 0%;*/
    top: 400px;
    right: 0%;
    background: rgba(170, 170, 170, 1);
    display: block;
    width: 14px;
    height: 23px;
    color: white;

  }

  /*滚动条宽度*/
  *::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }

  /*滑块样式*/
  *::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 3px;
  }

  *::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.0);
    border-radius: 10px;
    /*background   : #ededed;*/
  }

</style>
