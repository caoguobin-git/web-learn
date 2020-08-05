<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props:{
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted() {
    //1.创建对象
    this.scroll=new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      mouseWheel:true,
      pullUpLoad:true,
      pullDownRefresh:true
    })

    //2.监听滚动位置
    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position);
    })

    //3.监听触底事件
    this.scroll.on('pullingUp',()=>{
      this.$emit('reachBottom')
    })
  },
  methods:{
    backTop(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp();
    },
    refreshHeight(){
      this.scroll.refresh();
    }
  }
}
</script>

<style scoped>
.wrapper{
  height: 100%;
  overflow: hidden;
}
</style>
