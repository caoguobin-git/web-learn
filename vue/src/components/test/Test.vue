<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <img src="../test/logo.png"/>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      msg: 'Test'
    }
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
