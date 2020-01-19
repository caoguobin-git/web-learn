<template>
  <a-row id="trader-news-container">
    <a-row class="trader-news-history-container">
      <div class="news-history-title-container">
        新闻资讯<span style="font-weight: normal">-资讯管理</span>
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
        <a-row class="news-history-content-container-title">
          <a-col class="news-title-tag" span="3">地区</a-col>
          <a-col class="news-title-tag" span="3">重要性</a-col>
          <a-col class="news-title-tag" span="9">资讯内容</a-col>
          <a-col class="news-title-tag" span="5">时间</a-col>
          <a-col class="news-title-tag" span="4">操作</a-col>
        </a-row>
        <div class="news-history-content-container-row-container">
          <NewsRow @editNews="editNews" @deleteNews="deleteNews" v-for="news in newsDataSort" :key="news.newsId"
                   :news="news"></NewsRow>
        </div>
      </div>
    </a-row>
    <div class="trader-news-send-container">
      <div class="news-history-title-container">
        新闻资讯<span style="font-weight: normal">-资讯发布</span>
      </div>
      <div class="news-history-time-selector">
        选择地区:&nbsp;&nbsp;&nbsp;
        <a-select v-model="currentNews.country" showSearch style="width: 120px">
          <a-select-option v-for="country in countries"
                           :key="country"
                           :value="country">{{country}}
          </a-select-option>
        </a-select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        重要性:
        <a-rate :style="{color:starColor}" v-model="currentNews.important"/>
      </div>
      <a-textarea class="news-edit-area" v-model="currentNews.content"></a-textarea>
      <div style="margin-top: 10px;width: 100%;padding-left:60%">
        <a-button @click="sendNewNews" type="primary" size="small"
                  style="width: 100px;background: rgba(97, 162, 227, 1);">发布
        </a-button>
      </div>

    </div>
  </a-row>
</template>

