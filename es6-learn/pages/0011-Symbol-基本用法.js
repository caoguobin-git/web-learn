/*
ES6 引入了一种新的原始数据类型 Symbol ，表示独一无二的值，最大的用法是用来定义对象的唯一属性名。
* */
{
  let sy = Symbol('KK');
  //Symbol(KK)
  console.log(sy)
  //symbol
  console.log(typeof sy);

  //相同参数Symbol()返回的值不相等
  let sy1 = Symbol('KK');
  console.log(sy === sy1)
}