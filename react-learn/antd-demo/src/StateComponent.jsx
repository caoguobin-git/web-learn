import React from "react";

export default class StateComponent extends React.Component {
    constructor(props) {
        super(props);
        //定义state
        this.state={
            count:10,
            flag:true
        }
    }

    increment(){
        this.setState({
            count:++this.state.count
        })
    }

    decrement(){
        this.setState({
            count:--this.state.count
        })
    }

    //箭头函数绑定this
    aboutThis=()=>{
        console.log(this)
    }
    switchDisplay=()=>{
        this.setState({
            flag:!this.state.flag
        })
    }

    render() {
        let showView=this.state.flag?'我是孙悟空':'我是假的孙悟空'
        return (
            <div>
                <h3>组件的State</h3>
                <p>{this.state.count}</p>
                {/*必须绑定回this，不然找不到对象*/}
                <button onClick={this.increment.bind(this)} type="primary">增加</button>
                <button onClick={this.decrement.bind(this)} type="primary">减少</button>
                <button onClick={this.aboutThis}>关于this</button>
                <button onClick={this.switchDisplay}>显示隐藏</button>
                <p >{showView}</p>
            </div>
        );
    }
}