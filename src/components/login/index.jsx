import React from 'react'
import './index.css';
export default class loginForm extends React.Component {
    render(){return <div className="login">{this.props.children}</div>}
}