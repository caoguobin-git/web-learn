<template>
  <Swiper :interval="2000" :anim-duration="300" :move-ratio="0.25" :show-indicator="true">
    <SwiperItem v-for="item in banners" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad" :title="item.title" :alt="item.title">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index";

export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
        imageLoaded:false
    }
  },
  components: {
    SwiperItem, Swiper
  },
  methods:{
    imageLoad(){
      if (!this.imageLoaded){
        this.$emit('swiperImageLoaded')
        this.imageLoaded=true;
      }
    }
  }
}
</script>

<style scoped>

</style>
