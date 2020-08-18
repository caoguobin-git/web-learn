let url = 'http://yingyanchaxun.com/car_seeker/index.html?code=051JFb0w3kCkNU2Ug41w3mZ6wj3JFb04&state=home#/home#/login';
console.log(url.indexOf('?'))
console.log(url.indexOf('#'))
console.log(url.length)
let paramsStr = url.substr(url.indexOf('?') + 1, (url.indexOf('#')-url.indexOf('?')-1));
let params = paramsStr.split('&');
let paramMap = {};
params.forEach(val => {
  let kv = val.split('=');
  paramMap[kv[0]] = kv[1];
})
console.log(url.substr(0,url.indexOf('?'))+'#'+paramMap.state)
console.log(paramMap)
