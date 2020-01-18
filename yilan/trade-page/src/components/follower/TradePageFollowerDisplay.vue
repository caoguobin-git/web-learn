<template>
  <div style="width: 98%;height:80%;margin: auto">
    <el-menu default-active="3" mode="horizontal">
      <el-menu-item style="border-bottom: none;border-radius: 3px 0px 0px 0px;" @click="followerTag='Account'"
                    index="1">账户
      </el-menu-item>
      <!--      <el-menu-item style="border-bottom: none" @click="followerTag='Orders'" index="2">挂单({{Object.keys(OrdersData).length}})</el-menu-item>-->
      <el-menu-item style="border-bottom: none" @click="followerTag='OpenPositions'" index="3">
        开仓({{Object.keys(OpenPositionsData).length}})
      </el-menu-item>
      <el-menu-item style="border-bottom: none" @click="followerTag='ClosedPositions'" index="4">
        平仓({{Object.keys(ClosedPositionsData).length}})
      </el-menu-item>
      <el-menu-item style="border-bottom: none;padding-right: 12px;border-radius: 0px 3px 0px 0px;" @click="followerTag='Summary'"
                    index="5">总结({{Object.keys(SummaryData).length}})
      </el-menu-item>
    </el-menu>
    <component @closeTrueMarket="closeTrueMarket($event)" :is="followerCurrentDisplay"
               :marketPrecisions="marketPrecisions" :datas="currentDataBind"></component>
  </div>
</template>

<script>
  import FollowerOpenPositions from "./FollowerOpenPositions";
  import FollowerClosedPositions from "./FollowerClosedPositions";
  import FollowerSummary from "./FollowerSummary";
  import FollowerAccount from "./FollowerAccount";
  import FollowerOrders from "./FollowerOrders";

  export default {
    name: "TradePageFollowerDisplay",
    props: ['marketDatas', 'marketPrecisions'],
    components: {FollowerOrders, FollowerAccount, FollowerSummary, FollowerClosedPositions, FollowerOpenPositions},
    data() {
      return {
        followerSocket: {},
        followerTag: 'OpenPositions',
        OpenPositionsData: {},
        ClosedPositionsData: {},
        SummaryData: {},
        AccountData: {},
        OrdersData: {}
      }
    },
    computed: {
      followerCurrentDisplay() {
        return 'Follower' + this.followerTag;
      },
      currentDataBind() {
        return this[this.followerTag + 'Data'];
      }
    },
    methods: {
      closeTrueMarket(data) {
        console.log(data)
      },
      handleOrderAdd(data) {
        this.$set(this.OrdersData, data.tradeID, data);
      },
      handleOrderDeleted(data) {
        this.$delete(this.OrdersData, data.tradeID, data);
      },
      handleAccountAdd(data) {
        this.$set(this.AccountData, 'account', data)
      },
      handleSummaryChanged(data) {
        this.$set(this.SummaryData, data.offerID, data);
      },
      handleSummaryDeleted(data) {
        this.$delete(this.SummaryData, data.offerID)

      },
      handleClosedPositions(data) {
        this.$delete(this.OpenPositionsData, data.tradeID)
        this.$set(this.ClosedPositionsData, data.tradeID, data)
      },
      handleOpenPositions(data) {
        this.$set(this.OpenPositionsData, data.tradeID, data)
      },
      sengMessage(message) {
        var a = JSON.stringify(message);
        this.followerSocket.send(a);
      },
      registerFollowerChannel() {
        var param = {
          type: 'register',
          usertoken: '123'
        }
        this.sengMessage(param);
      },
      createFollowerConnect() {
        var socketId = 'asdfasdfasdfasdf' + 'market';
        var myVue = this;
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          console.log("您的浏览器支持WebSocket");
          //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
          //等同于socket = new WebSocket("ws://localhost:8083/checkcentersys/websocket/20");
          this.followerSocket = new WebSocket('ws://192.168.0.106:8091/follower');
          //打开事件
          this.followerSocket.onopen = function () {
            console.log("Socket " + socketId + "已打开");
            myVue.registerFollowerChannel();
          };
          //获得消息事件
          this.followerSocket.onmessage = function (msg) {
            let result = JSON.parse(msg.data);
            if (result.type == 'OPEN_ADDED' || result.type == 'OPEN_CHANGED') {
              myVue.handleOpenPositions(result.data);
            } else if (result.type == 'CLOSED_ADDED' || result.type == 'CLOSED_CHANGED') {
              myVue.handleClosedPositions(result.data);
            } else if (result.type == 'SUMMARY_ADDED' || result.type == 'SUMMARY_CHANGED') {
              myVue.handleSummaryChanged(result.data);
            } else if (result.type == 'SUMMARY_DELETED') {
              myVue.handleSummaryDeleted(result.data);
            } else if (result.type == 'ACCOUNT_ADDED' || result.type == 'ACCOUNT_CHANGED') {
              myVue.handleAccountAdd(result.data);
            } else if (result.type == 'ORDER_ADDED' || result.type == 'ORDER_CHANGED') {
              console.log("order add")
              console.log(result.data)
              myVue.handleOrderAdd(result.data);
            } else if (result.type == 'ORDER_DELETED') {
              console.log("order deleted")
              console.log(result.data)
              myVue.handleOrderDeleted(result.data);
            }
          };
          //关闭事件
          this.followerSocket.onclose = function () {
            if (confirm("连接断开，点击重连？")) {
              myVue.createFollowerConnect();
            }
          };
          //发生了错误事件
          this.followerSocket.onerror = function (e) {
            console.log("follower socket error")
            console.log(e)
          }
        }
      }
    },
    mounted() {
      console.log("跟随者登录fxcm完成 建立socket连接");
      //1.建立连接
      //2.通过token注册连接
      this.createFollowerConnect();
    }

  }
</script>

<style scoped>
  div {
    margin: 0;
  }

  >>> .el-menu-item {
    width: 104px;
    height: 32px;
    line-height: 32px;
    font-size: 15px;
    box-sizing: border-box;
    text-align: center;
    background: rgba(243, 243, 243, 1);
    border-top: 2px solid rgba(112, 189, 199, 0);
    border-left: 1px solid rgba(112, 189, 199, 0.1);
    border-right: 1px solid rgba(112, 189, 199, 0.1);
    border-bottom: none;
  }

  >>> .el-menu-item.is-active {
    border-top: 2px solid rgba(112, 189, 199, 1);
    border-left: 1px solid rgba(112, 189, 199, 1);
    border-right: 1px solid rgba(112, 189, 199, 1);
    color: rgba(112, 189, 199, 1);
    border-bottom: none;
  }

  >>> .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    color: rgba(112, 189, 199, 1);
  }
</style>
