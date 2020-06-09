import React from 'react';
import Home from "./pages/Home";
import Mine from "./pages/Mine";
import UCenter from "./pages/UCenter";
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";
import Nav from "./components/Nav";
import NotFound from "./pages/NotFound";
import Demo from "./pages/Demo";
// import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

/**
 * HashRouter：锚点链接使用#链接
 * BrowserRouter：使用的h5的新特性/history.push()方法，如果上线之后，需要后台做重定向处理，否认会出现404bug
 *
 */

/**
 * 路由简单实现
 * @returns {*}
 * @constructor
 */

/**
 * /mine/ucenter 包含了 /mine 使用exact实行精准匹配 strict严格匹配（匹配/mine不匹配/mine/）
 * switch只渲染一个页面
 *
 */
function App() {
    return (
        <div className="App">
            <Router>
                <Nav/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route strict exact={true} path="/mine" component={Mine}/>
                    <Route path="/mine/ucenter" component={UCenter}></Route>
                    {/*<Route path="/demo" render={() => <div>this is demo page</div>}></Route>*/}
                    <Route path="/demo" render={(props) => <Demo {...props} name="你好"/>}/>
                    <Route error component={NotFound}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
