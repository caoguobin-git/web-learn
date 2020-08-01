<template>
  <div>
    <h2>{{ myUserId }}</h2>
    <p>我是{{this.$route.params.userId}},嘿嘿黑</p>
  </div>
</template>

<script>
export default {
  name: "User",
  computed:{
    myUserId(){
      return this.$route.params.userId+'哈哈';
    }
  }
}
</script>

<style scoped>

</style>
