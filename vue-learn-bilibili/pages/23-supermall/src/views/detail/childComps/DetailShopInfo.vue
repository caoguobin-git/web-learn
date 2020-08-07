<template>
  <div class="shop-info">
    <div class="shop-info-title">
      <div>
        <img :src="shopInfo.logo" alt="">
      </div>
      <div>{{shopInfo.name}}</div>
    </div>
    <div class="shop-info-middle">
      <div class="shop-info-middle-left">
        <div>
          <p>{{shopInfo.sells}}</p>
          <p>总销量</p>
        </div>
        <div>
          <p>{{shopInfo.goodsCount}}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="shop-info-middle-right">
        <div v-for="score in shopInfo.score">
          <span >{{score.name}}</span>
          <span :style="{color:score.isBetter?'red':'green'}">{{score.score.toFixed(2)}}</span>
          <span style="color: white;padding: 2px;font-size: 12px" :style="{'background':score.isBetter?'red':'green'}">{{score.isBetter?'高':'低'}}</span>
        </div>
      </div>
    </div>
    <div class="detail-shop-btn">
      <div>进店逛逛</div>
    </div>
  </div>
</template>

<!--this.logo=shopInfo.shopLogo;-->
<!--this.name=shopInfo.name;-->
<!--this.fans=shopInfo.cFans;-->
<!--this.sells=shopInfo.cSells;-->
<!--this.score=shopInfo.score;-->
<!--this.goodsCount=shopInfo.cGoods;-->
<script>
export default {
  name: "DetailShopInfo",
  props:{
    shopInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{

  }
}
</script>

<style scoped>
.shop-info{
  margin: 10px 0px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 4px solid #efeded;
  border-bottom: 4px solid #efeded;
}

.shop-info-title{
  margin-top: 15px;
  height: 40px;
  margin-left: 20px;
}
.shop-info-title div{
  display: table-cell;
  vertical-align: middle;
  margin-left: 20px;
}
.shop-info-title>div:nth-child(1){
  width: 40px;
  border-radius: 50px;
  overflow: hidden;
  animation: shop-title-animate 3s infinite alternate-reverse;
}

@keyframes shop-title-animate {
  from{box-shadow: 0 0 30px silver}
  to{box-shadow: 0 0 0px silver}
}

.shop-info-title>div:nth-child(2)::before{
  content: '';
  margin-left: 10px;
}

.shop-info-title>div>img{
  width: 100%;
}

/*.shop-info-title>div:nth-child(2){*/
/*  vertical-align: middle;*/
/*  font-size: 18px;*/
/*  margin-left: 10px;*/
/*}*/

.shop-info-middle{
  display: flex;
  padding-top: 20px;
  font-size: 14px;
  color: #2a2929;
  /*font-weight: bold;*/
}
.shop-info-middle div{
  flex: 1;
  display: inline-block;
  text-align: center;
}
.shop-info-middle-left{
  border-right: 1px solid #c4bcbc;
  height: 80px;
  padding-top: 10px;
}
.shop-info-middle-left>div>p{
  text-align: center;
  padding: 5px 5px;
}

.shop-info-middle-right{
  display: block;
  padding-left: 15px;
}
.shop-info-middle-right>div{
  display: block;
  text-align: left;
  margin: 5px;
}
.shop-info-middle-right>div>span{
  display: inline-block;
}
.shop-info-middle-right>div>span:nth-child(1){
  width: 70px;
}
.shop-info-middle-right>div>span:nth-child(2){
  width: 35px;
}

.shop-info-middle-right>div>span:nth-child(3){
  width: 15px;
  border-radius: 3px;
}

.detail-shop-btn{
  text-align: center;
}
.detail-shop-btn>div{
  display: inline-block;
  width: 40%;
  background: #f1f0f0;
  padding: 8px 0px;
  border-radius: 8px;
  color: #5f5757;
  font-size: 14px;
  line-height: 14px;
}
</style>
