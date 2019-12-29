<template>
  <div id="app" :style="{height:containerHeight+'px',marginTop:containerMarginTop+'px'}">

    <el-row>
      <el-col :span="16">
        <div id="pic-container" :style="picContainerStyle">
          <transition name="pic">

            <img :src="currentPic" :style="picStyle"/>
          </transition>
        </div>
      </el-col>
      <el-col :span="8">
        <div id="login-register-container" :style="loginRegisterContainerStyle">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        windowHeight: 800,
        picArray: ['./assets/pic1.png', './assets/pic2.png', './assets/pic3.png',],
        currentIndex: 0
      }
    },
    computed: {
      loginRegisterContainerStyle(){
        return {marginLeft:'-200px',height:this.containerHeight*0.5+'px',marginTop:(this.containerHeight-this.containerHeight*0.5)/2.5+'px'}
      },
      picContainerStyle(){
        return {testAlign:'left',overFlow:'hidden',height:this.containerHeight*0.664+'px',marginTop:(this.containerHeight-this.containerHeight*0.664)*0.5+'px'}
      },
      picStyle(){
        return {marginLeft:'-60px',height:this.containerHeight*0.664+'px'}
      },
      currentPic() {
        return require(this.picArray[this.currentIndex] + '')
      },
      containerHeight() {
        return this.windowHeight * 0.722
      },
      containerMarginTop() {
        return (this.windowHeight - this.containerHeight) / 2;
      }
    },
    methods: {
      displayPic() {
        var that = this;
        setInterval(function () {
          if (that.currentIndex == 2) {
            that.currentIndex = 0;
          } else {
            that.currentIndex++;
          }
        }, 3000)
      },

      initSize() {
        this.windowHeight = window.innerHeight;
      }
    },
    mounted() {
      this.initSize();
      this.displayPic();
      var that = this;
      window.onresize = function () {
        that.initSize();
      }
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    background: rgb(50, 50, 58);
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: white;
    width: 77.2%;
    margin: auto;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to
  {
    opacity: 0;
  }
  #pic-container>img{
    /*width: 100%;*/
    height: 100%;
    animation: myDemo linear 3s infinite;
  }
  @keyframes myDemo {
    0%{
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    75%{
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
  #login-register-container{

  }

  .login-register-input{
    outline: none;
  }

</style>
