<template>
  <div id="trader-notice-container">
    <div class="trader-notice-history-container" :style="{height:noticeHistoryHeight+'%'}">
      <div class="notice-history-title-container">
        交易提醒<span style="font-weight: normal">-提醒管理</span>
      </div>
      <div class="notice-history-time-selector">
        发布时间:
        <el-tag size="medium" style="cursor:default;" @click="changeNoticeHistoryRange(1)" :effect="currentTagEffact(1)">
          近7天
        </el-tag>
        <el-tag size="medium" style="cursor:default;" @click="changeNoticeHistoryRange(2)" :effect="currentTagEffact(2)">
          近30天
        </el-tag>

        <el-date-picker
          @change="changeNoticeHistoryRange(3)"
          v-model="noticeHistoryRange"
          type="daterange"
          value-format="yyyy;M;d"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="notice-history-content-container">
        <div class="notice-history-content-container-title">
          <div class="notice-title-tag" style="width: 10%">地区</div>
          <div class="notice-title-tag" style="width: 12%">重要性</div>
          <div class="notice-title-tag" style="width: 50%">提醒内容</div>
          <div class="notice-title-tag" style="width: 14%">时间</div>
          <div class="notice-title-tag" style="width: 11%">操作</div>
        </div>
        <div class="notice-history-content-container-row-container">
          <NoticeRow @editNotice="editNotice" @deleteNotice="deleteNotice" v-for="notice in noticeData" :key="notice.noticeId" :notice="notice"></NoticeRow>
        </div>
      </div>
    </div>
    <div class="trader-notice-send-container" :style="{height:99-noticeHistoryHeight+'%'}">
      <div class="notice-history-title-container">
        交易提醒<span style="font-weight: normal">-提醒发布</span>
      </div>
      <div class="notice-history-time-selector">
        选择货币:&nbsp;&nbsp;&nbsp;
        <el-select style="width: 200px" filterable size="mini" v-model="currentNotice.instrument" placeholder="请选择">
          <el-option
            v-for="item in instruments"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        重要性:
        <el-rate style="display: inline"
                 v-model='currentNotice.important'
                 disabled-void-color="silver"
                 :colors="colors">
        </el-rate>

        <textarea cols="130" rows="8" class="notice-edit-area" v-model="currentNotice.content"></textarea>
        <div style="margin-top: 8px;text-align: right;width: 66%">
          <el-button @click="sendNewNotice" type="primary" size="mini"
                     style="width: 100px;background: rgba(97, 162, 227, 1)">发布
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NoticeRow from "./NoticeRow";

  export default {
    name: "Notice",
    components: {NoticeRow},
    data() {
      return {

        colors: ['rgba(255,188,0,0.43)', 'rgb(255,188,0)', 'rgb(222,78,78)'],
        currentNotice: {
          noticeId: '',
          instrument: '',
          important: 3,
          content: ''
        },
        instruments: ['BTC/USD','BCH/USD','ETH/USD','LTC/USD','XRP/USD','CryptoMajor','USEquities','AUD/USD','NZD/USD','EUR/JPY','NZD/JPY','AUD/NZD','EUR/NZD','CAD/CHF','NZD/CAD','HKG33','SPX500','XAG/USD','USOil','JPYBasket','EMBasket','NAS100','JPN225','GBP/CAD','USD/NOK','AUD/JPY','GBP/JPY','AUS200','USD/CHF','WHEATF','EUR/GBP','GER30','EUSTX50','NZD/CHF','USD/SEK','USD/JPY','GBP/CHF','CHF/JPY','US30','EUR/TRY','ZAR/JPY','USDOLLAR','USD/CNH','Bund','CAD/JPY','UK100','AUD/CAD','CORNF','TRY/JPY','AUD/CHF','Copper','EUR/SEK','ESP35','USD/CAD','GBP/USD','FRA40','EUR/USD','GBP/NZD','SOYF','USD/ZAR','US2000','GBP/AUD','NGAS','EUR/AUD','EUR/CHF','CHN50','USD/TRY','EUR/CAD','USD/HKD','XAU/USD','USD/MXN','UKOil','EUR/NOK'],
        noticeHistoryHeight: 65,
        radio1: '',
        noticeHistoryRange: [],
        currentTagIndex: 0,
        noticeData: [
          {
            noticeId: '123123',
            instrument: 'USA',
            important: 1,
            content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀',
            time: 1584585555524
          },
          {noticeId: '123223', instrument: 'CHINA', important: 2, content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀', time: 15845824},
          {noticeId: '123323', instrument: 'JAPAN', important: 3, content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀', time: 15845824},
          {noticeId: '123423', instrument: 'USA', important: 5, content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀', time: 15845824},
          {
            noticeId: '123523',
            instrument: 'USA',
            important: 3,
            content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀',
            time: 15845824
          },
          {noticeId: '123623', instrument: 'AUS', important: 5, content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀', time: 15845824},
          {noticeId: '123723', instrument: 'TIANJIN', important: 4, content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀', time: 15845824},
          {noticeId: '123823', instrument: 'USA', important: 5, content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀', time: 15845824},
          {noticeId: '123923', instrument: 'USA', important: 2, content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀', time: 15845824},
          {noticeId: '1231023', instrument: 'USA', important: 5, content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀', time: 15845824},
          {noticeId: '1231121', instrument: 'USA', important: 3, content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀', time: 15845824},
          {noticeId: '1231122', instrument: 'USA', important: 3, content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀', time: 15845824},
          {noticeId: '12311233', instrument: 'USA', important: 3, content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀', time: 15845824},
          {noticeId: '12311234', instrument: 'USA', important: 3, content: '啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀啊手动阀手动阀', time: 15845824},
        ]
      }
    },
    watch: {
      noticeHistoryRange() {
        // console.log(this.noticeHistoryRange)
        console.log('更新新闻消息')
      }
    },
    methods: {
      deleteNotice(data){
        for (var i in this.noticeData) {
          if (this.noticeData[i].noticeId == data) {
            this.noticeData.splice(i,1)
            break;
          }
        }
      },
      sendNewNotice() {
        var a = this.currentNotice;
        a.time = new Date().getTime();
        console.log(a)
        if (a.noticeId != null && a.noticeId != '') {
          alert('更改新闻')
        } else {
          alert('发送新新闻')
          this.noticeData.push(a)
        }
        this.currentNotice = {
          noticeId: '',
          instrument: '',
          important: 3,
          content: ' '
        }
      },
      editNotice(data) {
        console.log(data)
        for (var i in this.noticeData) {
          if (this.noticeData[i].noticeId == data) {
            this.currentNotice = this.noticeData[i];
            break;
          }
        }
      },
      changeNoticeHistoryRange(data) {
        this.currentTagIndex = data;
        if (data == 1) {
          this.setSelectedDate(7);
        } else if (data == 2) {
          this.setSelectedDate(30);
        }
      },
      setSelectedDate(days) {
        this.noticeHistoryRange.splice(0, this.noticeHistoryRange.length);
        let today = new Date();
        let before = new Date();
        before.setTime(today.getTime() - 1000 * 60 * 60 * 24 * days);
        let beforeStr = '';
        beforeStr += before.getFullYear();
        beforeStr += ';';
        beforeStr += (before.getMonth() + 1);
        beforeStr += ';';
        beforeStr += before.getDate();

        let todayStr = '';
        todayStr += today.getFullYear();
        todayStr += ';';
        todayStr += (today.getMonth() + 1);
        todayStr += ';';
        todayStr += today.getDate();

        this.noticeHistoryRange.push(beforeStr)
        this.noticeHistoryRange.push(todayStr)
      },
      currentTagEffact(index) {
        return this.currentTagIndex == index ? 'dark' : 'light'
      }
    },
    computed: {}
  }
</script>

<style scoped>

  .notice-edit-area {
    border-radius: 6px;
    display: block;
    margin-top: 10px;
    outline: silver;
    line-height: 1.5;
    font-size: 15px;
    font-family: "微软雅黑", sans-serif;
    padding: 5px;
    resize: none;
    box-sizing: border-box;
  }


  >>> .el-rate__icon.el-icon-star-on, >>> .el-rate__icon.el-icon-star-off {
    margin-right: 0px;
  }

  .notice-history-content-container-row-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  .notice-history-content-container {
    margin-left: 67px;
    margin-top: 20px;
    border-top: 2px solid rgba(97, 162, 227, 1);
    width: 75%;
    height: 75%;
  }

  .notice-history-content-container-title {
    height: 40px;
    width: 100%;
    font-family: "微软雅黑", sans-serif;
    background: rgba(245, 250, 255, 1);

  }

  #trader-notice-container {
    height: 100%;
    background: transparent;
  }

  .trader-notice-history-container, .trader-notice-send-container {
    background: white;
    padding-top: 20px;
    font-family: "微软雅黑", sans-serif;
    overflow: hidden;
    box-sizing: border-box;
  }

  .trader-notice-send-container {
    background: white;
    margin-top: 5px;
  }

  .notice-history-title-container {
    font-size: 16px;
    font-weight: bolder;
    color: rgba(92, 102, 126, 1);
    margin-left: 67px;
    padding-left: 6px;
    border-left: 3px solid rgba(112, 189, 199, 1);
  }

  .notice-history-time-selector {
    padding-left: 10px;
    margin-left: 67px;
    margin-top: 20px;
  }

  .notice-title-tag {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    display: inline-block;
    line-height: 39px;
    font-family: "微软雅黑", sans-serif;
    color: rgba(93, 103, 127, 1)
  }

</style>

