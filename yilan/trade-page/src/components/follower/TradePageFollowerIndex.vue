<template>
  <div style="height: 75%;text-align: center">
    <img src="../../assets/notlogin.png">
    <p>还没有您的交易信息，请登录交易账号</p>
    <a-button @click="changeDisplayPage" class="login-btn" type="primary" size="small">登录</a-button>
    <a href="http://www.baidu.com" style="text-decoration: none;color: white" target="_blank">
      <a-button size="small" type="default" class="register-btn" plain>注册</a-button>
    </a>
  </div>
</template>

<script>
  export default {
    name: "TradePageFollowerIndex",
    methods: {
      changeDisplayPage: function () {
        this.$emit('changeDisplayPage', 'TradePageFollowerLogin')
      }
    }
  }
</script>

<style scoped>
  .login-btn {
    width: 76px;
    margin-left: 15px;
    border: none;
    border: 1px solid rgba(112, 189, 199, 1);
    background: rgba(112, 189, 199, 1);
    box-shadow: 0px 0px 6px rgba(112, 189, 199, 1);
  }

  .register-btn {
    width: 76px;
    margin-left: 15px;
    margin-top: 10px;
    color: rgba(112, 189, 199, 1);
    border: none;
    border: 1px solid rgba(112, 189, 199, 1);
    /*background: rgba(112,189,199,1);*/
    box-shadow: 0px 0px 6px rgba(112, 189, 199, 1);
  }

  p {
    font-size: 16px;
    color: rgba(88, 151, 159, 1);
  }
</style>
