<template>
  <div style="width: 100%">
    <div >{{detailImage.desc}}</div>
    <div style="margin-top: 10px">{{detailImage.key}}</div>
    <div class="detail-img-container">
      <img @load="imgLoaded" v-for="item in detailImage.list" :src="item" alt="图片加载失败">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailInfoItem",
  props:['detailImage'],
  data(){
    return{
      counter:0
    }
  },
  methods:{
    imgLoaded(){
      if (++this.counter===this.detailImage.list.length)
      this.$emit('imgLoaded')
    }
  },
  computed:{
  }
}
</script>

<style scoped>
.detail-img-container{
  width: 100%;
}

.detail-img-container>img{
  width: 100%;
}
</style>
