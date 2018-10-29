import React from 'react';
import {connect} from 'react-redux';
import { register } from '../../store/actions/Auth.js';
import { Button } from 'antd-mobile';
import From from '../login/login.jsx';

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            account: '',
            password: '',
            repeatPassword: ''
        }
    }

    handleAccount = (e) => this.setState({account: e.target.value});

    handlePassword = (e) => this.setState({password: e.target.value});

    handleRepeatPassword = (e) => this.setState({repeatPassword: e.target.value});

    handleRegister = (e) => this.props.register(this.state);

    render() {
        return (
            <From>
                <div className='login-title'><h1>注册</h1></div>
                <form className="login-form" action="/main">
                    <label htmlFor="register-account">
                        <span>账号: </span>
                        <input 
                            onChange={this.handleAccount}
                            value={this.state.account}
                            id='register-account' 
                            type="text" 
                        />
                    </label>
                    <label htmlFor="register-password">
                        <span>密码: </span>
                        <input id='register-password' type="text" />
                    </label>
                    <label htmlFor="repeat-password">
                        <span>确认密码: </span>
                        <input id='repeat-password' type="text" />
                    </label>
                    <div className='error-message'></div>

                    <div className='login-error'></div>

                    <Button id='login-submit'  type="primary">登录</Button>

                    <div onClick={this.handleRegister} className='form-bottom'>
                        <button>登录</button>
                    </div>
                </form>
            </From>
        );
    }
};


export default connect(
    state=>({
        user: state.Auth
    }),
    dispatch=>({
        register: (props)=>{
            register(props);
        }
    })
)(Register)