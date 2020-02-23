<template>
  <a-row style="margin-top: 10px">
    <a-col span="6" offset="9">
      <a-row  class="row-container">
        <a-col span="24" style="text-align: center">
          <span style="text-align: center">{{loginFxcmMsg}}</span>
        </a-col>
      </a-row>
      <a-row class="row-container">
        <a-col span="24">
          <a-input placeholder="请输入账号" v-model="loginFxcmUsername" ref="userNameInput">
            <a-icon slot="prefix" type="user" />
            <a-icon slot="suffix" style="font-size: 12px;color: #aaaaaa" v-if="loginFxcmUsername!=''" @click="loginFxcmUsername=''" type="close"/>

          </a-input>
        </a-col>
      </a-row>
      <a-row class="row-container">
        <a-col span="24">
          <a-input-password  placeholder="请输入密码" v-model="loginFxcmPassword" ref="passWordInput">
            <a-icon slot="prefix" type="lock" />
            <a-icon slot="suffix" style="font-size: 12px;color: #aaaaaa" v-if="loginFxcmPassword!=''" @click="loginFxcmPassword=''" type="close"/>
          </a-input-password >
        </a-col>
      </a-row>
      <a-row class="row-container">
        <a-col span="24">
          <a-select  v-model="accountType" style="width: 100%">
            <a-select-option value="Demo">模拟账号</a-select-option>
            <a-select-option value="Real">真实账号</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="row-container">
        <a-col span="24">
          <a-button type="primary" @click="loginFxcm" :loading="loading" :disabled="loginFxcmBtnDisabled" style="width: 100%">{{loginBtnMsg}}</a-button>
        </a-col>
      </a-row>
      <a-row >
        <a-col span="24" style="text-align: right">
          <span>还没有账号？<a href="http://www.baidu.com" target="_blank">去注册</a></span>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
  export default {
    name: "TradePageFollowerLogin",
    props:['usertoken'],
    data() {
      return {
        loginFxcmUsername: '',
        loginFxcmMsg: '请登入交易平台进行交易',
        loginFxcmPassword: '',
        accountType:'Demo',
        loading:false
      }
    },
    computed: {
      loginFxcmBtnDisabled() {
        return this.loginFxcmUsername.trim() == '' || this.loginFxcmPassword.trim() == ''
      },
      loginBtnMsg(){
        return this.loading?'登录中':(this.loginFxcmBtnDisabled?'请输入账号密码':'登录')
      }
    },
    methods: {
      loginFxcm(){

        this.loading=true;
        this.loginFxcmMsg='登录中....'
        var url='/fxcm/login';
        var param={
          account:this.loginFxcmUsername,
          password:this.loginFxcmPassword,
          type:this.accountType,
          usertoken:this.usertoken
        }

        var that=this;
        $.ajax({
          url:url,
          data:param,
          type:'post',
          dataType:'json',
          success:function (res) {
            console.log(res)
            that.loginFxcmMsg='登录成功';
            that.loading=false;
            that.$emit('changeDisplayPage','TradePageFollowerDisplay')
          },
          error:function (a,b,c) {
            console.log(a)
            that.loginFxcmMsg=res.responseJSON.message;
            console.log(b)
            console.log(c)
            that.loading=false;
          }
        })
      }
    },
    mounted() {
      //init 数据 判断是否已经登录
    }
  }
</script>

<style scoped>

  input::-webkit-input-placeholder { /* WebKit browsers */
    font-size: 14px;
  }

  .row-container{
    margin-top: 10px;
  }
</style>
