<template>
  <div class="goods-list">
    <goods-list-item :goods-item="item" v-for="item in goods"/>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {GoodsListItem},
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
}
</script>

<style scoped>
.goods-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
