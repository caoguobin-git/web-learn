<template>
  <div id="trader-page-left-container">
    <div class="trader-logo-container">
      <img src="../assets/logo.png" style="width: 130px"/>
    </div>
    <keep-alive>

    <div class="trader-tag-container">
      <router-link to="/trader" class="trader-tag" :style="{background:selectBack(1)}" @click.native="currentTag=1">
        <img style="position: relative;top: -2px" :src="traderIcon"/>&nbsp;&nbsp;交易员信息
      </router-link>
      <router-link to="/notice" class="trader-tag" :style="{background:selectBack(2)}" @click.native="currentTag=2"><img
        style="position: relative;top: -2px" :src="strategyIcon"/>&nbsp;&nbsp;交易策略
      </router-link>
      <router-link to="/news" class="trader-tag" :style="{background:selectBack(3)}" @click.native="currentTag=3"><img
        style="position: relative;top: -2px" :src="newsIcon"/>&nbsp;&nbsp;&nbsp;新闻资讯
      </router-link>
    </div>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "AsideLeft",
    data() {
      return {
        currentTag: 1
      }
    },
    methods: {
      selectBack(index) {
        return this.currentTag == index ? 'rgba(37,37,43,1)' : 'rgba(1,1,1,0)';
      }
    },
    computed: {
      traderIcon() {
        return this.currentTag == 1 ? require('../assets/icon1-trader-selected.png') : require('../assets/icon1-trader-unselected.png');
      },
      strategyIcon() {
        return this.currentTag == 2 ? require('../assets/icon3-strategy-selected.png') : require('../assets/icon3-strategy-unselected.png');
      },
      newsIcon() {
        return this.currentTag == 3 ? require('../assets/icon2-news-selected.png') : require('../assets/icon2-news-unselected.png');
      }
    }

  }
</script>

<style scoped>

  #trader-page-left-container {
    background: rgba(57, 57, 65, 1);
    height: 100%;
  }

  .trader-logo-container {
    text-align: center;
    height: 88px;
    padding-top: 44px;
  }

  .trader-tag-container {
    /*background: red;*/
    margin-top: 50px;

  }

  .trader-tag {
    display: block;
    color: white;
    padding: 13px 40px;
    position: relative;
    cursor: default;
    font-size: 14px;
    transition: all 0.3s ease-in;
    text-decoration: none;
  }
</style>
