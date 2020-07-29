var name = 'xiaoming';
var age = 18;
let flag = true;

function sum(num1, num2) {
  return num1 + num2;
}

if (flag) {
  console.log(sum(20, 30));
}
// 1.导出方式一
export {
  flag,
  age,
  name,
  sum
}

//2.导出方式二
export var num1 = 1000;
export var height = 1.88;

//3.导出函数
export function mul(num1, num2) {
  return num1 - num2;
}

//4.导出类
export class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  run() {
    console.log(this.name + '在奔跑');
  };
}

//5.export default,不定义名称，让使用者自定义名称,但是default只能有一个
// const address = '北京';
// export default address
// export {sum as hello}

export default function (...args){
  console.log(args)
}