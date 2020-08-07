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
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    //1.创建对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      //mouseWheel: true,
      pullUpLoad: this.pullUpLoad,
      pullDownRefresh: true
    })

    //2.监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position);
      })
    }

    //3.监听触底事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        //监听到触底事件，发送自定义事件
        this.$emit('reachBottom')
      })
    }
  },
  methods: {
    //返回顶部
    backTop(x, y, time = 300) {
      //console.log('执行滚动：',x,y)
      this.scroll.scrollTo(x, y, time)
    },
    //异步数据加载完成，调用此方法，通知bs更新
    //如果不调用此方法，只能上拉一次
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    //执行刷新，需要防抖
    refreshHeight() {
      this.scroll && this.scroll.refreshHeight && this.scroll.refresh();
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
  overflow: hidden;
}
</style>
