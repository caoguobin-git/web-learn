# Webpack 笔记

[TOC]

## 一、Webpack安装

> 安装webpack首先需要安装Node.js,Node.js自带了软件包管理工具npm

~~~shell
#查看自己的node版本
node -v
~~~

> 全局安装webpack(指定webpack版本问3.6.0)

~~~shell
npm install webpack@3.6.0 -g
~~~

>局部安装webpack(后续需要)

~~~shell
#声明开发时依赖，项目打包后不需要继续使用
--save-dev
~~~

~~~shell
#打开对应目录之后执行
npm install webpack@3.6.0 --save-dev
~~~

> 为什么全局安装后，还需要局部安装呢？
>
> * 在终端直接执行webpack命令，使用的是全局安装的webpack
> * 当在package.json中定义了scripts时，其中包含了webpack命令，那么使用的就是局部webpack

>开发时依赖和运行时依赖：
>
>* 开发时依赖：只有在开发的时候需要使用webpack，在构建之后就没有用了
>* 运行时依赖：在开发和构建过程中都需要使用的依赖

## 二、Webpack的基本使用过程

### 2.1 Webpack打包的基本使用

> webpack 4 打包：
>
> * 可以选择打包方式，开发环境还是生产环境
> * **默认为生产环境**
>
> webpack 3 打包：
>
> * webpack ./src/main.js  ./dist/bundle.js

~~~shell
#打包development（4.x版本）
webpack ./src/main.js -o ./dist/bundle.js --mode development
~~~

~~~shell
#打包production （4.x版本）
webpack ./src/main.js -o ./dist/bundle.js --mode production
~~~

~~~javascript
//main.js
//1.使用commonJs的模块化规范
const {add, mul} = require('./mathUtils')

//2.使用ES6的模块化规范
import {name, age, height} from "./info";

console.log(add(20, 30));
console.log(mul(20, 30));
console.log(name, age, height);


//mathUtils.js
function add(num1, num2) {
  return num1 + num2;
}

function mul(num1, num2) {
  return num1 * num2;
}
module.exports={
  add,mul
}


//info.js
export const name='why';
export const age = 18;
export const height =1.88;
~~~

~~~html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
<!-- 直接引入打包好的bundle.js文件 -->
<script src="./dist/bundle.js"></script>
</body>
</html>
~~~

## 三、Webpack 配置

### 3.1 项目根目录创建webpack.config.js文件

#### 3.1.1 Node初始化

> webpack运行需要node环境，所以应该先执行node初始化

~~~shell
#生成package.json文件，示例如下：
npm init
~~~

~~~json
{
  "name": "meetwebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

~~~



#### 3.1.2 webpack配置入口出口路径

~~~javascript
//示例代码
//导入node的path模块
const path = require('path')
module.exports={
  //配置入口文件
  entry:'./src/main.js',
  //配置出口文件
  output:{
    //路径必须为绝对路径，需要动态获取路径,利用node的path模块
    //__dirname为node的全局变量,dist为目标文件夹路径
    path: path.resolve(__dirname,"dist"),
    filename:'bundle.js'
  },
  //配置打包模式：development开发环境，production生产环境
  mode:'development'
}
~~~

#### 3.1.3 Node中配置webpack指令

> 配置完成后可以使用npm run build指令执行webpack：
>
> * npm run < 指令 >：npm会在package.json中的scripts中查找对应的指定并执行。
> * **npm会优先在本地查找对应的指令，如果本地存在，则不会全局查找webpack等指令。**
>
> * 在scripts中添加"build":"webpack"。
>
> package.json中的scripts中的脚本在执行时，会按照一定的顺序寻找命令对应的位置。
>
> * 首先，会寻找本地的node_modules/bin路径中对相应的命令。
> * 如果没有找到，会去全局的环境变量中寻找。
> * 如何执行我们的build指令呢？
> * npm run build

~~~json
{
  "name": "meetwebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "author": "",
  "license": "ISC"
}
~~~

#### 3.1.4 安装本地本地Webpack

> 有时需要使用不同版本的webpack，可以根据需要安装dev环境下的webpack

~~~shell
npm installl webpack@3.6.0 --save-dev
~~~

> 这样安装之后package.json文件如下：注意查看devDependencies中的配置内容

~~~json
{
  "name": "meetwebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.6.0"
  }
}
~~~

## 四、Webpack处理CSS、LESS、图片等

