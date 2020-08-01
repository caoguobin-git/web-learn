<template>
  <div id="app">
    <div style="border: 1px solid black">
      <router-view/>
    </div>
    <div style="position: fixed;bottom: 0px;width: 100%;text-align: center">
      <router-link replace tag="button" to="/home">主页</router-link>
      <router-link replace tag="button" to="/about">关于</router-link>
      <router-link replace tag="button" :to="'/user/'+userId">用户</router-link>
      <router-link replace tag="button" :to="{path:'/profile',query:user}">档案</router-link>
      <button @click="profileClick">档案</button>
    </div>
    <!--    <router-link replace tag="button" to="/user/abc">User</router-link>-->
    <!--自定义跳转逻辑-->
    <!--    <button @click="homeClick">首页</button>-->
    <!--    <button @click="aboutClick">关于</button>-->
    <!--    <button @click="userClick">用户</button>-->
  </div>

</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      userId: '张三',
      user:{
        name:'李四',
        age:18
      }
    }
  },
  methods: {
    homeClick() {
      console.log('homeClick');
      //通过代码的方式修改路由vue-router
      //不可以直接调用绕过vue直接修改history
      //所有组件里面都有$router属性
      //入栈
      //this.$router.push('/home');
      //替换
      this.$router.replace('/home')
    },
    aboutClick() {
      console.log('aboutClick');
      this.$router.push('/about')
    },
    userClick() {
      this.$router.push('/user/' + this.userId)
    },
    profileClick(){
      this.$router.push({
        path:'/profile',
        query:this.user
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.hello {
  color: red;
}

</style>
