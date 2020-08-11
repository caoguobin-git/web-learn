<template>
  <div id="detail">
    <detail-nav-bar @changeDisplay="changeDisplay"/>
    <scroll class="detail-scroll" :probe-type="3"
            :pull-up-load="true"
            ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-info="goods"/>
      <detail-shop-info :shopInfo="shop"/>

      <div class="prod-detail-info">
        <div class="prod-detail-info-desc">{{ detailInfo.desc }}</div>
        <div class="prod-detail-info-img-container">
          <detail-info-item @imgLoaded="imgLoaded" :detail-image="item" v-for="item in detailInfo.detailImage"/>
        </div>
      </div>

      <detail-params-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
<!--      <DetailRecommends @recommendClicked="recommendClicked" :recommends="recommends"/>-->
      <GoodsList :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
//组件
import DetailNavBar from "./childComps/DetailNavBar";

//网络模块
import {getGoodsDetail,getGoodsRecommend, Goods, Shop} from "network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailInfoItem from "./childComps/DetailInfoItem";
import {GoodsParam} from "../../network/detail";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
//import DetailRecommends from "./childComps/DetailRecommends";
import GoodsList from "../../components/content/goods/GoodsList";

import {debounce} from "../../common/commonUtils";


import {itemListenerMixin} from "../../common/mixin";

export default {
  name: "Detail",
  components: {
    GoodsList,
    DetailCommentInfo,
    DetailParamsInfo, DetailInfoItem, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
  data() {
    return {
      goods: {},
      iid: '',
      topImages: [],
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends:[],
      imageListener:null
    }
  },
  computed: {},
  mixins:[itemListenerMixin],
  methods: {
    //获取数据并完成数据分离
    getGoods(id) {
      getGoodsDetail(id)
        .then(res => {
          this.goodsItem = res;
          console.log(res)
          const data = res.result;
          this.topImages = data.itemInfo.topImages
          //2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          //3.创建店铺信息
          this.shop = new Shop(data.shopInfo);
          //4.保存商品描述信息
          this.detailInfo = res.result.detailInfo
          //5.获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          //6.获取评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
        })
    },
    getGoodsRecommend(){
      getGoodsRecommend()
      .then(res=>{
        console.log(res)
        this.recommends=res.data.list;
      })
    },
    imgLoaded() {
      this.$refs.scroll.refreshHeight();
    },
    changeDisplay(val) {
      console.log(val)
      switch (val) {
        case 1:
        //location.hash='#detail-params'
      }
    },
    recommendClicked(val){
      this.iid=val;
      this.getGoods(this.iid);
      this.getGoodsRecommend()
    }
  },
  created() {
    this.iid = this.$route.query.id;
    this.getGoods(this.iid);
    this.getGoodsRecommend()
  },
  mounted() {

  },
  destroyed() {
    this.$bus.$off('imageLoaded',this.imageListener)
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
}

.detail-scroll {
  height: calc(100% - 44px);
  position: relative;
  top: 44px;
  overflow: hidden;
  z-index: 90;
  background: white;
}

.prod-detail-info-desc {
  text-indent: 2rem;
}

.prod-detail-info-img-container {
  width: 100%;
}

.prod-detail-info-img-container > img {
  width: 50%;
}
</style>
