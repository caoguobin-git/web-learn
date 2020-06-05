import React
    from 'react';

import Button
    from 'antd/es/button';
import 'antd/es/button/style/css';
import Pagination
    from "antd/es/pagination";
import 'antd/es/pagination/style/css'

function App() {

    function pageChange(page,pageSize) {
        console.log(page,pageSize)
    }

    return (
        <div
            className="App">
            hello
            world111
            <Button
                style={{color: 'blue'}}
                type={"danger"}
                size={"middle"}>hello</Button>
            <Pagination
                defaultCurrent={1}
                total={500}
                onChange={pageChange}></Pagination>
        </div>
    );
}

export default App;
