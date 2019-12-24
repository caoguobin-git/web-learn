<template>
  <div class="nav-bar">
    <h1>{{msg}} </h1>
    <i v-for="item in numlist"> {{item}} </i>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    props:{
      numlist:{
        type:Array,
        default:function () {
          return [4,5,6]
        }
      }
    },
    data: function () {
      return {msg: '这是一个导航栏'}
    }
  }
</script>

<style scoped>
  h1 {
    color: red;
  }
</style>
