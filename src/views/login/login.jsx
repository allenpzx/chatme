import React, { Component } from 'react';
import './login.css';

export default class Login extends Component {

    static getDerivedStateFromProps(props, state){
        console.log(props, state);
    }

    getSnapshotBeforeUpdate(props, state){
        console.log(props, state);
    }

    render() {
        return (
            <div className="login">
                {/* <div><img src={require('')} alt=""/></div> */}
                <form action="">
                    <label htmlFor="name">
                        <input id='name' type="text"/>
                    </label>
                    <label htmlFor="password">
                        <input id='password' type="text"/>
                    </label>
                </form>
            </div>
        );
    }
};
