<template>
  <div id="trader-news-container">
    <div class="trader-news-history-container" :style="{height:newsHistoryHeight+'%'}">
      <div class="news-history-title-container">
        新闻资讯<span style="font-weight: normal">-资讯管理</span>
      </div>
      <div class="news-history-time-selector">
        发布时间:
        <el-tag size="medium" style="cursor:default;" @click="changeNewsHistoryRange(1)" :effect="currentTagEffact(1)">
          近7天
        </el-tag>
        <el-tag size="medium" style="cursor:default;" @click="changeNewsHistoryRange(2)" :effect="currentTagEffact(2)">
          近30天
        </el-tag>

        <el-date-picker
          @change="changeNewsHistoryRange(3)"
          v-model="newsHistoryRange"
          type="daterange"
          value-format="yyyy;M;d"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="news-history-content-container">
        <div class="news-history-content-container-title">
          <div class="news-title-tag" style="width: 10%">地区</div>
          <div class="news-title-tag" style="width: 12%">重要性</div>
          <div class="news-title-tag" style="width: 50%">资讯内容</div>
          <div class="news-title-tag" style="width: 14%">时间</div>
          <div class="news-title-tag" style="width: 11%">操作</div>
        </div>
        <div class="news-history-content-container-row-container">
          <NewsRow @editNews="editNews" @deleteNews="deleteNews" v-for="news in newsDataSort" :key="news.newsId"
                   :news="news"></NewsRow>
        </div>
      </div>
    </div>
    <div class="trader-news-send-container" :style="{height:99-newsHistoryHeight+'%'}">
      <div class="news-history-title-container">
        新闻资讯<span style="font-weight: normal">-资讯发布</span>
      </div>
      <div class="news-history-time-selector">
        选择地区:&nbsp;&nbsp;&nbsp;
        <el-select style="width: 200px" filterable size="mini" v-model="currentNews.country" placeholder="请选择">
          <el-option
            v-for="item in countries"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        重要性:
        <el-rate style="display: inline"
                 v-model='currentNews.important'
                 disabled-void-color="silver"
                 :colors="colors">
        </el-rate>

        <textarea cols="130" rows="8" class="news-edit-area" v-model="currentNews.content"></textarea>
        <div style="margin-top: 8px;text-align: right;width: 66%">
          <el-button @click="sendNewNews" type="primary" size="mini"
                     style="width: 100px;background: rgba(97, 162, 227, 1)">发布
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NewsRow from "./NewsRow";

  export default {
    name: "News",
    components: {NewsRow},
    data() {
      return {

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
        newsHistoryHeight: 65,
        radio1: '',
        newsHistoryRange: [],
        currentTagIndex: 0,
        newsData: []
      }
    },
    watch: {
      newsHistoryRange() {
        // console.log(this.newsHistoryRange)
        console.log('更新新闻消息')
      }
    },
    methods: {
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
        a.time = new Date().getTime();
        if (a.country == '' || a.content == '') {
          this.$message({
            message: '新闻国家和内容不能为空',
            type: 'error'
          });
          return;
        }
        console.log(a)
        if (a.newsId != null && a.newsId != '') {
          let x = JSON.stringify(a)
          this.sendAJAX("/news/", "patch", "application/json", x);
          this.$message({
            message:'新闻修改成功',
              type:'success'
          })

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
        }
      },
      setSelectedDate(days) {
        this.newsHistoryRange.splice(0, this.newsHistoryRange.length);
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

        this.newsHistoryRange.push(beforeStr)
        this.newsHistoryRange.push(todayStr)
      },
      currentTagEffact(index) {
        return this.currentTagIndex == index ? 'dark' : 'light'
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
              that.$message({
                message: '新闻发送成功',
                type: 'success'
              });
              that.newsData.push(res.data)
            } else if (type == 'delete') {
              that.$message({
                message: '新闻删除成功',
                type: 'success'
              });
            } else if (type == 'get') {
              console.log(res);
              for (var i in res.data) {
                that.newsData.push(res.data[i])
              }
            } else {
              console.log("新闻修改成功")
              that.$message({
                message: '新闻修改成功',
                type: 'success'
              });
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
      newsDataSort() {
        return this.newsData.sort(function (a, b) {
          var dateA = new Date(a.modifiedTime);

          var dateB = new Date(b.modifiedTime);
          return dateB.getTime() - dateA.getTime();
        })
      }
    },
    mounted() {
      this.getNews();
    }
  }

</script>

<style scoped>

  .news-edit-area {
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
    background: transparent;
  }

  .trader-news-history-container, .trader-news-send-container {
    background: white;
    padding-top: 20px;
    font-family: "微软雅黑", sans-serif;
    overflow: hidden;
    box-sizing: border-box;
  }

  .trader-news-send-container {
    background: white;
    margin-top: 5px;
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
