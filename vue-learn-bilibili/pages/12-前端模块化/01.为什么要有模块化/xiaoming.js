//小明,利用闭包解决命名冲突的问题，但是代码不可复用了
// var moduleA = (function(){
//   //导出的对象
//   var obj={}
//   var name = '小明';
//   var age = 22;
//
//   function sum(num1, num2) {
//     return num1 + num2;
//   }
//
//   var flag = true;
//   if (flag) {
//     console.log(sum(10, 20))
//   }
//   //设置obj
//   obj.flag=flag;
//   obj.sum=sum;
//   //输出obj
//   return obj;
// })()

// var obj={}
// var name = '小明';
// var age = 22;
//
// function sum(num1, num2) {
//   return num1 + num2;
// }
//
// var flag = true;
// if (flag) {
//   console.log(sum(10, 20))
// }
// module.exports={
//   flag:flag,sum:sum
// }