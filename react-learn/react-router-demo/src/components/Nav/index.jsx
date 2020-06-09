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
            <ul>
                <li>
                    <NavLink exact to="/">Home页面</NavLink>
                </li>
                <li>
                    <NavLink exact to="/mine">Mine页面</NavLink>
                </li>
                <li>
                    <NavLink exact to="/mine/ucenter">我的页面</NavLink>
                </li>
                <li>
                    <NavLink exact to="/demo">demo</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Nav;