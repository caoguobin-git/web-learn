<template>
  <div class="goods-list-item">
    <img :src="goodsItem.show.img" alt="hello" :title="goodsItem.title">
    <div :title="goodsItem.title" class="goods-list-item-title">{{goodsItem.title}}</div>
    <div>{{goodsItem.price}}</div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return null;
      }
    }
  }
}
</script>

<style scoped>
.goods-list-item {
  width: 50%;
  display: inline-block;
  text-align: center;
}

.goods-list-item img{
  width: 90%;
  border-radius: 5px;
}
.goods-list-item-title{
  width:90%;/*要显示文字的宽度bai*/
  overflow:hidden;/*超出的部分隐藏du起来。zhi*/
  white-space:nowrap;/*不显示的地方用省略号dao...代替*/
  text-overflow:ellipsis;
  font-size: 14px;
  text-indent: 1rem;
}
</style>
