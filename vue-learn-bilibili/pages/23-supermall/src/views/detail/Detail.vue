<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll class="detail-scroll" :probe-type="3"
            :pull-up-load="true"
            ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-info="goods"/>
      <detail-shop-info :shopInfo="shop"/>

      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
      <h3>hello world</h3>
    </scroll>
  </div>
</template>

<script>
//组件
import DetailNavBar from "./childComps/DetailNavBar";

//网络模块
import {getGoodsDetail, Goods, Shop} from "network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";


export default {
  name: "Detail",
  components: {Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
  data() {
    return {
      goods: {},
      iid: '',
      topImages: [],
      shop: {}
    }
  },
  computed: {},
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
          this.shop = new Shop(data.shopInfo)
        })
    },
  },
  created() {
    this.iid = this.$route.query.id;
    this.getGoods(this.iid);
  }
}
</script>

<style scoped>
#detail{
  height: 100vh;
}
.detail-scroll {
  height:calc(100% - 44px);
  position: relative;
  top: 44px;
  overflow: hidden;
  z-index: 90;
  background: white;
}
</style>
