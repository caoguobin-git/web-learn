import React from 'react';

import  Button  from 'antd/es/button';
import 'antd/es/button/style/css';
import Pagination from "antd/es/pagination";
import 'antd/es/pagination/style/css'

function App() {
  return (
    <div className="App">
      hello world
        <Button type={"danger"} size={"middle"}>hello</Button>
        <Pagination defaultCurrent={1} total={500}></Pagination>
    </div>
  );
}

export default App;
