<template>
  <div style="text-align: center">
    <p style="height: 18px;font-size: 16px;margin: 5px auto;color:silver">{{loginFxcmMsg}}</p>
    <div class="input-container">
      <i class="el-icon-user"></i>
      <input type="text" placeholder="请输入账号" v-model="loginFxcmUsername"></input>
      <i class="el-icon-close" @click="loginFxcmUsername=''" v-if="loginFxcmUsername!=''"></i>
    </div>
    <div class="input-container">
      <i class="el-icon-lock"></i>
      <input type="password" placeholder="请输入密码" v-model="loginFxcmPassword"></input>
      <i class="el-icon-close" @click="loginFxcmPassword=''" v-if="loginFxcmPassword!=''"></i>
    </div>
    <p style="margin: 5px auto 2px 150px">还没有账号？去<a href="http://www.baidu.com" target="_blank">注册</a></p>
    <div style="margin-top: 10px;text-align: justify-all">
     <el-button type="success" @click="loginFxcm" :disabled="loginFxcmBtnDisabled" style="letter-spacing: 20px">&nbsp;登&nbsp;录</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TradePageFollowerLogin",
    data() {
      return {
        loginFxcmUsername: '',
        loginFxcmMsg: '请登入交易平台进行交易',
        loginFxcmPassword: ''
      }
    },
    computed:{
      loginFxcmBtnDisabled(){
        return this.loginFxcmUsername.trim()==''||this.loginFxcmPassword.trim()==''
      }
    },
    methods:{
      loginFxcm(){
        //执行福汇登录
        //成功
        this.$emit('changeDisplayPage','TradePageFollowerDisplay')
        //失败
        this.loginFxcmMsg='登录失败';
        var that=this;
        setTimeout(function () {
          that.loginFxcmMsg='请登入交易平台进行交易'
        },1500)
      }
    }
  }
</script>

<style scoped>
  .input-container {
    border-bottom: 1px solid black;
    width: 300px;
    margin: 5px auto 0px auto;
    padding: 5px 0px 5px 0px;
    text-align: left;
    font-size: 20px;
  }

  .input-container > input {
    border: none;
    outline: none;
    width: 240px;
    font-size: 14px;
    margin-left: 5px;
  }

  input::-webkit-input-placeholder { /* WebKit browsers */
    font-size: 14px;
  }
</style>
