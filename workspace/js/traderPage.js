Vue.component('news-post', {
    props: ['newsItems'],
    template: '<table>\
                        <caption style="border: 1px solid silver;border-bottom: none;font-weight: 600;">最新金融新闻资讯</caption>\
                        <thead>\
                        <th>国家或地区</th>\
                        <th>新闻内容</th>\
                        <th>重要性</th>\
                        <th>时间</th>\
                    </thead>\
                    <tr v-for="newsItem in newsItems" >\
                        <td style="font-weight: 800;">{{newsItem.country}}</td>\
                        <td class="news-content" :class="importantNum(newsItem.important)">{{newsItem.content}}</td>\
                        <td :class="importantNum(newsItem.important)">{{getStars(newsItem.important)}}</td>\
                        <td>{{getDateTimeStr(newsItem.time)}}</td>\
                    </tr>\
                  </table>',
    computed: {

    },
    methods: {
        getStars: function(val) {
            var a = '';
            var count = parseInt(val);
            if (count > 5) {
                count = 5;
            }
            for (var i = 0; i < count; i++) {
                a += "\u2605";
            };
            for (var i = 0; i < 5 - count; i++) {
                a += "\u2606";
            }
            return a;
        },
        importantNum: function(val) {
            if (val >= 3) {
                return 'active'
            } else {
                return 'inActive'
            }
        },
        getDateTimeStr: function(val) {
            var time = parseInt(val);
            var year = new Date(time).getFullYear();
            var month = (new Date(time).getMonth() + 1) < 10 ? ('0' + (new Date(time).getMonth() + 1)) : (
                new Date(time).getMonth() + 1);
            var date = (new Date(time).getDate() + 1 < 10) ? ('0' + (new Date(time).getDate() + 1)) : (new Date(
                time).getDate());
            var timeStr = new Date(time).toTimeString().substring(0, 8);
            return year + '-' + month + '-' + date + '  ' + timeStr;
        }

    }
})


Vue.component('notice-post', {
    props: ['noticeItems'],
    template: '<table>\
                    <caption style="border: 1px solid silver;border-bottom: none;font-weight: 600;">近期交易提醒</caption>\
                    <thead>\
                        <th>商品组合</th>\
                        <th>交易策略</th>\
                        <th>时间</th>\
                    </thead>\
                    <tbody>\
                    <tr v-for="noticeItem in noticeItems" >\
                        <td style="font-weight: 800;">{{noticeItem.symbol}}</td>\
                        <td class="notice-content">{{noticeItem.content}}</td>\
                        <td>{{getDateTimeStr(noticeItem.time)}}</td>\
                    </tr>\
                    </tbody>\
                  </table>',
    computed: {

    },
    methods: {
        getDateTimeStr: function(val) {
            var time = parseInt(val);
            var year = new Date(time).getFullYear();
            var month = (new Date(time).getMonth() + 1) < 10 ? ('0' + (new Date(time).getMonth() + 1)) : (
                new Date(time).getMonth() + 1);
            var date = (new Date(time).getDate() + 1 < 10) ? ('0' + (new Date(time).getDate() + 1)) : (new Date(
                time).getDate());
            var timeStr = new Date(time).toTimeString().substring(0, 8);
            return year + '-' + month + '-' + date + '  ' + timeStr;
        }

    }
})

