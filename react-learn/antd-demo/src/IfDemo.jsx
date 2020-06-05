import React from "react";


// #####常用应用场景：
// 1. 对视图条件进行切换
// 2. 做缺省值
class IfDemo extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLogin: false,
            names: ['iwen', 'ime']
        }
    }

    clickHandler = () => {
        this.setState({
            isLogin: true
        })
    }

    render() {
        let {names} = this.state;

        let showView = this.state.isLogin ? <div>iwen</div> : <div>请登录</div>
        return (
            <div>
                <h3>条件渲染</h3>
                {showView}
                <button onClick={this.clickHandler}>登录</button>
                {
                    names.length > 0 ?
                        <div>
                            {names.map((element, index) => {
                                return <p key={index}>{element}</p>
                            })}
                        </div>

                        :
                        <div>请等待，数据正在加载。。。</div>
                }


            </div>
        );
    }
}

export default IfDemo