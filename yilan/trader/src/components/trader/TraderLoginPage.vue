<template>
  <div class="trader-login-container">
    <p class="login-msg-container">{{loginMsg}}</p>
    <div class="input-container">
      <i class="el-icon-user"></i>
      <input type="text" placeholder="请输入福汇账号" v-model="loginUsername"></input>
      <i class="el-icon-close" @click="loginUsername=''" v-if="loginUsername!=''"></i>
    </div>
    <div class="input-container">
      <i class="el-icon-lock"></i>
      <input type="password" placeholder="请输入福汇密码" v-model="loginPassword"></input>
      <i class="el-icon-close" @click="loginPassword=''" v-if="loginPassword!=''"></i>
    </div>
    <a-button type="success" style="margin-top: 20px;margin-left: 280px" :loading="fxcmLoding" @click="doLogin" :disabled="loginBtnDisabled">&nbsp;&nbsp;登&nbsp;录&nbsp;&nbsp;
    </a-button>
  </div>
</template>

<script>
  export default {
    name: "TraderLoginPage",
    data() {
      return {
        loginUsername: '',
        loginPassword: '',
        loginMsg: '登录福汇以查看交易信息',
        fxcmLoding:false
      }
    },
    computed: {
      loginBtnDisabled() {
        return this.loginUsername.trim() == '' || this.loginPassword.trim() == '';
      }
    },
    methods:{
      doLogin(){
        this.fxcmLoding=true;
        console.log('login')
        var that=this;
        setTimeout(function () {
          console.log('hahah')
          that.$emit('traderLoginOk','aaaa')

        },5000)
        //发送ajax请求
      }
    }
  }
</script>

<style scoped>
  .login-msg-container {
    height: 18px;
    font-size: 18px;
    font-family: "微软雅黑", sans-serif;
    font-weight: bolder;
  }

  .trader-login-container {
    text-align: center;
    margin-top: 100px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    z-index: 3;
  }

  .input-container {
    border: 1px solid silver;
    border-radius: 5px;
    width: 362px;
    margin: 20px auto 0px auto;
    text-align: left;
    padding: 5px 10px;
    font-size: 20px;
  }

  .input-container > input {
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
