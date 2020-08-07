let item =
  {name:'hello',restrict: "{\"src\":\"http://192.168.1.31/tableContentView/getQrCode/areaId=97&id=12562&type=3&token=qrToken_3_01278\"}"};

//取出restrict的内容
let picPath =item.restrict;
//转换成JSON对象并取值
console.log(JSON.parse(picPath).src);
//将对象转换为JSON字符串
let str  = JSON.stringify({hello:'name'})
console.log(str)

