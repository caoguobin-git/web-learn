Vue.component("user-head", {
    props: ['users'],
    template: '<div id="usersList" class="col-sm-12 col-lg-6 col-lg-offset-3"><div class="row" v-for="item in users">{{item.username}}<div>111</div></div></div>'
})

var users = new Vue({
    el: '#users-list',
    data: {
        userPageSearchText: '',
        // users: {
        //     '1': {
        //         username: '1',
        //         icon: '../img/fox.png',
        //         messages: [ {
        //             time: 125484643,
        //             content: '你是谁aaaa啊？123'
        //         }]
        //     }, '2': {
        //         username: '2',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '3': {
        //         username: '3',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '4': {
        //         username: '4',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '5': {
        //         username: '5',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '6': {
        //         username: '6',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '7': {
        //         username: '7',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '8': {
        //         username: '8',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '9': {
        //         username: '9',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '10': {
        //         username: '10',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '11': {
        //         username: '11',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '12': {
        //         username: '12',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '13': {
        //         username: '13',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '14': {
        //         username: '14',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '15': {
        //         username: '15',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '16': {
        //         username: '16',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁啊？456'
        //         }]
        //     }, '17': {
        //         username: '17',
        //         icon: '../img/fox.png',
        //         messages: [{
        //             time: 225484643,
        //             content: '你是谁haha啊？456'
        //         }]
        //     }
        // }
    },
    computed: {
        //获取展示结果 根据搜索条件过滤
        displayUsers: function () {
            if (this.userPageSearchText == null || this.userPageSearchText.trim() == '') {
                return message.users;
            } else {
                let userList = [];
                for (let i in message.users) {
                    let flag = false;
                    if (message.users[i].username.indexOf(users.userPageSearchText) != -1) {
                        flag=true;
                    }
                    if (flag){
                        userList.push(message.users[i]);
                    }
                }
                return userList;
            }
        }
    },
    methods: {
        getLatestMessage: function (val) {
            if (message.messageReceived[val]!=null){
                if (message.messageReceived[val].length>0){
                    return message.messageReceived[val][message.messageReceived[val].length-1].content;
                }
            }

        },
        searchUsers: function () {
        },
        startChat: function (val) {
            localStorage.setItem("targetUser", JSON.stringify(val));
            $("#main-container").load('chat-page.html');
        }
    },
    mounted: function () {
        initDisplaySize();
    }
})