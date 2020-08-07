<!--商品详情页导航-->
<template>
    <nav-bar class="detail-nav-bar">
      <div @click="back" slot="left">
        <img style="vertical-align: middle" src="~assets/img/common/back.svg" alt="返回">
      </div>
<!--      <div slot="center">-->
<!--        <tab-control :titles="titles"></tab-control>-->
<!--      </div>-->
      <div  slot="center" class="title">
          <div :class="{'title-active':currentIndex===index}" @click="currentIndex=index" v-for="(item,index) in titles">{{item}}</div>
      </div>


    </nav-bar>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

export default {
  name: "DetailNavBar",
  components:{TabControl,NavBar},
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex:0
    }
  },
  methods:{
    back(){
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
}
.title>div{
  flex: 1;
  font-size: 14px;
}
.title-active{
  color: var(--color-high-text);
}
.detail-nav-bar{
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 92;
  background: rgba(255,255,255,0.95);
}
</style>
