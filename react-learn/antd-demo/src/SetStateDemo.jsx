import React from "react";

class SetStateDemo extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            count: 0
        }
    }

    increment = async () => {

        //此方法为异步
        // this.setState({
        //     count:this.state.count+1
        // },()=>{
        //     console.log('回调函数中实时获取：'+this.state.count)
        // })
        // console.log('不再回调函数中实时获取：'+this.state.count)

        //以下方法可以实现同步
        await this.setState({
            count: this.state.count + 1
        })
        console.log(this.state.count)

    }

    render() {
        return (
            <div>
                <h1>setState是同步还是异步</h1>
                <p>
                    {this.state.count}
                </p>
                <button onClick={this.increment.bind(this)}>修改</button>
            </div>
        );
    }
}

export default SetStateDemo