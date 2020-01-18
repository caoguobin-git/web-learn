<template>
  <div class="trader-container">
    <div class="trader-title-container"> 交易员信息</div>
    <div class="trader-content-container">
      <component @traderLoginOk="traderLoginOk" :is="currentTraderPage"></component>
    </div>
  </div>
</template>

<script>
  import TraderLoginPage from "./TraderLoginPage";
  import TraderInfoPage from "./TraderInfoPage";

  export default {
    name: "Trader",
    components: {TraderInfoPage, TraderLoginPage},
    data() {
      return {
        traderLogin: false,
        currentTraderPage:'TraderLoginPage'
      }
    },
    methods:{
      traderLoginOk(){
        this.traderLogin=true;
        this.currentTraderPage='TraderInfoPage'
      }
    }
  }
</script>

<style scoped>
  .trader-title-container {
    font-size: 16px;
    font-weight: bolder;
    color: rgba(92, 102, 126, 1);
    margin-left: 67px;
    padding-left: 6px;
    border-left: 3px solid rgba(112, 189, 199, 1);
    box-sizing: border-box;
    /*padding-left: 5px;*/
  }

  .trader-content-container {
    width: 80%;
    height: 100%;
    background: white;
    margin-top: 20px;
    margin-left: 67px;
    position: relative;
  }

  .trader-container {
    padding-top: 20px;
    height: 99.5%;
    overflow: hidden;
    background: white;
    /*background: red;*/
    box-sizing: border-box;
  }

</style>
