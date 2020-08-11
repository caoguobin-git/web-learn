<template>
  <div class="goods-list-item" @click="itemClick">
    <img @load="imageLoaded" :src="showImage" alt="hello" :title="goodsItem.title">

    <div class="goods-info">
      <p class="goods-list-item-title" :title="goodsItem.title">{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">
      {{goodsItem.cfav}}</span>
    </div>

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
  },
  methods:{
    imageLoaded(){
      //这种方式有bug
      this.$bus.$emit('imageLoaded')
      // this.$store.commit('changeImageState',Math.random());
    },
    itemClick(){
      this.$router.push({
        path:'/detail',
        query:{
          id:this.goodsItem.iid
        }
      })
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
.goods-list-item {
  width: 50%;
  display: inline-block;
  text-align: center;
  position: relative;
  vertical-align: text-top;
  padding-bottom: 30px;
  margin-bottom: 20px;
}
.goods-info{
  position: absolute;
  width: 100%;
  bottom: 0px;
}
.goods-list-item img{
  width: 90%;
  border-radius: 5px;
  margin-top: 0px;
  margin-bottom: 10px;
}
.goods-list-item-title{
  width:100%;/*要显示文字的宽度bai*/
  overflow:hidden;/*超出的部分隐藏du起来。zhi*/
  white-space:nowrap;/*不显示的地方用省略号dao...代替*/
  text-overflow:ellipsis;
  font-size: 14px;
  text-indent: .5rem;
  right: 0;
  left: 0;
  text-align: center;
}

.price{
  color: var(--color-tint);
  margin-right: 10px;
}
.collect::before{
  content: '';
  width: 14px;
  height: 14px;
  display: inline-block;
  vertical-align: text-top;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}


</style>
