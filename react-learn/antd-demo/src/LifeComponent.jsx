import React from "react";

class LifeComponent extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            time: 'hello',
            hello:'world'
        }
    }

    componentWillMount() {
        console.log("componentWillMount")
    }

    componentDidMount() {
        console.log("did mount")
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate");
        return true;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("componentWillUpdate")
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate")
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("componentWillReceiveProps")
    }

    componentWillUnmount() {
        console.log("componentWillUnmount")
    }

    updateTime = () => {
        this.setState({
            time: new Date().toLocaleTimeString()
        })
    }

    sonToFather=()=>{
        this.props.changeDetails('子传父','传递成功');
    }

    render() {
        //todo es6 解构赋值
        const {time,hello} = this.state;
        const {name}=this.props;
        return (
            <div>
                {hello}
                <h1>{this.state.time} {this.props.name}</h1>
                <h1>{time} {name}</h1>
                <button onClick={this.updateTime}>更新时间</button>
                <button onClick={this.sonToFather}>子-->父</button>
            </div>
        );
    }

}

export default LifeComponent