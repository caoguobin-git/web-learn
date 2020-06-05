import React from "react";

class KeyDemo extends React.Component{


    constructor(props, context) {
        super(props, context);
        this.state={
            userInfo:[{
                name:'iwen',
                age:20,
                sex:'男',
                jobs:['java','web','php']
            },{
                name:'ime',
                age:21,
                sex:'男',
                jobs:['java','web','php']
            },{
                name:'frank',
                age:30,
                sex:'男',
                jobs:['java','web','php']
            },{
                name:'cgb',
                age:34,
                sex:'男',
                jobs:['java','web','php2']
            }]
        }
    }

    addUser=()=>{
        // this.setState({
        //     userInfo:this.state.userInfo.concat([{
        //         name:'sdf',
        //         age:23,
        //         sex:'女',
        //         jobs:['123','213','123']
        //     }])
        // })

        let old=this.state.userInfo;
        old.push({
                    name:'sdf',
                    age:23,
                    sex:'女',
                    jobs:['123','213','123']
        });
        this.setState({
            userInfo:old
        })
    }

    removeUser=()=>{
        let old=this.state.userInfo;
        old.pop();
        this.setState({
            userInfo:old
        })
    }

    render() {
        const {userInfo}=this.state
        return (
            <div>
                <ul>
                    {userInfo.map((user,index)=>{
                        return <li key={index}>
                            <span>name: {user.name} </span>
                            <span>age: {user.age}  </span>
                            <span>sex: {user.sex}</span>
                            <ul>
                                {user.jobs.map((job,jobIndex)=>{
                                    return <li key={jobIndex}>{job}</li>
                                })}

                            </ul>
                        </li>
                    })}
                </ul>

                <button onClick={this.addUser}>添加数据</button>
                <button onClick={this.removeUser}>删除数据</button>
            </div>
        );
    }
}

export default KeyDemo