> loader时webpack中一个非常核心的概念。
>
> **webpack用来作什么呢？**
>
> * 在目前的案例中，我们主要是用webpack来处理我们写的js代码，并且webpack会自动处理js之间的先骨干依赖关系。
> * 但是，在开发中我们不仅仅有基本的js代码处理，我们也需要加载CSS、图片，也包括一些高级的将ES6转成ES5代码，将TypeScript转成ES5代码，将SCSS、LESS转成CSS，将.jsx、.vue文件转成js文件等。
> * 对于webpack本身的能力来说，对于这些转化是不支持的。
> * 解决方案：给webpack扩展对应的loader就可以了。
>
> **loader使用过程**
>
> * 步骤一：通过npm安装需要使用的loader
> * 步骤二：在webpack.config.js中的modules关键字下进行配置。
>
> **大部分loader都可以在webpack的官网中找到，并且学习对应的用法。**

### 4.1 Webpack处理CSS文件

> **首先：**
>
> * **需要安装style-loader，因为css-loader只负责加载css文件，不会渲染**
>
> * **需要安装CSS-Loader，负责将css文件加载打包**
>
> * **使用多个loader时，是从右向左加载的，需要注意顺序**
>
>  <strong style="color:red">默认安装最新版本，配置方式可能不同,可能导致出错，可以使用2.0.2版本的css-loader和1.2.1版本的style-loader</strong>
>

~~~shell
#安装style-loader
npm install style-loader --save-dev(可能需要注意版本号，可以使用1.2.1)
#安装css-loader
npm install css-loader --save-dev(可能需要注意版本号，可以使用2.0.2)
~~~

> **然后：需要在webpack配置文件中添加插件：**

~~~javascript
module.exports = {
  module: {
    rules: [
      {
        //添加style-loader和css-loader
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
~~~

>**最后：需要在入口文件中引用CSS文件**

~~~javascript
<!-- ES6写法 -->
import css from './css/normal.css';
<!-- commonJS写法 -->
require("./css/normal.css");
~~~

### 4.2 Webpack处理Less文件

> **首先：定义一个Less文件**

~~~less
@fontSize: 50px;
@fontColor:black;

body{
  font-size: @fontSize;
  color: @fontColor;
}
~~~

> **安装less-loader：**
>
> * **less-loader：**安装less-loader。
> * **less:**less也可以作为npm中的一个包，在转化过程中，需要使用到。

~~~shell
npm install --save-dev less-loader less
~~~

> **配置使用less-loader:**
>
> **在roles中添加一个对应的解析规则：less-loader --> css-loader --> style-loader**
>
> *Chain the less-loader with the css-loader and the style-loader to immediately apply all styles to the DOM.*

~~~javascript
 module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
    ],
  }
~~~

> **导入less文件**

~~~javascript
require("./css/special.less");
import css from './css/special.less';
~~~

### 4.2 Webpack处理图片文件

> **导入图片loader：**url-loader
>
> <strong style="color:red">默认安装4.x,可能导致图片转换出错，可以使用1.1.2版本</strong>

~~~shell
npm install url-loader --save-dev
~~~

>**配置使用url-loader：**
>
>* **配置文件匹配格式**
>* **配置文件限制大小**
>* **配置文件保存路径（在publicPath下生成对应文件夹和文件）**
>
>在webpack.config.js中添加以下模块

~~~javascript
{
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //当加载图片时，小于limit，会将图片编译成base64
              //大于limit时，会使用file-loader
              limit: 8192,
              //修改图片名称 name为占位符，为原始文件名,8位hash值,ext位扩展名
              name:'img/[name].[hash:8].[ext]'
            },
          }
        ]
}
~~~

### 4.3 Webpack处理大文件

> **当图片大于限制大小的时候，需要配置file-loader，不能将图片转换成base64，以提高加载速度**

> **安装file-loader(3.0.1可用)**

~~~shell
npm install file-loader --save-dev
~~~

> **配置使用file-loader：**（**不需要配置即可生效**）
>
> **注意：添加file-loader后需要对图片路径进行配置**

