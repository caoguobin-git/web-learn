import React from "react";

export default class FormDemo extends React.Component{


    constructor(props, context) {
        super(props, context);
        this.state={
            hello:'world',
            username:''
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state.username)
        // alert(this.state.username)
    }

    changeUsername=(e)=>{
        this.setState({
            username:e.target.value
        })
    }

    render() {
        return (
            <div>
                <form method="post" onSubmit={this.handleSubmit}>
                    <input type="text" name="username" onChange={this.changeUsername} value={this.state.username}/>
                    <button type="submit">提交</button>
                </form>
            </div>
        );
    }

}