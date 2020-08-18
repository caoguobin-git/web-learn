<template>
  <div>
    <h1>Profile</h1>
    <button @click="getUserInfo">获取用户信息</button>
  </div>
</template>

<script>
import {getUserInfoTest} from "../../network/profile";
export default {
  name: "Profile",
  data(){
    return {
      user:{}
    }
  },
  methods:{
    getUserInfo(){
      getUserInfoTest(12)
      .then(res=>console.log(res))
    }
  }
}
</script>

<style scoped>

</style>
