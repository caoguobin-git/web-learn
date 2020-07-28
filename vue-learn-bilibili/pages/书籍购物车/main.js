const app=new Vue({
  el:'#app',
  data:{
    books:[
      {id:1,name:'《算法导论》',date:'2006-9',price:85.00,num:1},
      {id:2,name:'《UNIX编程艺术》',date:'2006-2',price:59.00,num:1},
      {id:3,name:'《编程珠玑》',date:'2008-10',price:39.00,num:1},
      {id:4,name:'《代码大全》',date:'2006-3',price:128.00,num:1}
    ]
  },
  methods:{
    // getPrice(value){
    //   return '￥'+value.toFixed(2);
    // }
    increment(index){
      console.log(index);
      this.books[index].num++;
    },
    decrement(index){
      console.log(index);
      this.books[index].num--;
    },
    removeHandler(index){
      this.books.splice(index,1);
    }
  },
  filters:{
    priceFilter(value){
      return '￥'+value.toFixed(2);
    }
  },
  computed:{
    total(){
      let total =0;
      this.books.forEach(item=>total+=item.price*item.num);
      //用index遍历,index为对象key或数组索引
      for(let index in this.books){

      }
      //直接使用book遍历，直接拿到数组value或对象属性值
      for (let book of this.books){

      }
      return total;
    }
  }
})