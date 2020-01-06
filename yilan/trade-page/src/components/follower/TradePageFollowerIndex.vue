<template>
  <div style="height: 75%;text-align: center">
    <img src="../../assets/notlogin.png">
    <p>还没有您的交易信息，请登录交易账号</p>
    <el-button @click="changeDisplayPage" type="primary" size="small" round>登录</el-button>
    <el-button size="small" round><a href="http://www.baidu.com" target="_blank">注册</a></el-button>
  </div>
</template>

<script>
  export default {
    name: "TradePageFollowerIndex",
    methods:{
      changeDisplayPage:function () {
        this.$emit('changeDisplayPage','TradePageFollowerLogin')
      }
    }
  }
</script>

<style scoped>
  p{
    font-size: 16px;
    color: rgba(88,151,159,1);
  }
</style>