~~~javascript
{
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
~~~

> **图片会被编译到dist文件夹中，需要配置才可以使用**
>
> **配置publicPath之后，所有涉及到url的地方都会自动改变成相应的url**

~~~javascript
  //配置出口文件
  output: {
    //路径必须为绝对路径，需要动态获取路径,利用node的path模块
    //__dirname为node的全局变量,dist为目标文件夹路径
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
    publicPath:'dist/'
  },
~~~

## 五、ES6转ES5的babel

### 5.1 安装babel-loader

> **使用bable-loader将ES6语法转化为ES5语法，以适配所有浏览器**
>
> * babel-core 核心文件

~~~shell
npm install --save-dev babel-loader@7 babel-core babel-preset-es2015(推荐)

npm install babel-loader babel-core babel-preset-env
~~~

> **使用babel-loader**

~~~javascript
{
  //配置匹配文件
  test: /\.m?js$/,
    //排除文件夹
    exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
          options: {
            //
            presets: ['es2015']
          }
      }
}
~~~

## 六、配置Vue开发环境

### 6.1 安装Vue

> **npm 安装 Vue**
>
> * **运行时也需要使用Vue，所以不适用--save-dev**

~~~shell
npm install vue --save
~~~

> 打包后报错的解决方案：
>
> https://cn.vuejs.org/v2/guide/deployment.html

~~~javascript
<!-- 第一种解决方案（官网） -->
  plugins: [
    // 配置使用生产环境开发
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
    <!-- 第二种解决方案 -->
  resolve:{
    alias:{
      'vue$':'vue/dist/vue.esm.js'
    }
  }  
~~~

### 6.2 在项目中直接使用Vue

> **在main.js中引入vue，并且在index.html中创建挂载点**

~~~javascript
//main.js
import Vue from 'vue';
new Vue({
  el:'#app',
  //template会替换掉el代表的标签
  template:`
    <div>
      <h2>{{message}}</h2>
    <button @click="btnClick">按钮</button>
    </div>
  `,
  data:{
    message:'hello webpack',
    name:'Jackson'
  },
  mounted() {
    console.log(this.message)
  },
  methods:{
    btnClick(){
      console.log(this.message+'  '+Math.random());
    }
  }
})
~~~

~~~html
<!-- index.html -->
<body>
<div id="app">
  <h2>{{message}}</h2>
</div>
<script src="./dist/bundle.js"></script>
</body>
~~~

### 6.3 使用Vue的高级方法

~~~javascript
//写在main.js中
import Vue from 'vue';
//高级解决方案,抽取模块
const App = {
  template: `
    <div>
      <h2>{{message}}</h2>
      <button @click="btnClick">按钮</button>
    </div>`,
  data(){
    return {
      message: 'hello webpack',
      name: 'Jackson'
    }
  },
  methods:{
    btnClick() {
      console.log(this.message + '  ' + Math.random());
    }
  }

}
//调用app组件
new Vue({
  el: '#app',
  //template会替换掉el代表的标签
  template:'<app />',
  components:{
    app:App
  }
})
~~~

<strong style="color:red">或者这样</strong>

~~~javascript
//app.js
let App = {
  template: `
    <div>
      <h2>{{message}}</h2>
      <button @click="btnClick">按钮</button>
    </div>`,
  data(){
    return {
      message: 'hello webpack',
      name: 'Jackson'
    }
  },
  methods:{
    btnClick() {
      console.log(this.message + '  ' + Math.random());
    }
  }
}
export default App
~~~

<strong style="color:red">直至这样(但是这样会报错，需要配置vue-loader)</strong>

~~~vue
//App.vue
<template>
  <div>
    <h2>{{ message }}</h2>
    <button @click="btnClick">按钮</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: 'hello webpack',
      name: 'Jackson'
    }
  },
  methods: {
    btnClick() {
      console.log(this.message + '  ' + Math.random());
    }
  }
}
</script>

<style scoped>
  h2{
    color: greenyellow;
  }
</style>
~~~

### 6.4 安装vue-loader

#### 6.4.1 应用简写的问题

> 对于import的时候是否可以简写后缀：import Cpn from "./Cpn.vue";
>
> 如果需要简写，需要修改webpack配置文件，因为默认查找的是.js文件

~~~javascript
  resolve:{
    //配置可以省略的后缀名称
    extensions:['.js','.css','.vue'],
    alias:{
      'vue$':'vue/dist/vue.esm.js'
    }
  }
~~~

#### 6.4.2 vue-loader和vue-template-compiler的安装

> **安装vue-loader和vue-template-compiler（将template解析成render函数）**

~~~shell
npm install vue-loader vue-template-compiler --save-dev
~~~

#### 6.4.3 vue-loader配置

> 修改webpack.config.js中的配置文件

