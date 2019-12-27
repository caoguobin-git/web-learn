<template>
  <div id="trade-page-news-container">
    <el-row>
      <div id="trade-page-news-title">
        最新新闻资讯
      </div>
      <p style="text-indent: 5px;margin: 0px;padding: 0px;font-size: 14px"><i style="color: blue"
                                                                              class="el-icon-date"></i>&nbsp;&nbsp;&nbsp;{{date
        | formatDate}}</p>
      <el-table :data="news" max-height="270" :show-header=false :cell-style="newsRow" @row-click="sayHello"
                row-key="date" empty-text="暂无新闻" border
                stripe style="width: 395px">
        <el-table-column :index="0" header-align="center" type="extend" show-overflow-tooltip
                         label="国家/地区"
                         width="80">
          <template slot-scope="scope">
            <div style="text-align: center">
              <span>{{scope.row.country}}</span>
              <br>
              <span v-html="getStar(scope.row.important)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :index="0" header-align="center" type="extend" show-overflow-tooltip
                         label="新闻内容"
                         width="204" prop="content">
        </el-table-column>
        <el-table-column align="center" label="时间">
          <template slot-scope="scope">
            {{getDisplayTime(scope.row.time)}}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "TradePageNews", data() {
      return {
        date: new Date(),
        showNewsHeader: false,
        newsRow: {
          color: 'black',
          height: '12px',
          cursor: 'pointer'
        },
        news: [{
          country: 'USA',
          important: 1,
          content: '啊手动阀手动阀',
          time: 15845824
        }, {
          country: 'USA',
          important: 2,
          content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀',
          time: 15845824
        }, {
          country: 'USA',
          important: 3,
          content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀',
          time: 15845824
        }, {
          country: 'USA',
          important: 4,
          content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀',
          time: 15845824
        }, {
          country: 'USA',
          important: 5,
          content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀',
          time: 15845824
        }]
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
    methods: {
      sayHello: function (row, column, event) {
        console.log(row)

      },
      getDisplayTime: function (val) {
        console.log(val)
        return 1;
      },

      getStar: function (val) {
        let result = '';
        switch (val) {
          case 1:
            result = '<span style="color: black">\u2605</span>';
            break;
          case 2:
            result = '<span style="color: black">\u2605\u2605</span>';
            break;
          case 3:
            result = '<span style="color: #ffbc00">\u2605\u2605\u2605</span>';
            break;
          case 4:
            result = '<span style="color: red">\u2605\u2605\u2605\u2605</span>';
            break;
          case 5:
            result = '<span style="color: red">\u2605\u2605\u2605\u2605\u2605</span>';
            break;
          default:
            result = '<span style="color: black">\u2605</span>';
        }
        return result;
      }
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
    margin: 5px 10px 5px 5px;
    border-radius: 6px;
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

  .el-table {
    overflow: hidden;
    text-align: center;
    margin: auto;
    font-size: 12px;
  }
</style>
