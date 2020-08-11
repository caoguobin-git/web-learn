<template>
  <div id="home">
    <!---->
    <nav-bar class="home-nav">
      <div slot="center"> 购物街</div>
    </nav-bar>
    <tab-control class="tab-control-fixed" v-show="isTabFixed" ref="tabControl1" @changeTabControl="changeTabControl"
                 :titles="['流行','新款','精选']"/>

    <!--滚动模块-->
    <div class="content-wrapper">
      <scroll :probe-type="3"
              :pull-up-load="true"
              ref="scroll"
              @reachBottom="loadMoreGoods"
              @scroll="scrollPositionChange">
        <home-swiper @swiperImageLoaded="swiperImageLoaded" :banners="banners"/>
        <recommend-view :recommends="recommends"/>
        <feature-view>
          <a :href="'https://act.mogujie.com/zzlx67'">
            <img :src="require('assets/img/home/recommend_bg.jpg')" alt="">
          </a>
        </feature-view>
        <tab-control ref="tabControl" @changeTabControl="changeTabControl" :titles="['流行','新款','精选']"/>
        <goods-list :goods="showGoods"/>
      </scroll>
    </div>
    <!-- 回到顶部 -->
    <back-top @click.native="backToTop" v-show="showBackToTop" class="back-to-top"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";

import {debounce} from "../../common/commonUtils";
import {getHomeMultiData, getHomeGoods} from "network/home";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";
import {itemListenerMixin} from "../../common/mixin";

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
  mixins:[itemListenerMixin],
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
      currentScroll: {x:0,y:0},
      tabOffsetTop: 0,
      scrollY: 0,
    }
  },
  methods: {
    //事件监听相关方法



    //监听返回顶部事件
    backToTop() {
      this.$refs.scroll.backTop(0, 0, 1000)
    },

    //子组件传递事件


    swiperImageLoaded() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      //setTimeout(()=>{
      //
      //},500)
    },


    //根据tab改变显示type
    changeTabControl(val) {
      this.$refs.tabControl1.currentIndex = val
      this.$refs.tabControl.currentIndex = val
      //TODO 可选：切换页面跳转会顶部
      //this.$refs.scroll.backTop(0, -this.tabOffsetTop, 500)
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
    //监听滚动位置
    scrollPositionChange(position) {
      this.currentScroll = position;
      //判断tabControl是否吸顶(position:fixed)

    },
    loadMoreGoods() {
      //获取新的数据，防抖
      debounce(this.getHomeGoods, 500)(this.currentType)
    },

    //网络请求相关方法

    //获取数据
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.result = res;
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    //获取商品数据
    getHomeGoods(type) {
      let page = ++this.goods[type].page;
      getHomeGoods({type, page})
        .then(res => {
          this.goods[type].list.push(...res.data.list);
          this.$refs.scroll.finishPullUp();
        })
        .catch(err => {
        })
    },
  },
  computed: {
    //根据type计算需要显示的数据
    showGoods() {
      return this.goods[this.currentType].list;
    },
    //判断是否展示返回顶部按钮
    showBackToTop() {
      return this.currentScroll.y < -1000;
    },
    //使用Vuex判断图片加载状态
    imageState() {
      return this.$store.state.imageState
    },
    //返回是否吸顶状态
    isTabFixed() {
      return (-this.currentScroll.y) > (this.tabOffsetTop);
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
  },
  mounted() {
    //3.监听item中图片加载完成
    //这种方法有bug，会重复添加监听器
    //let refresh = debounce(this.$refs.scroll.refreshHeight, 500);
    //this.imageListener=()=>{
    //  refresh()
    //}
    //this.$bus.$on('imageLoaded', this.imageListener)


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
  watch: {
    imageState() {
      // this.$refs.scroll.refreshHeight();
    },
    //监听商品变化，deep用于监听内部数据变化
    goods: {
      handler: (val) => {
        //console.log(val)
      },
      deep: true
    },
    isTabFixed(val) {
      //console.log(val)
    }
  },
  beforeDestroy() {
    console.log('destroyed')
  },
  activated() {
    //console.log('进入位置：' + this.scrollY)
    this.$refs.scroll.backTop(0, this.scrollY, 0)
    this.$refs.scroll.refreshHeight()
  },
  deactivated() {
    this.scrollY = this.currentScroll.y
    //console.log('离开位置：' + this.scrollY)
    this.$bus.$off('imageLoaded',this.imageListener)
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

.tab-control-fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}

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
