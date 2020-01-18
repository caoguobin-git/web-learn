<template>
  <div id="app" :style="{height:windowHeight+'px'}">
    <el-col :span=3 :style="{height: windowHeight+1+'px'}">
      <AsideLeft></AsideLeft>
    </el-col>
    <el-col style="position: relative" :span=21 :style="{height: windowHeight+1+'px'}">
      <el-row>
        <Header></Header>
      </el-row>
      <el-row style="margin-top: 4px;">
        <el-col :style="{height: windowHeight-98+'px'}" :span=21>
          <keep-alive :include="['Trader','Notice','News']">
            <router-view/>
          </keep-alive>
        </el-col>
      </el-row>
      <el-row style="position: absolute;bottom: 0;width: 100%">
        <Footer></Footer>
      </el-row>
    </el-col>
  </div>
</template>

<script>
  import AsideLeft from "./components/AsideLeft";
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import Trader from "./components/trader/Trader";
  import Notice from "./components/notice/Notice";
  import News from "./components/news/News";

  export default {
    name: 'App',
    components: {Footer, Header, AsideLeft},
    data() {
      return {
        windowHeight: 1080,
        usertoken:'1234565'
      }
    },
    methods: {
      initSize() {
        this.windowHeight = window.innerHeight;
      }
    },
    mounted() {
      this.initSize();
      var that = this;
      window.onresize = function () {
        that.initSize();
      }
    }
  }
</script>

<style>
  html, body {
    background: rgba(238, 238, 238, 1);
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    /*background: rgba(239, 239, 239, 1);*/
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
