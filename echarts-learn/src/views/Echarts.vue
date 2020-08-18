<template>
  <div>
    <div id="myChart" :style="{width: '500px', height: '500px'}"></div>
  </div>
</template>

<script>
export default {
  name: "Echarts",data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  
  methods: {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      //配置使用canvas还是svg
      
      let myChart = this.$echarts.init(document.getElementById('myChart'),null,{renderer: 'canvas'})
      // 绘制图表
      myChart.setOption({
        title: { text: '销量图表' },
        tooltip: {},
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    }
  },
  mounted(){
    this.drawLine();
  }
}
</script>

<style scoped>

</style>