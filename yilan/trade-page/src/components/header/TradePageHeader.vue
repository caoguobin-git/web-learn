<template>
  <div id="trade-page-header" >
<!--    :style="{'height':height}"-->
      <img id="trade-page-header-logo" src="./img/logo1.png"/>

  </div>
</template>

<script>
  export default {
    name: "TradePageHeader",
    data() {
      return {
        height: '200px'
      }
    },
    mounted() {
      this.initSize();
    },
    methods: {
      initSize: function () {
        this.height = window.innerHeight * 0.05 +'px';
      }
    }
  }
</script>

<style scoped>
  #trade-page-header-logo{
    margin-right: 30px;
    /*width: 6%;*/
    width: 129px;
    height: 34px;
    float: left;
    margin-left: 80px;
    margin-top: 13px;
  }


  #trade-page-header {
    background: rgb(50, 50, 58);
    height: 60px;
    margin-bottom: 5px;
  }
</style>
