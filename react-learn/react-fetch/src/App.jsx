import React
    from 'react';
import qs from 'querystring'
import ProxyDemo
    from "./ProxyDemo";

class App extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            banners: []
        }
    }

    componentDidMount() {
        /**
         * fetch是基于promise的
         * get请求
         */
        fetch("http://iwenwiki.com/api/blueberrypai/getIndexBanner.php")
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(data => {
                console.log(data)
                this.setState({
                    banners: data.banner
                })
            })

        /**
         * post请求
         * ajax:对象类型的参数
         */
        fetch("http://iwenwiki.com/api/blueberrypai/login.php",
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json,text/plain,*/*'
                },
                //第一种方式
                // body: "user_id=iwen@qq.com&password=iwen123&verification_code=crfvw"
                //第二种方式
                body:qs.stringify({
                    user_id:'iwen@qq.com',
                    password:'iwen123',
                    verification_code:'crfvw'
                })
            })
            .then(res => res.json()).then(data => {
            console.log(data)
        })
    }

    render() {
        const {banners} = this.state;
        return (
            <div
                className="App">
                <div>
                    {
                        banners.length > 0 ?
                            <div>
                                {
                                    banners.map((content, index) => {
                                        return <div
                                            key={index}>
                                            <h3>{content.title}</h3>
                                            <p>{content.content}</p>
                                        </div>
                                    })
                                }
                            </div>
                            :
                            <div>there's
                                no
                                data</div>
                                                                                                                                                                                                                                                                                                                                                       }
                    <ProxyDemo/>
                </div>
            </div>
        );
    }
}

export default App;
