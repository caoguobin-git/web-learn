import React from "react";
import {NavLink} from "react-router-dom";
import "./nav.css"

const Nav=()=>{

    const hello=()=>{
        setInterval(()=>{
            console.log(new Date().getTime())
        },10)
    }

    return(
        <div>
            <div>
                <span>
                    <NavLink exact to="/">Home页面</NavLink>
                </span>
                <span>
                    <NavLink exact to="/mine">Mine页面</NavLink>
                </span>
                <span>
                    <NavLink exact to="/mine/ucenter">我的页面</NavLink>
                </span>
                <span>
                    <NavLink exact to="/demo">demo</NavLink>
                </span>
            </div>
        </div>
    )
}

export default Nav;