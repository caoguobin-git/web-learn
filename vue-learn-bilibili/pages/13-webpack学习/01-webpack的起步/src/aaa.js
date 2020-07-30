import {sum} from "./bbb";

export function test(num1,num2){
  console.log('aaa中执行方法：'+num1+" "+num2);
  let sum1 = sum(num1*10,num2);
  console.log(sum1)
}