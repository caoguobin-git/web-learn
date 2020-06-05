import React from "react";

export default class RefsFrom extends React.Component{


    constructor(props, context) {
        super(props, context);
        this.usernameInput=React.createRef();
        this.passwordInput=React.createRef();
    }

    clickHandler=()=>{
       console.log(this.usernameInput.current.value)
       console.log(this.passwordInput.current.value)
    }
    render() {
        return (
            <div>
                <input type="text" ref={this.usernameInput}/>
                <input type="text" ref={this.passwordInput}/>
                <button onClick={this.clickHandler}>获取</button>
            </div>
        );
    }

}