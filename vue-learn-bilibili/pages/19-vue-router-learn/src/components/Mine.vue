<template>
  <div>
    <p>{{message}}</p>
    <router-link to="/">主页</router-link>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data () {
    return {
      msg: 'mine page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
