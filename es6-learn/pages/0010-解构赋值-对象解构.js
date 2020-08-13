{
  //基本
  let x = {foo, bar} = {foo: 'aaa', bar: 'bbb'};
  //{ foo: 'aaa', bar: 'bbb' }
  console.log(x);
}

{
  //可嵌套
  let obj = {p: ['hello', {y: 'world'}]};
  let t = {p: [a, {b}]} = obj;
  //{ p: [ 'hello', { y: 'world' } ] }
  console.log(t)
}

{
  //可忽略
  let obj = {p: ['hello', {y: 'world'}]};
  let t = {p: [x, {}]} = obj;
  //{ p: [ 'hello', { y: 'world' } ] }
  console.log(t)
}

{
  //不完全解构
  let obj = {p: [{y: 'world'}]};

  let t = {p: [{y}, x]} = obj;
  // x = undefined
  // y = 'world'
  //t = { p: [ { y: 'world' } ] }
  console.log(t)
}

{
  //剩余运算符
  let t = {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
  //{ a: 10, b: 20, c: 30, d: 40 }
  console.log(t);
  //10
  console.log(a)
  //{ c: 30, d: 40 }
  console.log(rest)
}

{
  //解构默认值
  let t1 =  {a = 10, b = 5} = {a: 3};
  // a = 3; b = 5;
  let t2 =  {a: aa = 10, b: bb = 5} = {a: 3};
  // aa = 3; bb = 5;
}