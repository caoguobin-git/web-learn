import React from "react";
import PropTypes from 'prop-types';
export default class PropsTypeDemo extends React.Component{
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}
PropsTypeDemo.propTypes = {
    title: PropTypes.string.isRequired
};

PropsTypeDemo.defaultProps={
    title:'默认值'
}