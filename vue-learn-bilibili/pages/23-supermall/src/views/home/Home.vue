<template>
  <div
    id="home">
    <nav-bar
      class="home-nav">
      <div
        slot="center">
        购物街
      </div>
    </nav-bar>
    <!--滚动模块-->
    <div class="content-wrapper">
      <scroll :probe-type="3"
              :pull-up-load="true"
              ref="scroll"
              @reachBottom="handleReachBottom"
              @scroll="scrollPositionChange">
        <home-swiper
          :banners="banners"/>
        <recommend-view
          :recommends="recommends"/>
        <feature-view>
          <a
            :href="'https://act.mogujie.com/zzlx67'">
            <img
              :src="require('assets/img/home/recommend_bg.jpg')"
              alt="">
          </a>
        </feature-view>
        <tab-control
          @changeTabControl="changeTabControl"
          class="tab-control"
          :titles="['流行','新款','精选']"></tab-control>
        <goods-list
          :goods="showGoods">
        </goods-list>
      </scroll>
    </div>
    <!-- 回到顶部 -->
    <!--    <div @click="backToTop" v-show="showBackToTop" class="back-to-top"></div>-->
    <back-top @click.native="backToTop" v-show="showBackToTop" class="back-to-top"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "../../components/common/scroll/Scroll";

import {getHomeMultiData, getHomeGoods} from "network/home";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backtop/BackTop";

export default {
  name: "Home",
  components: {
    BackTop,
    Scroll,
    GoodsList,
    TabControl,
    FeatureView,
    HomeSwiper,
    NavBar,
    RecommendView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0, list: []
        },
        new: {
          page: 0, list: []
        },
        sell: {
          page: 0, list: []
        }
      },
      currentType: 'pop',
      currentScroll: 0

    }
  },
  methods: {
    //事件监听相关方法

    //监听返回顶部事件
    backToTop() {
      this.$refs.scroll.backTop(0, 0, 1000)
    },

    //子组件传递事件
    changeTabControl(val) {
      switch (val) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break
        case 2:
          this.currentType = 'sell';
          break
        default:
          this.currentType = 'pop'
      }
    },
    scrollPositionChange(position) {
      this.currentScroll = position;
    },
    handleReachBottom() {
      console.log('触底事件发生了');
      this.getHomeGoods(this.currentType);
    },




    //网络请求相关方法
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.result = res;
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      let page = ++this.goods[type].page;
      getHomeGoods({type, page})
        .then(res => {
          this.goods[type].list.push(...res.data.list);
          this.$refs.scroll.finishPullUp();
        })
        .catch(err => {
        })
    }

  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
    showBackToTop() {
      return this.currentScroll.y < -1000;
    },
    imageState(){
      return this.$store.state.imageState
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultiData()

    //2.请求商品数据
    //pop,sell,new
    this.getHomeGoods('sell');
    this.getHomeGoods('new');
    this.getHomeGoods('pop');
    //3.监听item中图片加载完成
    //这种方法有bug，会重复添加监听器
    //this.$bus.$on('imageLoaded',()=>{
    //  //this.$refs.scroll.refreshHeight();
    //  console.log(this.$refs)
    //})


  },
  mounted() {


    //原生实现监听滚动触底事件实现加载新数据
    //window.addEventListener('scroll',e=>{
    //
    //  let clientHeight=document.documentElement.clientHeight || window.innerHeight
    //  let scrollMax=document.documentElement.scrollHeight || document.body.scrollHeight;
    //  let scrollCurrent = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    //  console.log(scrollCurrent)
    //
    //  this.handleScroll(
    //    scrollMax-scrollCurrent-clientHeight
    //  );
    //})
  },
  watch:{
    imageState(){
      this.$refs.scroll.refreshHeight();
    },
    goods:{
      handler:(val)=>{
        console.log(val)
      },
      deep:true
    },
    currentType(val){
      //console.log(val)
    }
  }

}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  z-index: 4;
  height: 100vh;
}

.home-nav {
  background: var(--color-tint);
  color: whitesmoke;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 3;
}

.tab-control {
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  z-index: 4;
}

/*.content-wrapper {*/
/*  overflow: hidden;*/
/*  position: absolute;*/
/*  top: 44px;*/
/*  bottom: 49px;*/
/*  left: 0;*/
/*  right: 0;*/
/*}*/
.content-wrapper {
  height: calc(100% - 90px);
  position: relative;
  top: 44px;
  overflow: hidden;
}

.back-to-top {
  transition: all 5s linear;
  -moz-transition: all 5s linear;
  -webkit-transition: all 5s linear;
  -o-transition: all 5s linear;
}

</style>
