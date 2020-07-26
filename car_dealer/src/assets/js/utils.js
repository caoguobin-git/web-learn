export function getOpenId(that) {
    if(!sessionStorage.openid) {
        var $appId = 'wx4335e535e7e39193'
        var $redirectUri = encodeURI('http://yingyanchaxun.com/car_dealer/dist/index.html');
        var code_front = getQueryString('code')
        if(!code_front) {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+$appId+'&redirect_uri='+$redirectUri+'&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect'
        } else {
            that.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/User/getopenid',
                async: false,
                data: that.qs.stringify({
                    code_front: code_front
                })  
            })  
            .then(function(res){
                if(res.data.code == 0) {
                    sessionStorage.openid = res.data.data.openid;
                } else {
                    alert(res.data.msg);
                }
            })  
        }   
    }   
}

export function addSignatureToUrl() {
    if(sessionStorage.signature != null && getQueryString('signature') == null){
        if(window.location.href.indexOf('?') == -1) {
            if(window.location.href.indexOf('#') == -1){
                window.location.href = window.location.href+"?signature=" + sessionStorage.signature;
            } else {
                window.location.href = window.location.href.split('#')[0] + '?signature=' + sessionStorage.signature + '#' + window.location.href.split('#')[1];
            }
        } else {
            window.location.href = window.location.href.split('?')[0] + '?signature=' + sessionStorage.signature + '&' + window.location.href.split('?')[1];
        }
    }
}

export function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null; 
}

// 判断微信浏览器
export function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