<script>
  import NewsRow from "./NewsRow";

  export default {
    name: "News",
    components: {NewsRow},
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
        currentNews: {
          newsId: '',
          country: '',
          important: 3,
          content: ''
        },
        countries: ['阿布哈兹', '阿富汗', '阿尔巴尼亚', '阿尔及利亚', '美属萨摩亚（美国）', '安道尔', '安哥拉', '安圭拉', '安提瓜和巴布达', '阿根廷',
          '亚美尼亚', '阿鲁巴（荷兰）', '澳大利亚', '奥地利', '阿塞拜疆', '巴哈马', '巴林', '孟加拉国', '巴巴多斯', '白俄罗斯', '比利时', '伯利兹',
          '贝宁', '百慕大（英国）', '不丹', '玻利维亚', '波黑', '博茨瓦纳', '巴西', '英属印度洋领地（英国）', '文莱', '保加利亚', '布基纳法索', '布隆迪',
          '柬埔寨', '喀麦隆', '加拿大', '佛得角', '开曼群岛（英国）', '中非共和国', '乍得', '智利', '中国', '圣诞岛（澳大利亚）',
          '科科斯(基林)群岛（澳大利亚）', '哥伦比亚', '科摩罗', '刚果共和国', '刚果民主共和国', '库克群岛（新西兰）', '哥斯达黎加', '科特迪瓦', '克罗地亚',
          '古巴', '库拉索(荷兰)', '塞浦路斯', '捷克', '丹麦', '吉布提', '多米尼克', '多米尼加', '厄瓜多尔', '埃及', '萨尔瓦多', '赤道几内亚',
          '厄立特里亚', '爱沙尼亚', '埃塞俄比亚', '福克兰群岛（英国、阿根廷争议）', '法罗群岛（丹麦）', '斐济', '芬兰', '法国', '法属波利尼西亚（法国）', '加蓬',
          '冈比亚', '格鲁吉亚', '德国', '加纳', '直布罗陀（英国）', '希腊', '格陵兰（丹麦）', '格林纳达', '关岛（美国）', '危地马拉', '根西岛（英国）',
          '几内亚', '几内亚比绍', '圭亚那', '海地', '洪都拉斯', '中国香港', '匈牙利', '冰岛', '印度', '印尼', '伊朗', '伊拉克', '爱尔兰', '以色列',
          '意大利', '牙买加', '日本', '泽西岛（英国）', '约旦', '肯尼亚', '基里巴斯', '韩国', '科索沃', '科威特', '吉尔吉斯斯坦', '老挝', '拉脱维亚',
          '黎巴嫩', '莱索托', '利比里亚', '利比亚', '列支敦士登', '立陶宛', '卢森堡', '中国澳门', '马其顿', '马达加斯加', '马拉维', '马来西亚',
          '马尔代夫', '马里', '马耳他', '马恩岛（英国）', '马绍尔群岛', '毛里塔尼亚', '毛里求斯', '马约特（法国）', '墨西哥', '密克罗尼西亚联邦', '摩尔多瓦',
          '摩纳哥', '蒙古国', '黑山', '蒙特塞拉特岛（英国）', '摩洛哥', '莫桑比克', '缅甸', '纳戈尔诺-卡拉巴赫', '纳米比亚', '瑙鲁', '尼泊尔', '荷兰',
          '新喀里多尼亚（法国）', '新西兰', '尼加拉瓜', '尼日尔', '尼日利亚', '纽埃（新西兰）', '诺福克岛（澳大利亚）', '北塞浦路斯', '北马里亚纳群岛（美国）',
          '挪威', '阿曼', '巴基斯坦', '帕劳', '巴勒斯坦', '巴拿马', '巴布亚新几内亚', '巴拉圭', '朝鲜', '秘鲁', '菲律宾', '皮特凯恩群岛（英国）',
          '波兰', '葡萄牙', '德涅斯特河左岸', '波多黎各（美国）', '卡塔尔', '留尼汪（法国）', '罗马尼亚', '俄罗斯', '卢旺达', '圣赫勒拿岛（英国）',
          '圣基茨和尼维斯', '圣卢西亚', '圣皮埃尔和密克隆群岛（法国）', '圣文森特和格林纳丁斯', '萨摩亚', '圣马利诺', '圣多美和普林西比', '沙特阿拉伯', '塞内加尔',
          '塞尔维亚', '塞舌尔', '塞拉利昂', '新加坡', '荷属圣马丁（荷兰）', '斯洛伐克', '斯洛文尼亚', '所罗门群岛', '索马里', '索马里兰', '南非',
          '南奥塞梯', '南苏丹', '西班牙', '斯里兰卡', '苏丹', '苏里南', '斯瓦尔巴群岛（挪威）', '斯威士兰', '瑞典', '瑞士', '叙利亚', '中国台湾',
          '塔吉克斯坦', '坦桑尼亚', '泰国', '东帝汶', '多哥', '托克劳（新西兰）', '汤加', '特立尼达和多巴哥', '突尼斯', '土耳其', '土库曼斯坦',
          '特克斯和凯科斯群岛（英国）', '图瓦卢', '乌干达', '乌克兰', '阿联酋', '英国', '美国', '乌拉圭', '乌兹别克斯坦', '瓦努阿图', '梵蒂冈', '委内瑞拉',
          '越南', '英属维尔京群岛（英国）', '美属维尔京群岛（美国）', '瓦利斯和富图纳群岛（法国）', '西撒哈拉', '也门', '赞比亚', '津巴布韦'
        ],
        radio1: '',
        newsHistoryRange: [],
        queryRange: [],
        currentTagIndex: 0,
        newsData: [{
          'newsId': "402880ea6fb72a4b016fb72b13930002",
          'country': "阿尔巴尼亚",
          'userId': 'null',
          'content': "1123",
          'important': 3,
          'createTime': "2020-01-18 13:40:51",
          'modifiedTime': "2020-01-18 13:40:51",
        }]
      }
    },
    watch: {
      queryRange(val) {
        console.log(val)
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
      getNews() {
        var url = "/news/all";
        this.sendAJAX(url, 'get', 'application/json', null);

      },
      deleteNews(data) {
        let url = '/news/' + data;
        this.sendAJAX(url, "delete", "application/json", null);
        for (var i in this.newsData) {
          if (this.newsData[i].newsId == data) {
            this.newsData.splice(i, 1)
            break;
          }
        }

      },
      sendNewNews() {
        var a = this.currentNews;
        if (a.country == '' || a.content == '') {
          this.$message.error('新闻国家和内容不能为空');
          return;
        }
        console.log(a)

        if (a.newsId != null && a.newsId != '') {

          let x = JSON.stringify(a)
          this.sendAJAX("/news/", "patch", "application/json", x);
          this.$message.success('新闻修改成功')

        } else {
          let x = JSON.stringify(a)
          this.sendAJAX("/news/", "post", "application/json", x);
        }
        this.currentNews = {
          newsId: '',
          country: '',
          important: 3,
          content: ' '
        }
      },
      editNews(data) {
        console.log(data)
        for (var i in this.newsData) {
          if (this.newsData[i].newsId == data) {
            this.currentNews = this.newsData[i];
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
        $.ajax({
          url: url,
          type: type,
          data: param,
          dataType: 'json',
          contentType: contentType,
          success: function (res) {
            console.log(res)
            if (type == 'post') {
              that.$message.success('新闻发送成功');
              console.log(res.data)
              that.newsData.push(res.data)
            } else if (type == 'delete') {
              that.$message.success('新闻删除成功');
            } else if (type == 'get') {
              console.log(res);
              for (var i in res.data) {
                that.newsData.push(res.data[i])
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
      newsDataSort() {
        var that = this;
        return this.newsData.sort(function (a, b) {
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
      this.getNews();
    }
  }

</script>

<style scoped>

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

  .news-title-tag {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    display: inline-block;
    line-height: 39px;
    font-family: "微软雅黑", sans-serif;
    color: rgba(93, 103, 127, 1)
  }

</style>