~~~javascript
// 引入插件依赖
const VueLoaderPlugin = require('vue-loader/lib/plugin');

//配置vue-loader
{
  test: /\.vue$/,
    use: {
      loader: 'vue-loader'
    }
}
//配置插件
plugins: [
  //// 配置使用生产环境开发
  //new webpack.DefinePlugin({
  //  'process.env.NODE_ENV': JSON.stringify('production')
  //})
  new VueLoaderPlugin()
]  
~~~

## 七、Webpack插件简介

### 7.1 webpack-横幅plugin的使用

> 使用BannerPlugin添加所有权信息

~~~javascript
var webpack = require('webpack');

plugins: [
  new VueLoaderPlugin(),
  new webpack.BannerPlugin('最终版权归xxx所有'),
],
~~~

~~~javascript
//结果如下

/*!
 * 最终版权归xxx所有
 * hello world
 */
/******/ (function(modules) { // webpackBootstrap...
~~~

### 7.2 webpack-HtmlWebpackPlugin的使用

> **HtmlWebpackPlugin：**
>
> **HtmlWebpackPlugin简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 你可以让插件为你生成一个HTML文件，使用lodash模板提供你自己的模板，或使用你自己的loader。**

#### 7.2.1 HtmlWebpackPlugin的安装

~~~shell
//版本3.2.0可用
npm install html-webpack-plugin --save-dev 
~~~



#### 7.2.2 HtmlWebpackPlugin的配置

~~~javascript
//引入插件
const htmlWebpackPlugin =require('html-webpack-plugin');

//配置插件
  plugins: [
    new htmlWebpackPlugin({
      //当前目录下寻找模板文件
      template:'index.html'
    })
  ],
~~~



#### 7.2.3 HtmlWebpackPlugin的使用



### 7.3 Uglifyjs-webpack-plugin的使用

#### 7.3.1Uglifyjs-webpack-plugin的安装

> Uglifyjs-webpack-plugin的安装

~~~shell
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
~~~



#### 7.3.2 Uglifyjs-webpack-plugin的配置

~~~javascript
//插件引入
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')；

//插件使用
  plugins: [
      new uglifyJsPlugin()
  ],
~~~

## 八、Webpack搭建本地服务器

> webpack提供一个可选的本地开发服务器，这个本地服务器基于node.js搭建，内部使用express框架，可以实现浏览器自动刷新修改后效果的功能。不过它是一个单独的功能，需要安装才可以使用。

### 8.1 Webpack-dev-server安装

~~~shell
npm install webpack-dev-server@2.9.1 --save-dev
~~~

### 8.2 Webpack-dev-server配置

> devserver也是作为webpack中的一个选项，选项本身可以设置如下属性：
>
> * contentBase:为哪一个文件夹提供本地服务，默认是根文件夹，我们可以填写./dist
> * port:端口号
> * inline：页面实时刷新
> * historyApiFallback：在SPA页面中，依赖HTML5的history模式

> 配置文件如下：webpack.config.js中配置

~~~javascript
devServer:{
  contentBase:'./dist',
  inline:true,
  port:80
}
~~~

### 8.3 Webpack-dev-server使用

> 配置package.json 使用npm run dev命令来启动本地服务器
>
> --open 参数表示直接打开浏览器
>
> 可以通过名称指定用哪个浏览器打开
>
> package.json中配置

~~~json
"scripts": {
	"dev": "webpack-dev-server --open firefox"
 },
~~~

## 九、Webpack开发环境和生产环境配置的分离

### 9.1 安装Webpack-merge插件

> webpack-merge可以实现将多个配置文件整合成一个的功能。
>
> **版本：4.1.5可用**

~~~shell
npm install webpack-merge --save-dev
~~~

### 9.2 Webpack-merge的配置

> 在需要使用merge的地方配置如下

~~~javascript
//dev.config.js
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.config');
//import baseConfig from './base.config.js';

module.exports = webpackMerge(baseConfig, {
  //编译打包的时候这个配置是不需要的
  devServer:{
    contentBase:'./dist',
    inline:true,
    port:80
  }
})

//prod.config.js
const UglifyJWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig =require('./base.config.js');

module.exports = webpackMerge(baseConfig, {
  plugins: [
    //添加js混淆工具
    new UglifyJWebpackPlugin()
  ]
})
~~~

### 9.3 Webpack取别名的配置

![image-20200731111455659](pic\Webpack笔记\image-20200731111455659.png)