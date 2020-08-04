<template>
  <div class="recommend">
   <div class="recommend-item" v-for="item in recommends">
     <a :href="item.link">
       <img :src="item.image">
       <div>{{item.title}}</div>
     </a>
   </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  width: 100%;
  display: flex;
  padding: 10px 0 10px;
  border-bottom: 6px solid #d5d3d3;
}
.recommend-item{
  flex: 1;
  text-align: center;
  /*padding: 15px;*/
  font-size: 14px;
  margin-bottom: 5px;
}
.recommend-item img{
  width: 85%;
}
</style>
