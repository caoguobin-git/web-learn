<template>
  <a-row id="trader-news-container">
    <a-row class="trader-news-history-container">
      <div class="news-history-title-container">
        交易提醒<span style="font-weight: normal">-提醒管理</span>
      </div>
      <div class="news-history-time-selector">
        发布时间:
        <a-tag size="medium" style="cursor:default;" @click="changeNewsHistoryRange(1)" :color="currentTagEffact(1)">
          近7天
        </a-tag>
        <a-tag size="medium" style="cursor:default;" @click="changeNewsHistoryRange(2)" :color="currentTagEffact(2)">
          近30天
        </a-tag>
        <a-range-picker size="small" style="width: 21%" :locale="dateLocale" v-model="newsHistoryRange"
                        @change="changeNewsRange"/>

      </div>
      <div class="news-history-content-container">
        <a-row :gutter="2" class="news-history-content-container-title">
          <a-col span="3">
            <div class="news-title-tag">货币</div>
          </a-col>
          <a-col span="12">
            <div class="news-title-tag">提醒内容</div>
          </a-col>
          <a-col span="5">
            <div class="news-title-tag">时间</div>
          </a-col>
          <a-col span="4">
            <div class="news-title-tag">操作</div>
          </a-col>
        </a-row>
        <div class="news-history-content-container-row-container">
          <NoticeRow @editNotice="editNotice" @deleteNotice="deleteNotice" v-for="notice in noticeDataSort"
                     :key="notice.noticeId"
                     :notice="notice"></NoticeRow>
        </div>
      </div>
    </a-row>
    <div class="trader-news-send-container">
      <div class="news-history-title-container">
        交易提醒<span style="font-weight: normal">-提醒发布</span>
      </div>
      <div class="news-history-time-selector">
        选择货币:&nbsp;&nbsp;&nbsp;
        <a-select v-model="currentNotice.currency" showSearch style="width: 120px">
          <a-select-option v-for="currency in instruments"
                           :key="currency"
                           :value="currency">{{currency}}
          </a-select-option>
        </a-select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <a-textarea class="news-edit-area" v-model="currentNotice.content"></a-textarea>
      <div style="margin-top: 10px;width: 100%;padding-left:60%">
        <a-button @click="sendNotice" type="primary" size="small"
                  style="width: 100px;background: rgba(97, 162, 227, 1);">发布
        </a-button>
      </div>

    </div>
  </a-row>
</template>

