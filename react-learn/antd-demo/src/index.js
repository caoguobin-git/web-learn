import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";
//全家桶
//jsx语法：<h1>Hello React</h1>
// const react="React hello";
//如果存在标签结构，并且标签结构要换行，需要用小括号（）括起来
// function tick(){
//     const element=(
//         <div>
//             <h1>Hello World!</h1>
//             <h2>It is {new Date().toLocaleTimeString()}</h2>
//         </div>
//     )
//     ReactDOM.render(element, document.getElementById('root'));
// }
//
// setInterval(tick,1000)


ReactDOM.render(<App/>, document.getElementById('root'));
