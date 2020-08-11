<!--
  商品详情页的商品基本信息展示
-->
<template>
  <div style="width: 100%;">
    <div class="goods-detail-title">{{ goodsInfo.title }}</div>
    <div class="detail-price-container">
      <div>{{ goodsInfo.realPrice }}</div>
      <div>{{ goodsInfo.oldPrice }}</div>
      <div>{{ goodsInfo.discount }}</div>
    </div>
    <div class="detail-port-container">
      <div v-for="item in goodsInfo.columns">{{ item }}</div>
    </div>
    <div class="detail-service-container">
      <DetailService :service="service" v-for="service in goodsInfo.services "/>
    </div>
  </div>
</template>


<script>
import DetailService from "./DetailService";
export default {
  name: "DetailBaseInfo",
  components: {DetailService},
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
  },
  methods: {
    display() {
      console.log(this.goodsInfo)
    }
  }

}
</script>

<style scoped>
/*标题显示格式*/
.goods-detail-title {
  font-weight: 600;
  text-indent: 1rem;
  padding: 5px;
  font-size: 15px;
  font-family: "Microsoft YaHei", "Arial Narrow";
  line-height: 18px;
  color: #6a6666;
}

/*价格显示格式*/
.detail-price-container {
  padding: 8px 0px 8px 0px;
}

.detail-price-container div {
  display: inline-block;
  margin-left: 5px;
}

.detail-price-container div:nth-child(1) {
  color: var(--color-high-text);
  font-size: 20px;
}

.detail-price-container div:nth-child(1)::before {
  content: '￥';
}

.detail-price-container div:nth-child(2) {
  color: var(--color-text);
  text-decoration: line-through;
}

.detail-price-container div:nth-child(3) {
  background: var(--color-high-text);
  padding: 2px 5px;
  border-radius: 10px;
  color: whitesmoke;
  font-size: 12px;
  position: relative;
  top: -8px;
}

/*信息显示格式*/
.detail-port-container {
  display: flex;
}

.detail-port-container div {
  flex: 1;
  padding: 2px 5px;
  font-size: 13px;
  color: var(--color-text);
}

.detail-port-container div:nth-child(1) {
  text-align: left;
}

.detail-port-container div:nth-child(3) {
  text-align: right;
}

/*服务显示格式*/
.detail-service-container{
  display: flex;
  flex-wrap: wrap;
  padding: 15px 5px;
  margin-top: 8px;
  border-top: 1px solid #f2f6f8;
  border-bottom: 1px solid #f2f6f8;
  box-shadow: 0px 2px 2px #f1ecec,0px -1px 2px #eeeaea;
}

</style>
