import React from "react";
import Home from "./Home";
import MyNav from "./MyNav";
import StateComponent from "./StateComponent";
import LifeComponent from "./LifeComponent";
import SetStateDemo from "./SetStateDemo";
import IfDemo from "./IfDemo";
import KeyDemo from "./KeyDemo";
import FormDemo from "./FormDemo";
import RefsAndDOM from "./RefsAndDOM";
import RefsFrom from "./RefsForm";
import Parent from "./components/Parent";
import Compose from "./Compose";
import PropsTypeDemo from "./PropsTypeDemo";
//用类或Hook的形式来创建组件

class App extends React.Component {
    //渲染函数
    // render() {
    //     return <h1>Hello React Component</h1>
    // }


    constructor(props, context) {
        super(props, context);
        this.state={
            name:'123'
        }
    }

    changeDetails=()=>{
        this.setState({
            name:'子级向父级传递成功'
        })
    }

    changeName=(e)=>{
        this.setState({
            name:'父传子'
        })
    }

    //
    sonToFather=(val1,val2)=>{
        console.log(val1)
        console.log(val2)
        this.setState({
            name:val1
        })
    }


    render() {
        const nav1=["首页","学习","视频"];
        const nav2=["WEB","JAVA","NODE"];

        return (
            <div>
                {/*<Home/>*/}
                {/*<h1>Hello React Component</h1>*/}
                {/*<h1>学习React，最重要的是，心态要好！</h1>*/}
                {/*<MyNav nav={nav1} title="中文导航"/>*/}
                {/*<MyNav nav={nav2} title="英文导航"/>*/}
                {/*<StateComponent/>*/}
                {/*props可以传递方法，用于子模块向父模块传递数据*/}
                {/*<LifeComponent name={this.state.name} changeDetails={this.sonToFather}/>*/}
                {/*<button onClick={this.changeName}>父传子</button>*/}
                {/*<SetStateDemo/>*/}
                {/*<IfDemo/>*/}
                {/*<KeyDemo/>*/}
                {/*<FormDemo/>*/}
                {/*<RefsAndDOM/>*/}
                {/*<RefsFrom/>*/}
                {/*<Parent/>*/}
                {/*<Compose>*/}
                {/*    <div>我是组合效果</div>*/}
                {/*</Compose>*/}
                <PropsTypeDemo title="标题"/>
            </div>
        )
    }
}

export default App;