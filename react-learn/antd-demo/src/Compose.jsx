import React from "react";
export default class Compose extends React.Component{
    render() {
        return (
            <div>
                组合：{this.props.children}
            </div>
        );
    }
}