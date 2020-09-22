
let arr=[{name:'sum',age:13},{name:'john',age:26},{name:'sunny',age:9}];

arr.sort((a,b)=>{
  return a.age- b.age
})
console.log(arr)


new Promise(resolve => {
  setTimeout(()=>{
    console.log('settime out 执行');
  },3000)
  resolve()

})
    .then(res=>{
      console.log('执行了')
    })
