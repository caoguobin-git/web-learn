var trade = new Vue({
    el: '#trade',
    data: {
        containerHeight: '500px',
        traderLogin: false,
        traderLogging: false,
        traderAccount: '701116547',
        traderPassword: '890128',
        currentTrader: '当前尚未登录交易员账号',
        traderTitle: '交易员信息',
        followerTitle: '跟单账号信息',
        followerAccounts: [{
            account: '701116547',
            name: 'zhang'
        }, {
            account: '701172924',
            name: 'zhan1111111g'
        }, {
            account: '705568458',
            name: 'zhang'
        }]
    },
    methods: {
        followerLogout: function (val) {
            console.log(val)
        },
        traderLoginOrLogout: function () {
            var url = '/trader';
            url += this.traderLogin ? '/logout' : '/login';
            var param={
                account:this.traderAccount,
                password:this.traderPassword
            }
            var type=this.traderLogin?'delete':'post'

            $.ajax({
                url:url,
                data:param,
                type:type,
                dataType:'json',
                success:function (result) {
                    console.log(result)
                }
            })
        }
    },
    computed: {
        traderButtonMsg: function () {
            return this.traderLogging ? '登录中...' : this.traderLogin ? '登出' : '登录'
        }
    }
})

window.onload = function (ev) {
    trade.containerHeight = window.innerHeight * 0.88 + 'px';
    window.onresize = function (ev1) {
        trade.containerHeight = window.innerHeight * 0.88 + 'px';
    }
}