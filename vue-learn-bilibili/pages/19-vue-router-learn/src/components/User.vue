<template>
  <div>
    <h2>{{ myUserId }}</h2>
    <p>我是{{this.$route.params.userId}},嘿嘿黑</p>
    <button @click="btnClick">点击</button>
  </div>
</template>

<script>
export default {
  name: "User",
  computed:{
    myUserId(){
      return this.$route.params.userId+'哈哈';
    }
  },
  methods:{
   btnClick(){
     console.log(this.$router)
     console.log(this.$route)
   }
  }
}
</script>

<style scoped>

</style>
