<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <router-link to="/test/page1">page 1</router-link>
    <router-link to="/test/page2">page 2</router-link>

    <router-view/>
  </div>
</template>



<script>
export default {
  name: 'Test',
  params:[
    'test','test001'
  ],
  data () {
    return {
      msg: 'test'
    }
  },
  methods:{
    alertMounted:function () {
      // console.log("hello")
      // console.log(this.$router)
      // console.log(this.$route.params)
    }
  },
  mounted() {
    this.alertMounted()
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
