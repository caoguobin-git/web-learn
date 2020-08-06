<template>
  <div>
    <nav-bar>
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
  </div>
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
</style>
