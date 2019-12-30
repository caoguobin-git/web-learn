<template>
  <div>
    <img src="../assets/logo.png"/>
    <p style="height: 18px;font-size: 14px;margin-top:20px;margin-bottom: 30px" >{{loginMsg}}</p>
    <div class="input-container">
      <i class="el-icon-user"></i>
      <input type="text" placeholder="请输入账号" v-model="registerUsername"></input>
      <i class="el-icon-close" :style="{color:registerUsernameMsg==''?'black':'red'}" @click="registerUsername=''" v-if="registerUsername!=''"></i>
    </div>
    <p class="notice-msg">{{registerUsernameMsg}}</p>
    <div class="input-container" >
      <i class="el-icon-lock"></i>
      <input type="password" placeholder="请输入密码" v-model="registerPassword"></input>
      <i class="el-icon-close" :style="{color:registerPasswordMsg==''?'black':'red'}" @click="registerPassword=''" v-if="registerPassword!=''"></i>
    </div>
    <p class="notice-msg">{{registerPasswordMsg}}</p>
    <div class="input-container" >
      <i class="el-icon-lock"></i>
      <input type="password" placeholder="请确认密码" v-model="registerConfirmPassword"></input>
      <i class="el-icon-close" :style="{color:registerConfirmPassword!=registerPassword?'red':'black'}" @click="registerConfirmPassword=''" v-if="registerConfirmPassword!=''"></i>
    </div>
    <p class="notice-msg">{{registerConfirmPasswordMsg}}</p>

    <div style="margin-top: 20px;text-align: justify-all">
      已有账号?<router-link to="/login" style="color: #e6a23c">去登录</router-link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="warning" round>&nbsp;&nbsp;注&nbsp;册&nbsp;&nbsp;</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Register",
      data(){
          return{
            loginMsg:'Customer Documentary Management 系统注册',
            registerUsername:'',
            registerPassword:'',
            registerConfirmPassword:''
          }
      },
      computed:{
        registerUsernameMsg(){
          return (this.registerUsername.length==0)?'':'此账号已被占用';
        },
        registerPasswordMsg(){
          return (this.registerPassword.length==0||this.registerPassword.length>5)?'':'密码不符合规范';
        },
        registerConfirmPasswordMsg(){
          return (this.registerConfirmPassword.length==0||this.registerPassword==this.registerConfirmPassword)?'':'两次密码不一致';
        }
      },
      mounted() {
          document.title='注册'
      }
    }
</script>

<style scoped>
  .input-container{
    border-bottom: 1px solid black;
    width: 362px;
    margin: 15px auto 0px auto;
    padding: 5px 0px 5px 0px;
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

  .input-container>i{
    font-size: 20px;
  }

  input::-webkit-input-placeholder { /* WebKit browsers */
    font-size: 14px;
  }

  .notice-msg{
    font-size: 14px;
    width: 362px;
    height: 20px;
    line-height: 20px;
    margin:2px auto;
    text-align: left;
    color: red;
  }
</style>
