//let是在代码块内有效，var是在全局范围内有效
{
  var a = 0;
  let b = 1;
}
console.log(a)//0
console.log(b)//undefined
