<template>
    <a-row>
      <a-col span="24">
        <h1>This login page</h1>
        <router-view/>
      </a-col>
    </a-row>
</template>

<script>
    import LoginBox from "./LoginBox";
    import RegisterBox from "./RegisterBox";
    export default {
        name: "LoginPage",
      components: {RegisterBox, LoginBox}
    }
</script>

<style scoped>

</style>
