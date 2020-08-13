{
  //基本
  let [a, b, c] = [1, 2, 3]
  //1 2 3
  console.log(a, b, c)
}
{
  //嵌套
  let [a, [[b], c]] = [1, [[2], 3]];
  //1 2 3
  console.log(a, b, c)
}
{
  //忽略
  let [a, , b] = [1, 2, 3]
  //1 3
  console.log(a, b)
}

{
  //不完全结构
  let [a = 1, b] = [];
  //1 undefined
  console.log(a, b)
}

{
  //剩余运算符
  let [a, ...b] = [1, 2, 3]
  //1 [2,3]
  console.log(a, b)
}
{
  //字符串等
  //在数组的解构中，解构的目标若为可遍历对象，皆可进行解构赋值。可遍历对象即实现 Iterator 接口的数据。
  let [a, b, c, d, e] = 'hello';
  // h e l l o
  console.log(a, b, c, d, e);
}
{
  //解构默认值
  let [a = 2] = [undefined];
  //2
  console.log(a)

  let [b = 3] = [12, 3];
  //12
  console.log(b)
}

{
  //当解构模式有匹配结果，且匹配结果是 undefined 时，会触发默认值作为返回结果。
  let [a = 3, b = a] = [];     // a = 3, b = 3
  let [c = 3, d = a] = [1];    // a = 1, b = 1
  let [e = 3, f = a] = [1, 2]; // a = 1, b = 2
  /*
   * a 与 b 匹配结果为 undefined ，触发默认值：a = 3; b = a =3
a 正常解构赋值，匹配结果：a = 1，b 匹配结果 undefined ，触发默认值：b = a =1
a 与 b 正常解构赋值，匹配结果：a = 1，b = 2
   */
}