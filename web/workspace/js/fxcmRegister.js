var fxcmRegister = new Vue({
    el: '#fxcm-register',
    data: {
        usertoken:'8E31BB9D927C5FC6C861DB2F4D461EE4',
        title: '欢迎注册福汇账号',
        fxcmRegisterMobile: '',
        fxcmRegisterName: '',
        fxcmRegisterEmail: '',
        fxcmRegisterIdentify: '',
        fxcmRegisterIDFront: '../img/IDFront.png',
        fxcmRegisterIDFrontFile: {},
        fxcmRegisterIDBack: '../img/IDBack.png',
        fxcmRegisterIDBackFile: {},
        fxcmRegisterDebit: '',
        fxcmRegisterDebitPic: '../img/debit-card.jpg',
        fxcmRegisterDebitPicFile: {},
        fxcmRegisterDebitRight: true
    },
    watch: {
        fxcmRegisterDebit: function(val) {
            var pattern = /^([1-9]{1})(\d{18})$/;
            if (!pattern.test(val)) {
                this.fxcmRegisterDebitRight = false;
            } else {
                this.fxcmRegisterDebitRight = true;
            }
        }
    },
    computed: {
        fxcmRegisterDebitStyle: function() {
            return this.fxcmRegisterDebitRight ? {} : {
                color: 'red',
                animation: 'my-debit-false .5s 2'
            }
        }
    },
    methods: {
        
        fxcmRegister: function() {
            let formdata=new FormData();
            formdata.append('usertoken',this.usertoken);
            formdata.append('pics',this.fxcmRegisterIDFrontFile);
            formdata.append('pics',this.fxcmRegisterIDBackFile);
            formdata.append('pics',this.fxcmRegisterDebitPicFile);
            formdata.append('mobile',this.fxcmRegisterMobile);
            formdata.append('eMail',this.fxcmRegisterEmail);
            formdata.append('realName',this.fxcmRegisterName);
            formdata.append('idCard',this.fxcmRegisterIdentify);
            formdata.append('debitCardId',this.fxcmRegisterDebit);
            console.log(formdata.get('pics'))

            let url="/user/registerFXCM";
            $.ajax({
                url: url,
                data: formdata,
                type: "post",
                dataType: "json",
                processData: false,
                contentType: false,
                async: false,
                success: function (result) {
                    console.log(result)
                }
            })


            window.location.href="about:blank";
            setTimeout(function () {
                window.close();
            },500)
        },
        
        uploadPic: function(e, file, picPath) {
            var files = e.target.files;
            if (files.length == 0) {
                return;
            }
            var pic = e.target.files[0];
            fxcmRegister[file] = pic;
            var reader = new FileReader();
            reader.readAsDataURL(pic);
            reader.onload = function() {
                fxcmRegister[picPath] = this.result;
            };
        }
    }
})
