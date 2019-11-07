var demo = new Vue({
    el: '#demo',
    data: {
        images: ['../img/pics/wallhaven-392lk9.jpg', '../img/pics/wallhaven-392lk9.jpg',
            '../img/pics/wallhaven-392lk9.jpg', '../img/pics/wallhaven-392lk9.jpg'
        ]
    }
})

var pics = document.getElementsByTagName("img");
var picsArray = [];
for (var i = 0; i < pics.length; i++) {
    picsArray.push(pics[i].getAttribute('src'))
}

function daluan(){
    for(var i =0;i<picsArray.length;i++){
        var index = parseInt(Math.random()*picsArray.length);
        var a = picsArray[i];
        picsArray[i]=picsArray[index];
        picsArray[index]=a;
    }
    
    for(var i=0;i<pics.length;i++){
        pics[i].setAttribute('src',picsArray[i])
    }
}
daluan()

var pics = document.getElementsByTagName("img");
var a = 0;
function test(){
    setInterval(function(){
        for(var i = 0;i<pics.length;i++){
            pics[i].style.transform='rotate('+a+'+deg)';
        }
        a+=10;
    },500)
}