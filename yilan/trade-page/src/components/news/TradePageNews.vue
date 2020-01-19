<template>
  <div id="trade-page-news-container">
    <!--    <el-row>-->
    <div id="trade-page-news-title">
      最新新闻资讯
    </div>
    <p style="text-indent: 5px;margin: 0px;padding: 0px;font-size: 14px"><i style="color: rgba(112,189,199,1)"
                                                                            class="el-icon-date"></i>&nbsp;&nbsp;&nbsp;{{date
      | formatDate}}</p>
    <div class="news-container">
      <TradePageNewsRow v-for="item in newsSort" :key="item.newsId" :news="item"></TradePageNewsRow>
    </div>
    <!--    </el-row>-->
  </div>
</template>

<script>
  import TradePageNewsRow from "./TradePageNewsRow";
  export default {
    name: "TradePageNews",
    components: {TradePageNewsRow},
    props:['newsData'],
    data() {
      return {
        date: new Date(),
        showNewsHeader: false,
        newsRow: {
          color: 'black',
          height: '12px',
          cursor: 'pointer'
        }
      }
    },
    computed:{
      newsSort(){
        var a =[];
        for (var i in this.newsData){
          a.push(this.newsData[i])
        }

        return a.sort(function (a, b) {
          var dateA = new Date(a.modifiedTime);
          var dateB = new Date(b.modifiedTime);
          return dateB.getTime() - dateA.getTime();
        })
      }
    },
    filters: {
      //设置一个函数来进行过滤
      formatDate: function (value) {
        //创建一个时间日期对象
        var date = new Date();
        var year = date.getFullYear();      //存储年
        var month = date.getMonth() + 1;    //存储月份
        var day = date.getDate();         //存储日期
        var hours = date.getHours();      //存储时
        var minutes = date.getMinutes();  //存储分
        var seconds = date.getSeconds();  //存储秒

        var a = ["日", "一", "二", "三", "四", "五", "六"]
        let weekDay = date.getDay();
        //返回格式化后的日期
        return year + '年' + formatTime(month) + '月' + formatTime(day) + '日 ' + formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds)
          + ' 星期' + a[weekDay];
      }
    },
    mounted() {
      var _this = this;
      this.timeId = setInterval(function () {
        _this.date = new Date();
      }, 1000);
    },
    watch:{
      newsData(val){
        console.log(val)
      }
    },
    methods: {
      sayHello: function (row, column, event) {
        console.log(row)

      },
      getDisplayTime: function (val) {
        // console.log(val)
        return 1;
      },


    }
  }

  function formatTime(val) {
    return val < 10 ? '0' + val : val;
  }
</script>

<style scoped>
  #trade-page-news-container {
    height: 365px;
    box-sizing: border-box;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 6px;
    padding-top: 1px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    background: white;
  }

  #trade-page-news-title {
    margin: 18px 17px;
    font-size: 18px;
    height: 17px;
    line-height: 17px;
    font-family: "微软雅黑", sans-serif;
    color: rgba(88, 151, 159, 1);
    text-indent: 10px;
    border-left: 2px solid rgba(112, 189, 199, 1);
  }


.news-container{
  height: 75%;
  width: 95%;
  margin: auto;
  overflow: scroll;
  border-top: 1px solid rgba(112,189,199,.6);
  margin-top: 4px;
}
  .news-container::-webkit-scrollbar{
    display: none;
  }
</style>
