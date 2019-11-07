Vue.component('trade-body-user-accounts', {
    template: '<div><a href="fxcm-register.html"  target="_blank">登录FXCM</a></div>'
})
Vue.component('trade-body-user-orders', {
    template: '<div>挂单</div>'
})
Vue.component('trade-body-user-openpositions', {
    template: '<div>开仓部位</div>'
})
Vue.component('trade-body-user-closedpositions', {
    template: '<div>已平仓部位</div>'
})
Vue.component('trade-body-user-summary', {
    template: '<div>账户总结</div>'
})
Vue.component('trade-body-user-message', {
    template: '<div>消息</div>'
})

Vue.component('market-data', {
    props: {
        symbol: String,
        sell: String,
        buy: Number,
        change: Number,
        high: Number,
        low: Number,
        rollS: Number,
        rollB: Number,
        divS: Number,
        divB: Number,
        pipCost: Number,
        mmr: Number,
        time: String
    },
    computed: {
        spread: function () {
            return (this.buy - this.sell).toFixed(3)
        }
    },
    template: '<tr>\
    <td>{{ symbol }}</td>\
    <td>{{ sell }}</td>\
    <td>{{ buy }}</td>\
    <td>{{ spread }}</td>\
    <td>{{ change }}</td>\
    <td>{{ high }}</td>\
    <td>{{ low }}</td>\
    <td>{{ rollS }}</td>\
    <td>{{ rollB }}</td>\
    <td>{{ divS }}</td>\
    <td>{{ divB }}</td>\
    <td>{{ pipCost }}</td>\
    <td>{{ mmr }}</td>\
    <td>{{ time }}</td>\
    </tr>'
})

var marketData = new Vue({
    el: '#trade-market-datas',
    data: {
        marketDatas:{
            "EUR/USD":{
                title:123,
                price:23
            }
        }

    }
})

var traderFooter = new Vue({
    el: '#trade-body-user',
    data: {
        currentTab: 'accounts',
        tabs: [{
            value: 'Accounts',
            text: '账户'
        },
            {
                value: 'Orders',
                text: '挂单'
            },
            {
                value: 'OpenPositions',
                text: '开仓部位'
            },
            {
                value: 'ClosedPositions',
                text: '已平仓部位'
            },
            {
                value: 'Summary',
                text: '账户总结'
            },
            {
                value: 'Message',
                text: '消息'
            },
        ]
    },
    computed: {
        currentTabComonent: function () {
            return 'trade-body-user-' + this.currentTab.toLowerCase();
        }
    }
})


var trade = new Vue({
    el: '#trade',
    data: {
        userToken: '',
        socket: '',
        isLoginFxcm:true,
        marketDatas:{}
    },
    created: function () {
        var user = window.localStorage.getItem('userToken');
        var parse = JSON.parse(user);
        this.userToken = parse;
        this.createConnect();
        window.localStorage.removeItem('userToken');
    },
    methods: {
        sendMessage: function () {
            var targetId = $("#target-id").val()
            var message = $("#message-content").val()
            var url = "/socket/push/" + targetId + "/" + message
            $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                success: function (result) {
                    console.log(result)
                }
            })
        },
        createConnect: function () {
            var socketId = this.userToken.userId;
            if (typeof (WebSocket) == "undefined") {
                console.log("您的浏览器不支持WebSocket");
            } else {
                console.log("您的浏览器支持WebSocket");
                //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
                //等同于socket = new WebSocket("ws://localhost:8083/checkcentersys/websocket/20");
                socket = new WebSocket("ws://localhost:8558/websocket/" + socketId);
                //打开事件
                socket.onopen = function () {
                    console.log("Socket " + socketId + "已打开");
                    //socket.send("这是来自客户端的消息" + location.href + new Date());
                };
                //获得消息事件
                socket.onmessage = function (msg) {
                    var message=msg.split(";");
                    if(message[0]==='marketdata'){
                        marketDataHandler(message);
                    }
                };
                //关闭事件
                socket.onclose = function () {
                    console.log("Socket已关闭");
                };
                //发生了错误事件
                socket.onerror = function () {
                    alert("Socket发生了错误");
                    //此时可以尝试刷新页面
                }

            }
        },
        marketDataHandler:function(message){
            console.log(message)
        }
    }
})


var tradeHeader = new Vue({
    el: '#trade-header',
    data: {
        messages: [{
            title: '俄罗斯爆炸了',
            time: '2019年12月21日',
            location: '俄罗斯',
            content: '莫斯科发生恐怖袭击事件，事件造成1000万人死亡。'
        }, {
            title: '美国爆炸了',
            time: '2019年12月20日',
            location: '美国',
            content: '华盛顿发生恐怖袭击事件，事件造成1000万人死亡。'
        }, {
            title: '美国爆炸了',
            time: '2019年12月20日',
            location: '美国',
            content: '华盛顿发生恐怖袭击事件，事件造成10100万人死亡。'
        }, {
            title: '美国爆炸了',
            time: '2019年12月20日',
            location: '美国',
            content: '华盛顿发生恐怖袭击事件，事件造成10020万人死亡。'
        }]
    }
})
