import React from "react";

export default class Child1 extends React.Component{


    constructor(props, context) {
        super(props, context);
    }

    handleChange=(e)=>{
        this.props.onContentChange(e.target.value)
    }


    render() {
        return (
            <div>
                <p>人民币：{this.props.money*1}</p>
                <input type="text" value={this.props.money*1} onChange={this.handleChange}/>
            </div>
        );
    }

}