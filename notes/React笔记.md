## 前期的知识准备：

1. Javascript
2. HTML+CSS
3. 构建工具：Webpack
4. 安装node
5. cnpm命令
6. 官方文档
## 创建React项目

~~~
1. npx create-react-app <name>
2. cd <name>
3. npm start
~~~

## 自定义默认打开浏览器

~~~json
"scripts": {
  "start": "set BROWSER=firefox&& react-scripts start"
}
~~~



## 环境介绍

~~~
1. node_modules：依赖库文件
2. public： 入口文件，包含index和logo等文件
3. src：源码文件
4. package.json:依赖配置等
~~~

## React基础知识
### JSX语法
JSX语法：JavaScript语法+XML语法 

解读jsx语法：**遇到 <code>< ></code> 按照xml语法解析，遇到 <code>{ }</code> 按照JavaScript语法解析**

### 元素渲染

### 组件

1. 组件后缀可以是js，也可以是**jsx(推荐使用)**

### props属性
​		组件的复用性很重要，所以可以通过props传递数据（**父**模块向**子**模块）

### 事件处理
1. this问题
2. 向事件处理程序传递参数

### React声明周期函数

随者我们对React理解和使用越来越多，生命周期的参考价值越来越高

函数列表：
~~~
1. componentWillMount:组件渲染之前执行
2. componentDidMount：组件已经挂载
3. shouldComponentUpdate:返回true和false,true代表允许改变
4. componentWillUpdate：数据即将更新（state、props）
5. componentDidUpdate：数据更新完成（state、props）
6. componentWillReceiveProps：props改变执行（props）
7. componentWillUnmount：组件即将卸载
~~~

### 父传子！！！
~~~
1. 利用props进行数据绑定 
~~~
### 子传父！！！

~~~
1. 在父模块中调用子模块的时候利用props传递一个方法
2. 子模块中调用this.props.[method]来进行方法调用和传参
~~~


### setState更新是同步还是异步

1. setState会引起视图的重绘
2. 在可控的情况下是异步，在非可控的情况下是同步
3. 示例：
~~~
//此方法为异步
this.setState({
	count:this.state.count+1
	},()=>{
		console.log('回调函数中实时获取：'+this.state.count)
	})
console.log('不再回调函数中实时获取：'+this.state.count)

结果： 1 0 
~~~
~~~
//以下方法可以实现同步
await this.setState({
	count: this.state.count + 1
})
console.log(this.state.count)
结果： 1 1
~~~
### 条件渲染

##### 常用应用场景：

1. 对视图条件进行切换
2. 做缺省值

~~~
 {               
 	names.length > 0 
 	?
		<div>
			{names.map((element, index) => {
				return <p key={index}>{element}</p>
			})}
		</div>
	:
		<div>请等待，数据正在加载。。。</div>
}
~~~





### 遍历中的Key

设置Key可以实现原有的key元素不用重新渲染，可以实现增量渲染



### 表单

1. **受控组件**

   传递值为：监控input onChange事件-->调用setState()-->从state取值

   ~~~
   constructor(props, context) {
           super(props, context);
           this.state={
               hello:'world',
               username:''
           }
       }
       handleSubmit=(e)=>{
           e.preventDefault();
           console.log(this.state.username)
           // alert(this.state.username)
       }
   
       changeUsername=(e)=>{
           this.setState({
               username:e.target.value
           })
       }
   
       render() {
           return (
               <div>
                   <form method="post" onSubmit={this.handleSubmit}>
                       <input type="text" name="username" onChange={this.changeUsername} value={this.state.username}/>
                       <button type="submit">提交</button>
                   </form>
               </div>
           );
       }
   ~~~

   

2. **非受控组件**

   ~~~
   constructor(props, context) {
           super(props, context);
           this.usernameInput=React.createRef();
           this.passwordInput=React.createRef();
       }
   
       clickHandler=()=>{
          console.log(this.usernameInput.current.value)
          console.log(this.passwordInput.current.value)
       }
       render() {
           return (
               <div>
                   <input type="text" ref={this.usernameInput}/>
                   <input type="text" ref={this.passwordInput}/>
                   <button onClick={this.clickHandler}>获取</button>
               </div>
           );
       }
   ~~~

   



### Refs和DOM

1. 管理焦点，文本选择或媒体播放
2. 触发强制动画
3. 继承第三方DOM库

### 状态提升

**组件之间的数据交互**

~~~
import React from "react";
export default class Child1 extends React.Component{
    constructor(props, context) {
        super(props, context);
    }
    handleChange=(e)=>{
        this.props.onContentChange(e.target.value)
    }
    render() {
        return (
            <div>
                <p>人民币：{this.props.money*1}</p>
                <input type="text" value={this.props.money*1} onChange={this.handleChange}/>
            </div>
        );
    }
}
~~~
~~~
import React from "react";
export default class Child2 extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    handleChange=(e)=>{
        this.props.onContentChange(e.target.value/7)
    }
    render() {
        return (
            <div>
                <p>美元：{this.props.money*7}</p>
                <input type="text" value={this.props.money*7} onChange={this.handleChange}/>
            </div>
        );
    }
}
~~~
~~~
import React from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";
export default class Parent extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state={
            money:7
        }
    }
    contentChange=(e)=>{
        console.log(e)
        this.setState({
            money:e
        })
    }
    handleInput=async (e)=>{
       await this.setState({
           money:e.target.value
       })
    }
    render() {
        return (
            <div>
                <p>parent <input value={this.state.money} onChange={this.handleInput}/></p>

                <Child1 money={this.state.money} onContentChange={this.contentChange}/>
                <Child2  money={this.state.money} onContentChange={this.contentChange}/>
            </div>
        );
    }
}
~~~

### 组合和继承

this.props.children

~~~
<Compose>
	<div>我是组合</div>
</Compose>
~~~
~~~
import React from "react";
export default class Compose extends React.Component{
    render() {
        return (
            <div>
                组合：{this.props.children}
            </div>
        );
    }
}
~~~



### 使用PropTypes进行类型检查

增强程序的健壮性
类型：**array、bool、func、number、object、string、symbol各种**

~~~
import React from "react";
import PropTypes from 'prop-types';
export default class PropsTypeDemo extends React.Component{
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}
//类型检查以及必选项判定
PropsTypeDemo.propTypes = {
    title: PropTypes.string.isRequired
};
//指定默认值
PropsTypeDemo.defaultProps={
    title:'默认值'
}
~~~

### React 引入AntD



### 跨域解决方案

1. 开发模式下

~~~
配置文件package.json中配置   "proxy": "http://tingapi.ting.baidu.com"
并在fetch中去掉host地址，采用相对路径，因其host已被代理
~~~

2. 生产环境下

