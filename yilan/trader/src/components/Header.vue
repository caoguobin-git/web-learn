<template>
    <div id="header-container">
      <div class="user-info-container"><i class="el-icon-user"></i> 账号：701116547</div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
#header-container{
  width: 100%;
  height: 60px;
  background: white;
  text-align: right;
  position: relative;
}
  .user-info-container{
    position: absolute;
    right: 100px;
    top: 20px;
  }
</style>
