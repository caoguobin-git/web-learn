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
    <home-swiper
      :banners="banners" />
    <recommend-view
      :recommends="recommends" />
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
      :goods="goods[currentTab].list">
    </goods-list>

  </div>
</template>

<script>
import NavBar
  from "components/common/navbar/NavBar";
import HomeSwiper
  from "./childComps/HomeSwiper";
import RecommendView
  from "./childComps/RecommendView";
import FeatureView
  from "./childComps/FeatureView";
import TabControl
  from "components/content/tabControl/TabControl";

import {
  getHomeMultiData,
  getHomeGoods
} from "network/home";
import GoodsList
  from "../../components/content/goods/GoodsList";

export default {
  name: "Home",
  components: {
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
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentTab: 'pop'
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
  methods: {
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.result = res;
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      let page = ++this.goods[type].page;
      getHomeGoods({
        type,
        page
      })
        .then(res => {
          this.goods[type].list.push(...res.data.list)
          console.log(res.data.list);
        })
    },
    changeTabControl(val) {
      console.log(val)
      switch (val) {
        case 0:
          this.currentTab = 'pop';
          break;
        case 1:
          this.currentTab = 'new';
          break
        case 2:
          this.currentTab = 'sell';
          break
        default:
          this.currentTab = 'pop'
      }
    }
  },

}
</script>

<style
  scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background: var(--color-tint);
  color: whitesmoke;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
}

.tab-control {
  position: sticky;
  position: -webkit-sticky;
  top: 44px;
}

</style>
