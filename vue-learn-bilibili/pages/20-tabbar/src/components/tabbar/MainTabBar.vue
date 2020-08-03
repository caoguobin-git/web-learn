<template>
  <div>
    <tab-bar>
      <tab-bar-item v-for="tabBar in tabbars" :key="tabBar.path" :path="tabBar.path" :active-color="tabBar.activeColor">
        <!--        <template v-slot:item-icon>-->
        <img slot="item-icon" :src="tabBar.pic" alt="home">
        <!--        </template>-->
        <!--        <template v-slot:item-icon-active>-->
        <img slot="item-icon-active" :src="tabBar.picActive">
        <!--        </template>-->
        <!--        <template v-slot:item-text>-->
        <div slot="item-text">{{ tabBar.text }}</div>
        <!--        </template>-->
      </tab-bar-item>
    </tab-bar>

  </div>
</template>

<script>

import TabBar from "./TabBar";
import TabBarItem from "./TabBarItem";

export default {
  name: "MainTabBar",
  components:{
    TabBar,TabBarItem
  },
  data(){
    return {
      tabbars: [
        {
          pic: require('../../assets/img/tabbar/home.svg'),
          picActive: require('../../assets/img/tabbar/home-active.svg'),
          text: '首页',
          path: '/home',
          activeColor:'#d81e06'
        },
        {
          pic: require('../../assets/img/tabbar/category.svg'),
          picActive: require('../../assets/img/tabbar/category-active.svg'),
          text: '分类',
          path: '/category'
        },
        {
          pic: require('../../assets/img/tabbar/cart.svg'),
          picActive: require('../../assets/img/tabbar/cart-active.svg'),
          text: '购物车',
          path: '/cart'
        },
        {
          pic: require('../../assets/img/tabbar/profile.svg'),
          picActive: require('../../assets/img/tabbar/profile-active.svg'),
          text: '我的',
          path: '/profile'
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
