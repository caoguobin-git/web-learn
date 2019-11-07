var chat = new Vue({
    el: '#chat-container',
    data: {
        containerHeight: 200,
        messageToSend: '',
        myIcon: '../img/myIcon.jpg',
        onlineUsers: {
            '123123': {
                userNick: '张三',
                userIcon: '../img/myIcon.jpg',
                userMessages:[
                    {content:'现在几点了？',time:123456798664}
                ],

            },
            '456456': {
                userNick: '李四',
                userIcon: '../img/myIcon.jpg',
                userMessages:[
                    {content:'你吃饭了吗？',time:123456798664}
                ],    

            },
            '789789': {
                userNick: '王五',
                userIcon: '../img/myIcon.jpg',
                userMessages:[
                    {content:'你什么时候回来啊？',time:123456798664},
                    {content:'你什么时候回啊？',time:123456798664}
                ],
  
            }
        },
        currentTargetUserId:'123123'
    },
    methods: {
        changeCurrentTargetUser:function(e){
            var id=e.currentTarget.children[0].innerHTML;
            this.currentTargetUserId=id;

        },
        sendMessage: function() {
            setTimeout(function() {
                chat.messageToSend = ''
            }, 1)
            // this.messageToSend='';
        }
    },
    computed: {
        containerStyle: function() {
            return {
                height: this.containerHeight + 'px',
                'margin-top': '100px'
            }
        },
        chatBoxStyle: function() {
            return {
                height: this.containerHeight + 'px'
            }
        },
        bannerLeftStyle: function() {
            return {
                height: this.containerHeight + 'px'
            }
        },
        contactBoxStyle: function() {
            return {
                height: this.containerHeight + 'px'
            }
        },
        contentBoxStyle: function() {
            return {
                height: this.containerHeight + 'px'
            }
        },
        contentContactTitleStyle: function() {
            return {
                height: this.containerHeight * 0.08 + 'px'
            }
        },
        contentMessageReceivedBoxStyle: function() {
            return {
                height: this.containerHeight * 0.57 + 'px'
            }
        },
        contentFunctionBoxStyle: function() {
            return {
                height: this.containerHeight * 0.05 + 'px'
            }
        },
        contentMessageSendBoxStyle: function() {
            return {
                height: this.containerHeight * 0.24 + 'px'
            }
        },
        contentMessageSendBtnBoxStyle: function() {
            return {
                height: this.containerHeight * 0.05 + 'px'
            }
        },


    },
    mounted() {
        //设置窗口高度
        this.containerHeight = document.getElementById('chat-container').clientWidth * 0.6

        window.onkeydown = function(e) {
            if (e.keyCode == 13) {
                chat.sendMessage()
            }
        }
    }
})
