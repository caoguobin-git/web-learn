//1.导入的{}中定义的变量
import {flag,sum} from "./aaa.js";
if(flag){
  console.log('小明是天材');
}

//2.直接导入export定义的变量
import {num1,height} from "./aaa.js";
console.log(num1,height);

//3.导入export的function
import {mul,Person} from "./aaa.js";
console.log(mul(30,50))

const p=new Person('123',16);
console.log(p.name);
console.log(p.age);
p.run();
//4.导入default的内容:addr为aaa.js中的default
import addr
  from "./aaa.js";
addr(123,123,12,31,23123);

import * as test from "./aaa.js"

test.sum(1,1)
console.log(test.name);
console.log(test.age);
test.mul(12,12);
console.log(new Person('123123', 123));
