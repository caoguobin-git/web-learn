<template>
  <div>
    <img src="../assets/logo.png"/>
    <p style="height: 18px;font-size: 14px;margin-top:20px;margin-bottom: 30px">{{loginMsg}}</p>
    <div class="input-container">
      <i class="el-icon-user"></i>
      <input type="text" placeholder="请输入账号" v-model="registerUsername"></input>
      <i class="el-icon-close" :style="{color:registerUsernameMsg==''?'black':'red'}" @click="registerUsername=''"
         v-if="registerUsername!=''"></i>
    </div>
    <p class="notice-msg">{{registerUsernameMsg}}</p>
    <div class="input-container">
      <i class="el-icon-lock"></i>
      <input type="password" placeholder="请输入密码" v-model="registerPassword"></input>
      <i class="el-icon-close" :style="{color:registerPasswordMsg==''?'black':'red'}" @click="registerPassword=''"
         v-if="registerPassword!=''"></i>
    </div>
    <p class="notice-msg">{{registerPasswordMsg}}</p>
    <div class="input-container">
      <i class="el-icon-lock"></i>
      <input type="password" placeholder="请确认密码" v-model="registerConfirmPassword"></input>
      <i class="el-icon-close" :style="{color:registerConfirmPassword!=registerPassword?'red':'black'}"
         @click="registerConfirmPassword=''" v-if="registerConfirmPassword!=''"></i>
    </div>
    <p class="notice-msg">{{registerConfirmPasswordMsg}}</p>

    <div style="margin-top: 20px;text-align: justify-all">
      已有账号?
      <router-link to="/login" style="color: #e6a23c">去登录</router-link>
      <el-button @click="doRegister" :disabled="registerBtnDisabled" type="warning" round>&nbsp;&nbsp;注&nbsp;册&nbsp;&nbsp;</el-button>
    </div>
  </div>
</template>


<script>
  export default {
    name: "Register",
    data() {
      return {
        loginMsg: 'Customer Documentary Management 系统注册',
        registerUsername: '',
        registerPassword: '',
        registerConfirmPassword: '',
        registerUsernameMsg: ''
      }
    },
    methods: {
      doRegister: function () {
        console.log('register');
        var param = {
          username: this.registerUsername,
          password: this.registerPassword
        }

        console.log(param)
        console.log(JSON.stringify(param))

        $.ajax({
          url: '/user/',
          dataType: 'json',
          contentType: "application/json",
          data: JSON.stringify(param),
          type: 'post',
          success: function (res) {
            console.log(res)
            alert('注册成功\n2秒后跳转到登录页面');
            setTimeout(function () {
              window.location.href="/index"
            },2000)
          },
          error: function (res) {
            console.log(res)
          }
        })

      },
      judgeUsername() {
        var that = this;

        var user = /^[a-zA-Z]\w{3,15}$/;
        if (!user.test(that.registerUsername) && that.registerUsername != '') {
          that.registerUsernameMsg = '账号应由4-16位字母、数字、下划线组成';
          return;
        }

        $.ajax({
          url: '/user/exist',
          dataType: 'json',
          data: {
            username: that.registerUsername
          },
          type: 'get',
          success: function (res) {
            that.registerUsernameMsg = '';
          },
          error: function (res) {
            that.registerUsernameMsg='该账号已存在'
          }
        })
      }
    },
    watch: {
      registerUsername(val1) {
        this.judgeUsername();
      }
    },
    computed: {
      registerBtnDisabled() {
        return !((this.registerUsernameMsg == '' && this.registerPasswordMsg == '' && this.registerConfirmPasswordMsg == '') && (this.registerUsername != '' && this.registerPassword != '' && this.registerConfirmPassword != ''));
      },
      registerPasswordMsg() {
        //最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符：
        var pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}/;
        return this.registerPassword != '' && !pwd.test(this.registerPassword) ? '最少6位,应包含大写字母、小写字母、数字' : '';
      },
      registerConfirmPasswordMsg() {
        return (this.registerConfirmPassword.length == 0 || this.registerPassword == this.registerConfirmPassword) ? '' : '两次密码不一致';
      }
    },
    mounted() {
      document.title = '注册';

    }
  }
</script>

<style scoped>
  .input-container {
    border-bottom: 1px solid black;
    width: 362px;
    margin: 15px auto 0px auto;
    padding: 5px 0px 5px 0px;
    text-align: left;
    font-size: 20px;
  }

  .input-container > input {
    border: none;
    outline: none;
    width: 300px;
    font-size: 14px;
    margin-left: 5px;
  }

  .input-container > i {
    font-size: 20px;
  }

  input::-webkit-input-placeholder { /* WebKit browsers */
    font-size: 14px;
  }

  .notice-msg {
    font-size: 14px;
    width: 362px;
    height: 20px;
    line-height: 20px;
    margin: 2px auto;
    text-align: left;
    color: red;
  }
</style>
