<template>
  <div>
    <div class="icons-list">
      <a-icon type="home"/>
      <a-icon type="setting" theme="filled"/>
      <a-icon type="smile" theme="outlined"/>
      <a-icon type="sync" spin/>
      <a-icon type="smile" :rotate="180"/>
      <a-icon type="loading"/>
    </div>
    <hr>
    <div class="icons-list">
      <a-icon type="step-backward"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Icons"
}
</script>

<style scoped>
.icons-list >>> .anticon {
  font-size: 24px;
  margin-right: 6px;
}
</style>