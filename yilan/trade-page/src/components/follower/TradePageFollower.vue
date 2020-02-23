<template>
  <div id="trade-page-follower-info">
    <div id="trade-page-follower-title">我的交易信息</div>
    <component
      @closeTrueMarket="closeTrueMarket"
      :OpenPositionsData="OpenPositionsData"
      :ClosedPositionsData="ClosedPositionsData"
      :SummaryData="SummaryData"
      :AccountData="AccountData"
      :OrdersData="AccountData"
      :usertoken="usertoken" :followStatus="followStatus" @changeDisplayPage="changeDisplayPage($event)"
      :marketPrecisions="marketPrecisions" :is="currentFollowerInfo"></component>
  </div>
</template>


<script>
  import TradePageFollowerIndex from "./TradePageFollowerIndex";
  import TradePageFollowerLogin from "./TradePageFollowerLogin";
  import TradePageFollowerDisplay from "./TradePageFollowerDisplay";

  export default {
    name: "TradePageFollower",
    props: ['marketPrecisions', 'usertoken', 'traderAccounts'],
    components: {TradePageFollowerDisplay, TradePageFollowerLogin, TradePageFollowerIndex},
    data() {
      return {
        followStatus: {},
        loginFxcmOk: true,
        followerSocket: {},
        currentFollowerInfo: 'TradePageFollowerIndex',
        OpenPositionsData: {},
        ClosedPositionsData: {},
        SummaryData: {},
        AccountData: {},
        OrdersData: {},
        TraderAccounts: [],
        followerSocketUrl:'ws://192.168.0.101:8091/follower'
      }
    },
    methods: {
      handleTraderAccounts(data) {
        console.log(data)
        let parse = JSON.parse(data);
        for (var i in parse){
          this.TraderAccounts.push(parse[i]+'')
        }
      },
      getTraderAccounts() {
        var param = {
          type: 'getTraderAccounts',
          usertoken: this.usertoken,
        }
        this.sendMessage(param)
      },
      closeTrueMarket(data) {
        console.log('我收到了信息啦' + data)
        var param = {
          type: 'closeTrueMarket',
          tradeId: data,
          usertoken: this.usertoken,
        }
        console.log(param)
        this.sendMessage(param)
      },
      noticeTraderFollowStatus(data) {
        this.$root.$emit('noticeTraderFollowStatus', data)
      },
      changeFollow(data) {
        console.log(data)
        data.type = 'changeFollowStatus';
        if (this.TraderAccounts.length == 0) {
          alert('没有交易员登录');
          return;
        } else {
          data.traderAccount = this.TraderAccounts[0];
          this.sendMessage(data)
        }
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
      sendMessage(message) {
        var a = JSON.stringify(message);
        this.followerSocket.send(a);
      },
      registerFollowerChannel() {
        var param = {
          type: 'register',
          usertoken: this.usertoken
        }
        this.sendMessage(param);
      },
      changeDisplayPage(event) {
        this.currentFollowerInfo = event
      },
      createFollowerConnect() {
        var socketId = this.usertoken + 'market';
        var myVue = this;
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          console.log("您的浏览器支持WebSocket");
          //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
          //等同于socket = new WebSocket("ws://localhost:8083/checkcentersys/websocket/20");
          this.followerSocket = new WebSocket(this.followerSocketUrl);
          //打开事件
          this.followerSocket.onopen = function () {
            console.log("Socket " + socketId + "已打开");
            myVue.registerFollowerChannel();
            //todo 多次尝试获取交易员数据
            myVue.getTraderAccounts();
          };
          //获得消息事件
          this.followerSocket.onmessage = function (msg) {
            // console.log(msg)
            //有消息 登录 直接跳转

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
            } else if (result.type == 'FOLLOW_STATUS_START') {
              console.log(result)
              myVue.$message.success('开始跟单成功')
              myVue.noticeTraderFollowStatus(true)
            } else if (result.type == 'FOLLOW_STATUS_STOP') {
              console.log(result)
              myVue.noticeTraderFollowStatus(false)
              myVue.$message.success('停止跟单成功')
            } else if (result.type == 'LOGIN_STATUS') {
              myVue.currentFollowerInfo = 'TradePageFollowerDisplay';
            } else if (result.type == 'FOLLOW_STATUS') {
              myVue.noticeTraderFollowStatus(result.data == 'YES')
            } else if (result.type == 'TRADER_ACCOUNTS') {
              console.log(result)
              myVue.handleTraderAccounts(result.data)
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
    created() {
      var that = this;
      this.$root.$on('changeFollow', (value) => {
        that.changeFollow(value)
      })
    },
    beforeDestroy() {
      this.$root.Bus.$off('changeFollow')
    },
    mounted() {
      console.log("跟随者登录fxcm完成 建立socket连接");
      //1.建立连接
      //2.通过token注册连接
      this.createFollowerConnect()
    }
  }
</script>

<style scoped>
  .el-menu-item {
    height: 30px;
    line-height: 30px;
    font-weight: bold;
  }

  #trade-page-follower-info {
    height: 100%;
    box-sizing: border-box;
    /*margin: 5px;*/
    margin-top: 5px;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    background: white;
    overflow: hidden;
  }

  #trade-page-follower-info:hover {
  }

  #trade-page-follower-title {
    margin: 18px 17px 8px;
    font-size: 18px;
    height: 17px;
    line-height: 17px;
    font-family: "微软雅黑", sans-serif;
    color: rgba(88, 151, 159, 1);
    text-indent: 10px;
    border-left: 2px solid rgba(112, 189, 199, 1);
  }
</style>
