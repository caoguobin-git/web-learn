var app1 = new Vue({
	el: "#app1",
	data: {
		message: "Hello Vue",
		fontSize: {
			color: 'red',
			fontSize: '20px'
		}
	}
})

var app2 = new Vue({
	el: "#app2",
	data: {
		title: '页面加载于' + new Date().toLocaleString()
	}
})

var app3 = new Vue({
	el: "#app3",
	data: {
		seen: true
	},
	methods: {
		changeDisplay: (function() {
			this.seen = !this.seen
		})
	},
	computed: {
		display: function() {
			return this.seen ? '隐藏' : '显示'
		}
	}
})

var app4 = new Vue({
	el: "#app4",
	data: {
		todos: [{
				index: 1,
				text: "吃饭"
			},
			{
				index: 2,
				text: "睡觉"
			},
			{
				index: 3,
				text: "打豆豆"
			}
		]
	}
})

var app5 = new Vue({
	el: "#app5",
	data: {
		message: "Hello world"
	},
	methods: {
		reverseMessage: function() {
			this.message = this.message.split('').reverse().join('')
		}
	}
})

var app6 = new Vue({
	el: "#app6",
	data: {
		message: "hello"
	}
})

Vue.component('todo-item', {
	props: ['todo'],
	template: '<li>{{todo.id}}{{todo.text}}</li>'
})
Vue.component('hello', {
	props: ['hello'],
	template: '<h1>{{hello.info}}</h1>'
})

var app7 = new Vue({
	el: '#app7',
	data: {
		groceryList: [{
				id: 0,
				text: '蔬菜'
			},
			{
				id: 1,
				text: '奶酪'
			},
			{
				id: 2,
				text: '随便其它什么人吃的东西'
			}
		],
		hellos: [{
				info: '12123'
			},
			{
				info: 'sdfasdf'
			}
		]
	}
})

var app8 = new Vue({
	el: ".hello",
	data: {
		a: 2,
		rawHtml: "<span style='color:red'>This should  be red.</span>"
	},
	created: function() {
		console.log('a is: ' + this.a)
	},
	updated: function() {
		console.log("app8 updated")
	},
	beforeCreate: function() {
		console.log('将要创建app8实例')
	},
	mounted: function() {
		console.log("挂载完成")
	}
})

var app9 = new Vue({
	el: "#example",
	data: {
		message: "Hello"
	},
	computed: {
		reversedMessage: {
			get: function() {
				return this.message.split('').reverse().join('')
			},
			set:function(val){
				this.message=val.split('').reverse().join('');
			}
		}
	}
})

var app10 = new Vue({
	el: "#demo",
	data: {
		firstName: 'Foo',
		lastName: 'Bar',
	},
	computed: {
		fullName: {
			get: function() {
				return this.firstName + ' ' + this.lastName
			},
			set: function(val) {
				var names = val.split(' ')
				this.firstName = names[0]
				this.lastName = names[1]
			}
		}
	}
})

var app11=new Vue({
	el:"#watch-example",
	data:{
		question:'',
		answer:'I cannot give ou an answer until you ask a question!'
	},
	watch:{
		question:function(newQuestion,oldQuestion){
			this.answer='Waiting for you to stop typing ...'
			this.debouncedGetAnswer()
		},
		created:function(){
			this.debouncedGetAnswer=_.debounce(this.getAnswer,500)
		},
		methods:{
			getAnswer:function(){
				if(this.question.indexOf('?')===-1){
					this.answer='Questions usually contain a question mark.'
					return
				}
				this.answer='Thinking...'
				var vm =this
				axios.get('https://yesno.wtf/api')
				.then(function(response){
					this.answer=_.capitalize(response.data.answer)
				})
				.catch(function(error){
					vm.answer='Error! Could not reach the API.'+error
				})
			}
		}
	}
})

var exampleClass=new Vue({
	el:'#example-class',
	data:{
		isActive:true,
		hasError:false
	}
})

var app12=new Vue({
	el:"#app-12",
	data:{
		isDisplay:'none'
	},
	methods:{
		switchDisplay:function(){
			if(this.isDisplay==='none'){
				this.isDisplay='block'
			}else{
				this.isDisplay='none'
			}
		}
	}
})

var app13=new Vue({
	el:"#app-13",
	data:{
		count:0
	}
})

var greetExample=new Vue({
	el:"#greetExample",
	data:{
		name:'Vue.js'
	},
	methods:{
		greet:function(event){
			alert('Hello '+this.name+'!')
			if(event){
				alert(event.target.tagName)
			}
		}
	}
})

var example3=new Vue({
	el:"#example-3",
	methods:{
		say:function(message){
			alert(message)
		}
	}
})

Vue.component('button-counter',{
	props:['title','title2'],
	data:function(){
		return{
			count:0
		}
	},
	template:'<button v-on:click="count++">You clicked {{title}}{{title2}} {{count}} times.</button>'
})

new Vue({
	el:"#components-demo"
})

Vue.component('blog-post',{
	props:['title'],
	template:'<h3>{{title}}</h3>'
})

new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})