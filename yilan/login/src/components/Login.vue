<template>
  <div>
    <img src="../assets/logo.png"/>
    <p style="height: 18px;font-size: 14px;margin-top:20px" >{{loginMsg}}</p>
    <div class="input-container">
      <i class="el-icon-user"></i>
      <input type="text" placeholder="请输入账号" v-model="loginUsername"></input>
      <i class="el-icon-close" @click="loginUsername=''" v-if="loginUsername!=''"></i>
    </div>
    <div class="input-container" >
      <i class="el-icon-lock"></i>
      <input type="password" placeholder="请输入密码" v-model="loginPassword"></input>
      <i class="el-icon-close" @click="loginPassword=''" v-if="loginPassword!=''"></i>
    </div>
    <div style="margin-top: 50px;text-align: justify-all">
      还没有账号?<router-link to="/register">去注册</router-link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="warning" round>&nbsp;&nbsp;登&nbsp;录&nbsp;&nbsp;</el-button>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        loginMsg:'Customer Documentary Management 系统登录',
        loginUsername:'',
        loginPassword:''
      }
    },
    mounted() {
      document.title='登录'
    }
  }
</script>

<style scoped>
.input-container{
  border-bottom: 1px solid black;
  width: 362px;
  margin: 40px auto 0px auto;
  padding: 10px 0px 5px 0px;
  text-align: left;
  font-size: 20px;
}
  .input-container>input{
    border: none;
    outline: none;
    width: 300px;
    font-size: 14px;
    margin-left: 5px;
  }

  input::-webkit-input-placeholder { /* WebKit browsers */
    font-size: 14px;
  }
</style>
