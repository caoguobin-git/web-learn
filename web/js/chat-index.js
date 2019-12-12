window.onload = function () {
    $("#main-container").load('users-page.html');
    initDisplaySize();
}
window.onresize = function () {
    initDisplaySize();
}

function initDisplaySize() {

    document.getElementById("main-container").style.height = window.innerHeight + 'px';

    if (document.getElementById('users-list') != null) {
        document.getElementById('users-list').style.height = window.innerHeight + 'px';
        document.getElementById('users-page-title-container').style.height = window.innerHeight * 0.05 + 'px';
        document.getElementById('users-page-user-container').style.height = window.innerHeight * 0.945-5 + 'px';
    }

    if (document.getElementById('chat-container') != null) {
        document.getElementById('chat-container').style.height = window.innerHeight + 'px';
        document.getElementById('chat-page-title-container').style.height = window.innerHeight * 0.05 + 'px';
        document.getElementById('chat-page-message-container').style.height = window.innerHeight * 0.855 + 'px';
        document.getElementById('chat-page-message-send-container').style.height = window.innerHeight * 0.09 + 'px';
    }
}

var message = new Vue({
    el: '#main-container',
    data: {
        me:{username:'2',icon:'../img/fox.png'},
        messageSend: {
            '1': [{
                from: '2',
                to: '1',
                content: '你吃饭了吗你吃饭了吗你吃饭了吗你吃饭了吗你吃饭了吗你吃饭了吗你吃饭了吗你吃饭了吗39',
                time: 213468839
            }, {
                from: '2',
                to: '1',
                content: '吃的什么',
                time: 213468841
            }],
            '4': [{from: '2', to: '4', content: '你吃饭了吗2', time: 213468841}],
            '3': [{from: '2', to: '3', content: '你吃饭了吗3', time: 213468841}],
        },
        messageReceived: {
            '1': [{
                from: '1',
                to: '2',
                content: '吃过了吃过了吃过了吃过了吃过了吃过了吃过了吃过了吃过了吃过了吃过了吃过了吃过了',
                time: 213468840
            }, {
                from: '1',
                to: '2',
                content: '不知道啊',
                time: 213468842
            }],
            '3': [{from: '3', to: '2', content: '你吃饭了吗3111', time: 213468841}],
            '4': [{from: '4', to: '2', content: '你吃饭了吗,我是4号', time: 213468841}],
            '5': [{from: '5', to: '2', content: '你吃饭了吗，我是五号', time: 213468841}],
        },
        users: [{
            username: '1',
            userIcon: '../img/icon.jpg'
        }, {
            username: '2',
            userIcon: '../img/icon.jpg'
        }, {
            username: '3',
            userIcon: '../img/fox.png'
        }, {
            username: '4',
            userIcon: '../img/bike.jpg'
        }, {
            username: '5',
            userIcon: '../img/fox.png'
        }, {
            username: '6',
            userIcon: '../img/fox.png'
        }, {
            username: '7',
            userIcon: '../img/fox.png'
        }, {
            username: '8',
            userIcon: '../img/fox.png'
        }]
    },
    methods: {},
    computed: {}
})