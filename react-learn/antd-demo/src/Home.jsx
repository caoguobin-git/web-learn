import React from "react";

export default class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    //组件的事件传递
    clickHandler(element,event){

        fetch('http://localhost:9090/oauth/token?client_id=admin&client_secret=123456&grant_type=password&username=caoguobin&password=123123')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson)
            });
        console.log(element,event)
    }
    render() {
        const names=['iwen','ime']
        return (
            <div>
               Home
                <ul>
                    {
                        names.map((element,index)=>{
                            return <li onClick={(e)=>this.clickHandler(element,e)} key={index}>{element}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}