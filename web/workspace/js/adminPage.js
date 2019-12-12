$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    $('main-content').load('hello.html', function () {

    })

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
});


Vue.component('admin-body-all-users', {
    template: '<div class="container">所有用户{{text}}</div>',
    data:function () {
        return{
            text:'hello'
        }
    },
    mounted:function () {
        this.text=new Date().toLocaleString();
        console.log(this.text)
    }
})

Vue.component('admin-body-all-fxcm-accounts', {
    template: '<div class="container">所有福汇账户</div>'
})
Vue.component('admin-body-all-followers', {
    template: '<div class="container">所有跟单用户</div>'
})

Vue.component('admin-body-news-post', {
    template: '<div class="container">admin-body-news-post</div>'
})
Vue.component('admin-body-message-post', {
    template: '<div class="container">admin-body-message-post</div>'
})
Vue.component('admin-body-trader-info-post', {
    template: '<div class="container">admin-body-trader-info-post</div>'
})
Vue.component('admin-body-not-local', {
    template: '<div class="container">admin-body-not-local</div>'
})
Vue.component('admin-body-only-local', {
    template: '<div class="container">admin-body-only-local</div>'
})
Vue.component('admin-body-send-fxcm', {
    template: '<div class="container">admin-body-send-fxcm</div>'
})
Vue.component('admin-body-ready-fxcm', {
    template: '<div class="container">admin-body-ready-fxcm</div>'
})

var admin = new Vue({
    el: '#wrapper',
    data: {
        currentTabComponent: '',
        sideBarInfos: [
            {
                text: '用户信息管理',
                value: [
                    {
                        text: '所有注册用户',
                        value: 'admin-body-all-users'
                    },
                    {
                        text: '所有福汇账号',
                        value: 'admin-body-all-fxcm-accounts'
                    },
                    {
                        text: '跟单用户管理',
                        value: 'admin-body-all-followers'
                    }
                ]
            },
            {
                text: '信息发送管理',
                value: [
                    {
                        text: '新闻管理和发送',
                        value: 'admin-body-news-post'
                    },
                    {
                        text: '提示管理和发送',
                        value: 'admin-body-message-post'
                    },
                    {
                        text: '交易员信息发送',
                        value: 'admin-body-trader-info-post'
                    }
                ]
            },
            {
                text: '账号注册管理',
                value: [
                    {
                        text: '未提交本地',
                        value: 'admin-body-not-local'
                    },
                    {
                        text: '已提交本地',
                        value: 'admin-body-only-local'
                    },
                    {
                        text: '已提交福汇',
                        value: 'admin-body-send-fxcm'
                    },
                    {
                        text: '福汇已返回',
                        value: 'admin-body-ready-fxcm'
                    }
                ]
            }
        ]
    }
})