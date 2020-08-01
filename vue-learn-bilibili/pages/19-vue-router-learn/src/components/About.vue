<template>
  <div>
    <h2>我是关于</h2>
    <p>我是关于内容，呵呵呵</p>
    <router-link to="/home">去主页</router-link>

  </div>
</template>

<script>
export default {
  name: "About",
  mounted() {
    document.title='关于'
  }
}
</script>

<style scoped>

</style>
