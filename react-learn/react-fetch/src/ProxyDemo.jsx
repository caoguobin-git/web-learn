import React
    from "react";


/**
 * 配置package文件解决跨域问题
 * "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=10&offset=0"
 * 跨域的解决方案：
 *      开发模式下：
 *          利用环境解决：react vue常用框架都提供了解决方案
 *      生产模式下：
 *          jsonP cors iframe postMessage。。。等解决方案
 */
export default class ProxyDemo extends React.Component {


    componentDidMount() {
        //第一种方案
        //package.json文件中配置 "proxy": "http://tingapi.ting.baidu.com"
        // //host已经被proxy所代替了
        // fetch("/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=10&offset=0", {
        //     mode: 'cors'
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //     })
        //     .catch(e=>{
        //         console.log(new Error(e))
        //     })

        //第二种方案
        //方案路径： github.com/face/book/create-react-app/blob/master/docusaurus/docs/proxying-api-requests-in-development.md
        // fetch("/api/list")
        //     .then(res=>res.json())
        //     .then(data=>{
        //         console.log(data)
        //     })
    }

    render() {
        return (
            <div>
                proxy demo
            </div>
        );
    }
}