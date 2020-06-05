import React from "react";
export default class Child2 extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    handleChange=(e)=>{
        this.props.onContentChange(e.target.value/7)
    }
    render() {
        return (
            <div>
                <p>美元：{this.props.money*7}</p>
                <input type="text" value={this.props.money*7} onChange={this.handleChange}/>
            </div>
        );
    }
}