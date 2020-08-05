<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="TOP">
  </div>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>
.back-top{
  position: fixed;
  width: 40px;
  right: 5px;
  bottom: 50px;
  z-index: 1000;
}

.back-top img{
  width: 100%;
}
</style>
