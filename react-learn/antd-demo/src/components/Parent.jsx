import React from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";
export default class Parent extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state={
            money:7
        }
    }
    contentChange=(e)=>{
        console.log(e)
        this.setState({
            money:e
        })
    }
    handleInput=async (e)=>{
       await this.setState({
           money:e.target.value
       })
    }
    render() {
        return (
            <div>
                <p>parent <input value={this.state.money} onChange={this.handleInput}/></p>

                <Child1 money={this.state.money} onContentChange={this.contentChange}/>
                <Child2  money={this.state.money} onContentChange={this.contentChange}/>
            </div>
        );
    }
}