var trader = new Vue({
    el: '#trader-page-container',
    data: {
        newsTitle: '新闻发送窗口',
        newsCountry: '中国',
        newsContent: '国家统计局：中国7月锌产量同比增长17.4%至51.2万吨。',
        newsImportant: 3,
        newsTime:new Date().getTime(),
        newsPreview: false,
        displayNewsSendBox:true,
        
        noticeTitle:'交易提醒发送窗口',
        noticeSymbol:'USD',
        noticeContent:'hello',
        noticeTime:new Date().getTime(),
        noticePreview:false,
        
        news: [],
        notices: [{
                symbol: 'EUR/USD',
                content: '近期不宜买入',
                time: new Date().getTime() - 100
            },
            {
                symbol: 'USD/JPY',
                content: '涨价了 快买吧',
                time: new Date().getTime() - 10
            },
            {
                symbol: 'USD/HKD',
                content: '到底买不买啊',
                time: new Date().getTime() - 1010
            }
        ],
        countryDatas: ['阿布哈兹', '阿富汗', '阿尔巴尼亚', '阿尔及利亚', '美属萨摩亚（美国）', '安道尔', '安哥拉', '安圭拉', '安提瓜和巴布达', '阿根廷',
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
        currencyDatas:['EUR','JPY','CNY','BTC']
    },
    watch:{
        newsImportant:function(val){
            if(val<1){
                this.newsImportant=1;
            }else if(val>5){
                this.newsImportant=5;
            }
        }
    },
    methods: {
        previewNews: function() {
            this.newsTime=new Date().getTime();
            this.newsPreview = !this.newsPreview;
        },
        previewNotice:function(){
            this.noticeTime=new Date().getTime();
            this.noticePreview = !this.noticePreview;
        },
        sendNews:function(){
            this.newsPreview=false;
            if (this.newsCountry.trim() == '' || this.newsContent.trim() == '' || this.newsImportant ==
                '') {
                alert('数据不正确');
                return;
            }
            
            var country=this.newsCountry;
            var content=this.newsContent;
            var important=this.newsImportant;
            var newsTime=new Date().getTime();
            
            //发送新闻
            console.log(country+'  '+content+'  '+important+'   '+newsTime);

            sendNews(country,content,important,newsTime);

        },
        sendNotice:function(){
            this.noticePreview=false;
            if (this.noticeSymbol.trim() == '' || this.noticeContent.trim() == '') {
                alert('数据不正确');
                return;
            }
            
            var symbol=this.noticeSymbol;
            var content=this.noticeContent;
            var noticeTime=new Date().getTime();
            
            //发送新闻
            console.log(symbol+'  '+content+'  '+noticeTime);
            
            sendNotice(symbol,content,noticeTime);
        },
        getStars: function(val) {
            var a = '';
            var count = parseInt(val);
            if (count > 5) {
                count = 5;
            }
            for (var i = 0; i < count; i++) {
                a += "\u2605";
            };
            for (var i = 0; i < 5 - count; i++) {
                a += "\u2606";
            }
            return a;
        },
        importantNum: function(val) {
            if (val >= 3) {
                return 'active'
            } else {
                return 'inActive'
            }
        },
        getDateTimeStr: function(val) {
            var time = parseInt(val);
            var year = new Date(time).getFullYear();
            var month = (new Date(time).getMonth() + 1) < 10 ? ('0' + (new Date(time).getMonth() + 1)) : (
                new Date(time).getMonth() + 1);
            var date = (new Date(time).getDate() + 1 < 10) ? ('0' + (new Date(time).getDate() + 1)) : (new Date(
                time).getDate());
            var timeStr = new Date(time).toTimeString().substring(0, 8);
            return year + '-' + month + '-' + date + '  ' + timeStr;
        }
    },

    computed: {
        newsPreviewBtnStyle:function(){
          return !this.newsPreview?{
              backgroundColor:'lightskyblue'
          }:{
              backgroundColor:'greenyellow'
          };
        },
        noticePreviewBtnStyle:function(){
            return !this.noticePreview?{
                backgroundColor:'lightskyblue'
            }:{
                backgroundColor:'greenyellow'
            };
        }
        ,
        newsPreviewText: function() {
            return this.newsPreview ? "取消" : "预览";
        },
        noticePreviewText: function() {
            return this.noticePreview ? "取消" : "预览";
        },
        sortedNews: function() {
            return this.news.sort(function(a, b) {
                return b.time - a.time;
            })
        },
        sortedNotices: function() {
            return this.notices.sort(function(a, b) {
                return b.time - a.time;
            })
        }
    }
})


function sendNews(country,content,important,newsTime){
    console.log("发送新闻")
    var params={
        country:country,
        content:content,
        important:important,
        time:newsTime
    }
    var url="/NANC/pushNews";

    $.ajax({
        url: url,
        data: params,
        type: "post",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log(result.status==='200')
            if (result.status==='200'){
                //发送成功，重置数据
                trader.news.push({
                    country: country,
                    content: content,
                    important: important,
                    time: newsTime
                });

                trader.newsCountry='';
                trader.newsContent='';
                trader.newsImportant=3;
                trader.newsTitle=result.data;
                setTimeout(function(){
                    trader.newsTitle='新闻发送窗口';
                },2000);
            }else{
                trader.newsTitle=result.message;
            }
        }
    })
}

function sendNotice(symbol,content,noticeTime){
    console.log("发送新闻")
    var params={
        symbol:symbol,
        content:content,
        time:noticeTime
    }
    var url="/NANC/pushNotice";
    
    $.ajax({
        url: url,
        data: params,
        type: "post",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log(result.status==='200')
            if (result.status==='200'){
                //发送成功，重置数据
                trader.notices.push({
                    symbol: symbol,
                    content: content,
                    time: newsTime
                });
    
                trader.noticeSymbol='';
                trader.noticeContent='';
                trader.noticeTitle=result.data;
                setTimeout(function(){
                    trader.noticeTitle='交易提醒发送窗口';
                },2000);
            }else{
                trader.noticeTitle=result.message;
            }
        }
    })
}

$(function() {
    document.oncopy = function() {
        return false;
    }
    document.onselectstart = function() {
        return false;
    }
})