<script>
  import NoticeRow from "./NoticeRow";

  export default {
    name: "Notice",
    components: {NoticeRow},
    data() {
      return {
        dateLocale: {
          "lang": {
            "placeholder": "Select date",
            "rangePlaceholder": ["开始日期", "结束日期"],
            "today": "Today",
            "now": "Now",
            "backToToday": "Back to today",
            "ok": "Ok",
            "clear": "Clear",
            "month": "Month",
            "year": "Year",
            "timeSelect": "Select time",
            "dateSelect": "Select date",
            "monthSelect": "Choose a month",
            "yearSelect": "Choose a year",
            "decadeSelect": "Choose a decade",
            "yearFormat": "YYYY",
            "dateFormat": "M/D/YYYY",
            "dayFormat": "D",
            "dateTimeFormat": "M/D/YYYY HH:mm:ss",
            "monthFormat": "MMMM",
            "monthBeforeYear": true,
            "previousMonth": "Previous month (PageUp)",
            "nextMonth": "Next month (PageDown)",
            "previousYear": "Last year (Control + left)",
            "nextYear": "Next year (Control + right)",
            "previousDecade": "Last decade",
            "nextDecade": "Next decade",
            "previousCentury": "Last century",
            "nextCentury": "Next century"
          },
          "timePickerLocale": {
            "placeholder": "Select time"
          },
          "dateFormat": "YYYY-MM-DD",
          "dateTimeFormat": "YYYY-MM-DD HH:mm:ss",
          "weekFormat": "YYYY-wo",
          "monthFormat": "YYYY-MM"
        },
        colors: ['rgba(255,188,0,0.43)', 'rgb(255,188,0)', 'rgb(222,78,78)'],
        currentNotice: {
          noticeId: '',
          currency: '',
          content: ''
        },
        instruments: ['BTC/USD', 'BCH/USD', 'ETH/USD', 'LTC/USD', 'XRP/USD', 'CryptoMajor', 'USEquities', 'AUD/USD', 'NZD/USD', 'EUR/JPY', 'NZD/JPY', 'AUD/NZD', 'EUR/NZD', 'CAD/CHF', 'NZD/CAD', 'HKG33', 'SPX500', 'XAG/USD', 'USOil', 'JPYBasket', 'EMBasket', 'NAS100', 'JPN225', 'GBP/CAD', 'USD/NOK', 'AUD/JPY', 'GBP/JPY', 'AUS200', 'USD/CHF', 'WHEATF', 'EUR/GBP', 'GER30', 'EUSTX50', 'NZD/CHF', 'USD/SEK', 'USD/JPY', 'GBP/CHF', 'CHF/JPY', 'US30', 'EUR/TRY', 'ZAR/JPY', 'USDOLLAR', 'USD/CNH', 'Bund', 'CAD/JPY', 'UK100', 'AUD/CAD', 'CORNF', 'TRY/JPY', 'AUD/CHF', 'Copper', 'EUR/SEK', 'ESP35', 'USD/CAD', 'GBP/USD', 'FRA40', 'EUR/USD', 'GBP/NZD', 'SOYF', 'USD/ZAR', 'US2000', 'GBP/AUD', 'NGAS', 'EUR/AUD', 'EUR/CHF', 'CHN50', 'USD/TRY', 'EUR/CAD', 'USD/HKD', 'XAU/USD', 'USD/MXN', 'UKOil', 'EUR/NOK'],
        radio1: '',
        newsHistoryRange: [],
        queryRange: [],
        currentTagIndex: 0,
        noticeData: []
      }
    },
    watch: {
      noticeHistoryRange() {
        // console.log(this.noticeHistoryRange)
        console.log('更新新闻消息')
      }
    },
    methods: {
      changeNewsRange(a, b) {
        this.currentTagIndex = 3;
        this.queryRange.splice(0, this.queryRange.length);
        this.queryRange.push(a[0]._d)
        this.queryRange.push(a[1]._d)
      },
      changeCurrentImportant(val) {
        this.currentNews.important = val;
      },
      getNotice() {
        var url = "/notice/all";
        this.sendAJAX(url, 'get', 'application/json', null);

      },
      deleteNotice(data) {
        let url = '/notice/' + data;
        this.sendAJAX(url, "delete", "application/json", null);
        for (var i in this.noticeData) {
          if (this.noticeData[i].noticeId == data) {
            this.noticeData.splice(i, 1)
            break;
          }
        }

      },
      sendNotice() {
        var a = this.currentNotice;
        if (a.currency == '' || a.content == '') {
          this.$message.error('提醒货币和内容不能为空');
          return;
        }

        if (a.noticeId != null && a.noticeId != '') {

          let x = JSON.stringify(a)
          this.sendAJAX("/notice/", "patch", "application/json", x);
          this.$message.success('交易提醒修改成功')

        } else {
          let x = JSON.stringify(a)
          this.sendAJAX("/notice/", "post", "application/json", x);
        }
        this.currentNotice = {
          noticeId: '',
          currency: '',
          content: ' '
        }
      },
      editNotice(data) {
        for (var i in this.noticeData) {
          if (this.noticeData[i].noticeId == data) {
            this.currentNotice = this.noticeData[i];
            break;
          }
        }
      },
      changeNewsHistoryRange(data) {
        this.currentTagIndex = data;
        if (data == 1) {
          this.setSelectedDate(7);
        } else if (data == 2) {
          this.setSelectedDate(30);
        } else if (data == 3) {

        }
      },
      setSelectedDate(days) {
        this.newsHistoryRange.splice(0, this.newsHistoryRange.length);
        this.queryRange.splice(0, this.queryRange.length)
        var today = new Date();
        var from = new Date();
        var sp = today.getTime() - days * 24 * 60 * 60 * 1000;
        from.setTime(sp);
        this.queryRange.push(from)
        this.queryRange.push(today)
      },
      currentTagEffact(index) {
        return this.currentTagIndex == index ? '#2db7f5' : '#cbcbcb'
      },
      sendAJAX(url, type, contentType, param) {
        var that = this;
        console.log(param)
        $.ajax({
          url: url,
          type: type,
          data: param,
          dataType: 'json',
          contentType: contentType,
          success: function (res) {
            console.log(res)
            if (type == 'post') {
              that.$message.success('交易提醒发送成功');
              console.log(res.data)
              that.noticeData.push(res.data)
            } else if (type == 'delete') {
              that.$message.success('交易提醒删除成功');
            } else if (type == 'get') {
              console.log(res);
              for (var i in res.data) {
                that.noticeData.push(res.data[i])
              }
            } else {
              console.log("新闻修改成功")
              that.$message.success('新闻修改成功');
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // /*弹出jqXHR对象的信息*/
            // alert(jqXHR.responseText);
            // alert(jqXHR.status);
            // alert(jqXHR.readyState);
            // alert(jqXHR.statusText);
            // /*弹出其他两个参数的信息*/
            // alert(textStatus);
            // alert(errorThrown);
          }
        })
      }
    },
    computed: {
      starColor() {
        console.log(this.currentNews.important)
        return this.currentNews.important < 3 ? 'rgba(255,188,0,0.43)' : (this.currentNews.important < 4 ? 'rgb(255,188,0)' : 'rgb(222,78,78)');
      },
      noticeDataSort() {
        var that = this;
        return this.noticeData.sort(function (a, b) {
          var dateA = new Date(a.modifiedTime);
          var dateB = new Date(b.modifiedTime);
          return dateB.getTime() - dateA.getTime();
        }).filter(function (news) {
          if (that.queryRange.length == 2) {
            let start = that.queryRange[0].getTime();
            let to = that.queryRange[1].getTime();
            console.log(start)
            console.log(to)
            let tim1 = new Date(news.modifiedTime).getTime();
            console.log((tim1 >= start && tim1 <= to))
            return (tim1 >= start && tim1 <= to);
          } else {
            return true
          }
        })
      }
    },
    mounted() {
      this.getNotice();
    }
  }
</script>

<style scoped>

  >>> .ant-rate-star {
    margin-right: 0;
  }

  .news-history-content-container-row-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  .news-history-content-container {
    margin-left: 67px;
    margin-top: 20px;
    border-top: 2px solid rgba(97, 162, 227, 1);
    width: 75%;
    height: 75%;
  }

  .news-history-content-container-title {
    height: 40px;
    width: 100%;
    font-family: "微软雅黑", sans-serif;
    background: rgba(245, 250, 255, 1);

  }

  #trader-news-container {
    height: 100%;
    width: 100%;
    background: transparent;
  }

  .trader-news-history-container {
    height: 60%;
  }

  .trader-news-send-container {
    height: 50%;
    width: 100%;
    background: white;
    margin-top: 5px;
  }

  .trader-news-history-container, .trader-news-send-container {
    background: white;
    padding-top: 20px;
    font-family: "微软雅黑", sans-serif;
    overflow: hidden;
    box-sizing: border-box;
  }


  .news-history-title-container {
    font-size: 16px;
    font-weight: bolder;
    color: rgba(92, 102, 126, 1);
    margin-left: 67px;
    padding-left: 6px;
    border-left: 3px solid rgba(112, 189, 199, 1);
  }

  .news-history-time-selector {
    padding-left: 10px;
    margin-left: 67px;
    margin-top: 20px;
  }

  .news-title-tag {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    line-height: 39px;
    font-family: "微软雅黑", sans-serif;
    color: rgba(93, 103, 127, 1)
  }


  >>> .ant-rate-star {
    margin-right: 0;
  }

  .news-edit-area {
    border-radius: 4px;
    display: block;
    margin-top: 10px;
    line-height: 1.5;
    font-size: 15px;
    font-family: "微软雅黑", sans-serif;
    /*padding: 5px;*/
    resize: none;
    width: 65%;
    height: 45%;
    margin-left: 4%;
    box-sizing: border-box;
  }


  .news-history-content-container-row-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  .news-history-content-container {
    margin-left: 67px;
    margin-top: 20px;
    border-top: 2px solid rgba(97, 162, 227, 1);
    width: 75%;
    height: 75%;
  }

  .news-history-content-container-title {
    height: 40px;
    width: 100%;
    font-family: "微软雅黑", sans-serif;
    background: rgba(245, 250, 255, 1);

  }

  #trader-news-container {
    height: 100%;
    width: 100%;
    background: transparent;
  }

  .trader-news-history-container {
    height: 60%;
  }

  .trader-news-send-container {
    height: 50%;
    width: 100%;
    background: white;
    margin-top: 5px;
  }

  .trader-news-history-container, .trader-news-send-container {
    background: white;
    padding-top: 20px;
    font-family: "微软雅黑", sans-serif;
    overflow: hidden;
    box-sizing: border-box;
  }


  .news-history-title-container {
    font-size: 16px;
    font-weight: bolder;
    color: rgba(92, 102, 126, 1);
    margin-left: 67px;
    padding-left: 6px;
    border-left: 3px solid rgba(112, 189, 199, 1);
  }

  .news-history-time-selector {
    padding-left: 10px;
    margin-left: 67px;
    margin-top: 20px;
  }


</style>

