var fxcmRegister = new Vue({
     el: '#fxcm-register',
     data: {
         title: '欢迎注册福汇账号',
         fxcmRegisterMobile: '15858585858',
         fxcmRegisterName: '张三',
         fxcmRegisterEmail: 'helloworld@live.com',
         fxcmRegisterIdentify: '110120199011223654',
         fxcmRegisterIDFront: '../img/IDFront.png',
         fxcmRegisterIDFrontFile: {},
         fxcmRegisterIDBack: '../img/IDBack.png',
         fxcmRegisterIDBackFile: {},
         fxcmRegisterDebit: '622288888888888888',
         fxcmRegisterDebitPic: '../img/debit-card.jpg',
         fxcmRegisterDebitPicFile: {},
         fxcmRegisterDebitRight: true
     },
     watch: {
         fxcmRegisterDebit: function(val) {
             var pattern=/^([1-9]{1})(\d{18})$/;
             if(!pattern.test(val)){
                 this.fxcmRegisterDebitRight=false;
             }else{
                 this.fxcmRegisterDebitRight=true;
             }
         }
     },
     computed: {
         fxcmRegisterDebitStyle: function() {
             return this.fxcmRegisterDebitRight ? {} : {
                 color: 'red',
                 animation:'my-debit-false .5s 2'
             }
         }
     },
     methods: {
         fxcmRegister: function() {
             console.log(new Date().getTime())
         },
         uploadIDFront: function(e) {
             console.log(e.target.files);
             var files = e.target.files;
             if (files.length == 0) {
                 return;
             }
             var pic = e.target.files[0];
             fxcmRegister.fxcmRegisterIDFrontFile = pic;
             var reader = new FileReader();
             reader.readAsDataURL(pic);
             reader.onload = function() {
                 fxcmRegister.fxcmRegisterIDFront = this.result;
             };
         },
         uploadIDBack: function(e) {
             console.log(e.target.files);
             var files = e.target.files;
             if (files.length == 0) {
                 return;
             }
             var pic = e.target.files[0];
             fxcmRegister.fxcmRegisterIDBackFile = pic;
             var reader = new FileReader();
             reader.readAsDataURL(pic);
             reader.onload = function() {
                 fxcmRegister.fxcmRegisterIDBack = this.result;
             };
         },
         uploadDebitPic: function(e) {
             console.log(e.target.files);
             var files = e.target.files;

             if (files.length == 0) {
                 return;
             }
             var pic = e.target.files[0];
             fxcmRegister.fxcmRegisterDebitPicFile = pic;
             var reader = new FileReader();
             reader.readAsDataURL(pic);
             reader.onload = function() {
                 fxcmRegister.fxcmRegisterDebitPic = this.result;
             };
         }
     }
 })
