<template>
  <div id="trade-page-trader-info">
    <p id="trade-page-trader-title">交易员信息</p>
    <a-menu default-active="2" mode="horizontal">
      <a-menu-item @click="currentTab='OpenPositions'" index="2">开仓({{Object.keys(TraderOpenPositionsData).length}})
      </a-menu-item>
      <a-menu-item @click="currentTab='ClosedPositions'" index="3">
        平仓({{Object.keys(TraderClosedPositionsData).length}})
      </a-menu-item>
      <a-menu-item @click="currentTab='HistoryPositions'" index="4">历史</a-menu-item>
    </a-menu>
    <component @getTraderHistory="getTraderHistory" :TraderHistoryData="TraderHistoryData" :is="traderCurrentDisplay"
               :marketPrecisions="marketPrecisions" :datas="currentDisplayData"></component>
    <div style="margin-top: 3px;height: 33px;line-height: 33px;position: relative;">
      <div class="trader-in-out">入金: <span>{{traderBalance.in}}</span></div>
      <div class="trader-in-out">出金:<span>{{traderBalance.out}}</span></div>
      <div class="trader-in-out">获利:<span :class="traderGain">{{traderBalance.pl}}</span></div>

      <!--      <el-button @click="changeFollowStatus" size="mini" type="primary" style="position: absolute;right:30px">开始跟单</el-button>-->
      <div style="position: absolute;right:30px;top:4px;font-size: 8px">{{followMsg}}&nbsp;&nbsp;<a-switch
        :disabled="followLoading"
        v-model="followStatus"></a-switch></div>
    </div>
  </div>
</template>

<script>
  import TraderOpenPositions from "./TraderOpenPositions";
  import TraderClosedPositions from "./TraderClosedPositions";
  import TraderHistoryPositions from "./TraderHistoryPositions";

  export default {
    name: "TradePageTrader",
    props: ['marketPrecisions', 'traderBalance','TraderOpenPositionsData', 'TraderClosedPositionsData', 'TraderHistoryData', 'followerToken'],
    components: {TraderHistoryPositions, TraderClosedPositions, TraderOpenPositions},
    data() {
      return {
        currentTab: 'OpenPositions',
        followStatus: false,
        followLoading:false
      }
    },
    watch: {
      followStatus(val) {
        console.log(val);

        for (var i in this.TraderOpenPositionsData) {
          console.log(this.TraderOpenPositionsData[i].account + '  ' + this.followerToken)
        }
        this.followLoading=true;
        var that = this;
        let param={
          traderAccount:'1001195792',
          status:val,
          followerToken:this.followerToken
        }
        this.$root.$emit('changeFollow', param)
      }
    },
    methods: {
      getTraderHistory(data) {
        this.$emit('getTraderHistory', data)
      }
    },
    computed: {
      followMsg() {
        return this.followLoading?'操作中':(this.followStatus ? '取消跟单' : '开始跟单')
      },
      traderGain() {
        return this.traderBalance.pl > 0 ? 'isGain' : 'notGain'
      },
      currentDisplayData() {
        return this[this.traderCurrentDisplay + 'Data'];
      },
      traderCurrentDisplay() {
        return 'Trader' + this.currentTab;
      }
    },
    mounted() {

    },
    created() {
      var that = this;
      this.$root.$on('noticeTraderFollowStatus', (value) => {
        console.log(value)
        that.followLoading=false;
        that.followStatus=value;
      })
    },
    beforeDestroy() {
      this.$root.Bus.$off('noticeTraderFollowStatus')
    },
  }
</script>

<style scoped>
  .isGain {
    color: green;
    font-weight: bolder;
  }

  .notGain {
    color: red;
    font-weight: bolder;
  }

  .trader-in-out {
    position: absolute;
    font-size: 14px;
    top: 6px;
  }

  .trader-in-out:nth-child(1) {
    right: 400px;
  }

  .trader-in-out:nth-child(1) > span {
    color: green;
  }

  .trader-in-out:nth-child(2) {
    right: 275px;
  }

  .trader-in-out:nth-child(2) > span {
    color: red;
  }

  .trader-in-out:nth-child(3) {
    right: 150px;
  }


 >>> .ant-menu-item {
    height: 30px;
    line-height: 30px;
    font-weight: bold;
  }

  #trade-page-trader-info {
    height: 100%;
    border: none;
    box-sizing: border-box;
    /*margin: 5px;*/
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    overflow: hidden;
    background: white;
  }

  #trade-page-trader-title {
    text-align: center;
    font-weight: bolder;
    color: #58979f;
    font-size: 22px;
    margin: 15px 0px 0px 0px;
    font-family: "微软雅黑", sans-serif;
  }

  >>> .ant-menu {
    margin-left: 10px;
  }

  >>> .ant-menu-item {
    width: 104px;
    height: 32px;
    line-height: 32px;
    font-size: 15px;
    font-weight: normal;
    box-sizing: border-box;
    text-align: center;
    background: rgba(243, 243, 243, 1);
    border-top: 2px solid rgba(112, 189, 199, 0);
    border-left: 1px solid rgba(112, 189, 199, 0.1);
    border-right: 1px solid rgba(112, 189, 199, 0.1);
    border-bottom: none;
  }

  >>> .ant-menu-item.ant-menu-item-selected {
    border-top: 2px solid rgba(112, 189, 199, 1);
    border-left: 1px solid rgba(112, 189, 199, 1);
    border-right: 1px solid rgba(112, 189, 199, 1);
    color: rgba(112, 189, 199, 1);
    border-bottom: none;
  }

  >>>.ant-menu-item.ant-menu-item-active:hover{
    color: rgba(112, 189, 199, 1);
    border-bottom: 2px solid rgba(112, 189, 199, 1);
  }

  >>> .a-menu--horizontal .a-menu-item:not(.is-disabled):focus, .a-menu--horizontal .a-menu-item:not(.is-disabled):hover {
    color: rgba(112, 189, 199, 1);
  }
</style>
