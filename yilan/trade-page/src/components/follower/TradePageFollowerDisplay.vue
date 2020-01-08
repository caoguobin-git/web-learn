<template>
  <div style="width: 98%;height:80%;margin: auto">
    <el-menu default-active="2" mode="horizontal">
      <el-menu-item index="1">挂单</el-menu-item>
      <el-menu-item @click="followerTag='OpenPositions'" index="2">开仓</el-menu-item>
      <el-menu-item @click="followerTag='ClosedPositions'" index="3">平仓</el-menu-item>
      <el-menu-item index="4">历史</el-menu-item>
    </el-menu>
    <component :is="followerCurrentDisplay" :datas="currentDataBind"></component>
  </div>
</template>

<script>
  import FollowerOpenPositions from "./FollowerOpenPositions";
  import FollowerClosedPositions from "./FollowerClosedPositions";

  export default {
    name: "TradePageFollowerDisplay",
    components: {FollowerClosedPositions, FollowerOpenPositions},
    data() {
      return {
        followerSocket:{},
        followerTag: 'OpenPositions',
        OpenPositionsData:{},
        ClosedPositionsData:{}
      }
    },
    computed: {
      followerCurrentDisplay() {
        return 'Follower' + this.followerTag;
      },
      currentDataBind(){
        return this[this.followerTag+'Data'];
      }
    },
    methods:{
      handleClosedPositions(data){
        console.log(data)
        this.$delete(this.OpenPositionsData,data.tradeID)
        this.$set(this.ClosedPositionsData,data.tradeID,data)
      },
      handleOpenPositions(data){
        this.$set(this.OpenPositionsData,data.tradeID,data)
      },
      sengMessage(message){
        var a = JSON.stringify(message);
        this.followerSocket.send(a);
      },
      registerFollowerChannel(){
        var param ={
          type:'register',
          usertoken:'123'
        }
        this.sengMessage(param);
      },
      createFollowerConnect(){
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
            if (result.type=='OPEN'){
             myVue.handleOpenPositions(result.data);
            }else if (result.type=='CLOSED'){
                console.log(result)
              myVue.handleClosedPositions(result.data);
            }
          };
          //关闭事件
          this.followerSocket.onclose = function () {
            console.log("Socket已关闭");
            setTimeout(function () {
              myVue.createMarketConnect();
            }, 3000)
          };
          //发生了错误事件
          this.followerSocket.onerror = function () {
            alert("Socket发生了错误");
            //此时可以尝试刷新页面
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

  .el-menu-item {
    height: 25px;
    line-height: 20px;
    font-size: 14px;
    padding: 3px 15px;
  }
</style>
