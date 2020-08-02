<template>
  <div>
    <h2>我是首页</h2>
    <p>我是首页内容，哈哈哈</p>
<!--    <router-link to="/home/news">新闻</router-link>-->
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>
<!--    <keep-alive>-->
      <router-view/>
<!--    </keep-alive>-->
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      message:'Hello World',
    }
  },
  created() {
    console.log('home created');
  },
  destroyed() {
    console.log('home destroyed')
  }
}
</script>

<style scoped>

</style>
