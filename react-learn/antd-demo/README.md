## 前期的值时准备：
1. Javascript
2. HTML+CSS
3. 构建工具：Webpack
4. 安装node
5. cnpm命令
6. 官方文档
## 创建React项目
1. npx create-react-app [name]
2. cd [name]
3. npm start

## 环境介绍
1. node_modules：依赖库文件
2. public： 入口文件，包含index和logo等文件
3. src：源码文件
4. package.json:依赖配置等

## React基础知识
###JSX语法
JSX语法：JavaScript语法+XML语法 

解读jsx语法：遇到<>按照jsx语法解析，遇到{}按照JavaScript语法解析

### 元素渲染

### 组件
1. 组件后缀可以是js，也可以是jsx

### props属性
组件的复用性很重要，所以可以通过props传递数据

### 事件处理
1. this问题
2. 向事件处理程序传递参数


### React声明周期函数
随者我们对React理解和使用越来越多，生命周期的参考价值越来越高

函数列表：
    1. componentWillMount:组件渲染之前执行
    2. componentDidMount：组件已经挂载
    3. shouldComponentUpdate:返回true和false,true代表允许改变
    4. componentWillUpdate：数据即将更新（state、props）
    5. componentDidUpdate：数据更新完成（state、props）
    6. componentWillReceiveProps：props改变执行（props）
    7. componentWillUnmount：组件即将卸载
### 父传子！！！
    ** 利用props进行数据绑定 **
### 子传父！！！
    1. 在父模块中调用子模块的时候利用props传递一个方法
    <pre>
    </pre>
    2. 子模块中调用this.props.[method]来进行方法调用和传参
