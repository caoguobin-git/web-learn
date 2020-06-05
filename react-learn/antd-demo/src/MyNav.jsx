import React from "react";


//props不可以被修改，是由上级元素传递过来的
export default class MyNav extends React.Component{

    render() {
        console.log(this.props.nav)
        return (
            <div>
                <h3>{this.props.title}</h3>
                <ul>
                    {/*直接取值*/}
                    <li>{this.props.nav[0]}</li>
                    <li>{this.props.nav[1]}</li>
                    <li>{this.props.nav[2]}</li>
                    {/*遍历数组取值*/}
                    {
                        this.props.nav.map((element,index)=>{
                            return <li key={index}>{index+1}. {element}</li>
                        })
                    }
                </ul>
            </div>
        );
    }

}