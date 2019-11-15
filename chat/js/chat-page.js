var chat = new Vue({
    el: '#chat-container',
    data: {
        targetUser: {}
    },
    methods: {
        getUserIcon: function (val) {
            return message.users[val.to].userIcon;
        },
        showIcon: function (val) {
            return val.from == message.me.username;
        },
        initTargetUser: function () {
            let user = localStorage.getItem('targetUser');
            var userEntity = JSON.parse(user);
            this.targetUser = userEntity;
        },
        backToUserPage: function () {
            $("#main-container").load('users-page.html');
        },
        messageType: function (val) {
            // return val.from == this.user ? 'animated bounceInRight message-send' : 'animated bounceInLeft message-received'

            return val == this.targetUser.username ? 'animated bounceInLeft message-received' : 'animated bounceInRight message-send'
        }
    },
    computed: {
        getMaxWidth:function(){
          return window.innerWidth*0.7+'px';
        },
        displayMessages: function () {
            let result = [];
            if (message.messageSend[this.targetUser.username] != null) {
                for (let i = 0; i < message.messageSend[this.targetUser.username].length; i++) {
                    result.push(message.messageSend[this.targetUser.username][i]);
                }
            }
            if (message.messageReceived[this.targetUser.username] != null) {
                for (let i = 0; i < message.messageReceived[this.targetUser.username].length; i++) {
                    result.push(message.messageReceived[this.targetUser.username][i]);
                }
            }
            result.sort(function (val1, val2) {
                return val1.time - val2.time;
            })
            return result;
        }
    },
    watch:{
      displayMessages:function () {
          setTimeout(function () {
              document.getElementById("chat-page-message-container").scrollTop = 99999;
          }, 100)
      }
    },
    mounted: function () {
        initDisplaySize();
        this.initTargetUser();
    }
})