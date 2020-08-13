# AntD UI 组件库的使用
### 安装
**npm install antd --save**

### 引用
**import {Button} from ‘antd’**

### 按需加载

1. **手动按需加载**

~~~
import React from 'react';
import  Button  from 'antd/es/button';
import 'antd/es/button/style/css';
function App() {
  return (
    <div className="App">
      hello world
        <Button type={"danger"} size={"middle"}>hello</Button>
    </div>
  );
}
export default App;
~~~

2. **用配置文件配置按需加载**
~~~
1. npm run eject:拉取React的配置文件
	遇到的问题：文件被修改了，无法运行npm run eject
	解决方法：
2. 
~~~


