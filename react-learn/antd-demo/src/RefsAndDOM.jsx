import React from "react";

export default class RefsAndDom extends React.Component{


    //非受控组件获取DOM节点
    constructor(props, context) {
        super(props, context);
        this.HelloDiv=React.createRef();
    }

    componentDidMount() {
        this.HelloDiv.current.style.color='red'
        console.log(this.HelloDiv.current)
    }

    render() {
        return (
            <div>
                refs
                <div ref={this.HelloDiv}>
                    hello
                </div>
            </div>
        );
    }
}