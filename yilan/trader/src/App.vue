<template>
  <a-row id="app" class="main-container">
    <a-col :span=3 style="height: 100%">
      <AsideLeft></AsideLeft>
    </a-col>
    <a-col :span=21 style="position: relative;height: 100%">
      <a-row>
        <Header></Header>
      </a-row>
      <a-row style="margin-top: 4px;height:90%;overflow: hidden">
        <a-col :span=21 style="height: 100%">
          <keep-alive :include="['Trader','Notice','News']">
            <router-view/>
          </keep-alive>
        </a-col>
      </a-row>
      <a-row style="position: absolute;bottom: 0;width: 100%">
        <Footer></Footer>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>

  import AsideLeft from "./components/AsideLeft";
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  // import Trader from "./components/trader/Trader";
  // import Notice from "./components/notice/Notice";
  // import News from "./components/news/News";

  export default {
    name: 'App',
    components: {Footer, Header, AsideLeft},
    data() {
      return {
        usertoken: '1234565'
      }
    },
    methods: {},
    mounted() {
      // this.initSize();
      // var that = this;
      // window.onresize = function () {
      //   that.initSize();
      // }
    }
  }
</script>

<style>
  html, body {
    background: rgba(238, 238, 238, 1);
    margin: 0px;
    padding: 0px;
    position: relative;
    box-sizing: border-box;
    /*background: rgba(239, 239, 239, 1);*/
  }

  #app {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background: rgba(239, 239, 239, 1)
    /*position: relative;*/
    /*top: 0;*/
    /*left: 0;*/
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
