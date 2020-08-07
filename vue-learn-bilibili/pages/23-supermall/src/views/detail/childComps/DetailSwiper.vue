<!--商品图片轮播图-->
<template>
  <Swiper class="detail-swiper" :interval="2000" :anim-duration="300" :move-ratio="0.25" :show-indicator="true">
    <SwiperItem v-for="item in topImages" :key="item">
      <a :href="item.link">
        <img :src="item"  :title="item.title" :alt="item.title">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper";

export default {
  name: "DetailSwiper",
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components: {Swiper, SwiperItem}
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
