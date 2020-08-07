<!--商家服务详情-->
<template>
  <div class="detail-service">
    <input type="checkbox" disabled v-if="service.icon===undefined">
    <img v-else :src="service.icon" alt="">
    <span>{{service.name}}</span>
  </div>
</template>

<script>
export default {
  name: "DetailService",
  props: {
    service: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.detail-service{
  flex: 1;
  font-size: 12px;
  text-align: center;
}
.detail-service>img{
  width: 12px;
}
</style>
