<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>这是第一页</h1>
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
  </div>
</template>

<script>
export default {
  name: 'PageFirst',
  data () {
    return {
      msg: 'First'
    }
  },
  mounted() {
    console.log('第一页加载完成');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
