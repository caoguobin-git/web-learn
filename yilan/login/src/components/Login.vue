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
      还没有账号?<router-link to="/register" style="color: #e6a23c">去注册</router-link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="warning" @click="doLogin" :disabled="loginBtnDisabled" round >&nbsp;&nbsp;登&nbsp;录&nbsp;&nbsp;</el-button>
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
    methods:{
      doLogin(){
        console.log("do login")

        var param = {
          username: this.loginUsername,
          password: this.loginPassword
        }

        var that=this;

        $.ajax({
          url: '/user/login',
          dataType: 'json',
          data: param,
          type: 'post',
          success: function (res) {
            that.loginMsg='登录成功，2秒后跳转'
            setTimeout(function () {
              window.location.href="/tradeIndex"
            },2000)
          },
          error: function (res) {

            that.loginMsg=res.responseJSON.message
            setTimeout(function () {
              that.loginMsg='Customer Documentary Management 系统登录'
            },1500)
          }
        })
      }
    },
    computed:{
      loginBtnDisabled(){
        return this.loginUsername.trim()==''||this.loginPassword.trim()=='';
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
