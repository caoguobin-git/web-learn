<template>
  <div style="width: 98%;height:76%;margin: auto">
    <a-menu default-active="3" mode="horizontal">
      <a-menu-item style="border-bottom: none;border-radius: 3px 0px 0px 0px;" @click="followerTag='Account'"
                    index="1">账户
      </a-menu-item>
      <!--      <a-menu-item style="border-bottom: none" @click="followerTag='Orders'" index="2">挂单({{Object.keys(OrdersData).length}})</a-menu-item>-->
      <a-menu-item style="border-bottom: none" @click="followerTag='OpenPositions'" index="3">
        开仓({{Object.keys(OpenPositionsData).length}})
      </a-menu-item>
      <a-menu-item style="border-bottom: none" @click="followerTag='ClosedPositions'" index="4">
        平仓({{Object.keys(ClosedPositionsData).length}})
      </a-menu-item>
      <a-menu-item style="border-bottom: none;padding-right: 12px;border-radius: 0px 3px 0px 0px;" @click="followerTag='Summary'"
                    index="5">总结({{Object.keys(SummaryData).length}})
      </a-menu-item>
    </a-menu>
    <component class="follower-component-container" @closeTrueMarket="closeTrueMarket" :is="followerCurrentDisplay"
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
    props: ['marketDatas', 'marketPrecisions','OrdersData','AccountData','SummaryData','usertoken','OpenPositionsData','ClosedPositionsData'],
    components: {FollowerOrders, FollowerAccount, FollowerSummary, FollowerClosedPositions, FollowerOpenPositions},
    data() {
      return {
        followerSocket: {},
        followerTag: 'OpenPositions',
        // OpenPositionsData: {},
        // ClosedPositionsData: {},
        // SummaryData: {},
        // AccountData: {},
        // OrdersData: {}
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
        this.$emit('closeTrueMarket', data)
      }
    },
    watch:{

    },
    mounted() {
    }

  }
</script>

<style scoped>
  div {
    margin: 0;
  }

  >>> .a-menu-item {
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

  >>> .a-menu-item.is-active {
    border-top: 2px solid rgba(112, 189, 199, 1);
    border-left: 1px solid rgba(112, 189, 199, 1);
    border-right: 1px solid rgba(112, 189, 199, 1);
    color: rgba(112, 189, 199, 1);
    border-bottom: none;
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

  /*.follower-component-container{*/
  /*  width: 100px;*/
  /*  overflow: scroll;*/
  /*}*/

  >>> .ant-menu--horizontal .ant-menu-item:not(.is-disabled):focus, .ant-menu--horizontal .ant-menu-item:not(.is-disabled):hover {
    color: rgba(112, 189, 199, 1);
  }
</style>
