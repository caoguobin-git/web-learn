<template>
  <div>
    <h3>Profile</h3>
    <p>我是Profile</p>
    <p>姓名：{{ $route.query.name }}</p>
    <p>年龄：{{ $route.query.age }}</p>
  </div>
</template>

<script>
export default {
  name: "Profile",
  mounted() {
    console.log(this.$route.query.name)
    console.log(this.$route.query.age)
  }
}
</script>

<style scoped>

</style>
