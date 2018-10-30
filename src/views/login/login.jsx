import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { login } from '../../store/actions/Auth.js';
import './login.css';
import { Button } from 'antd-mobile';
import LoginForm from '../../components/login/index.jsx';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            account: '',
            password: ''
        }
    }

    handleAccount = (e) => {
        this.setState({account: e.target.value});
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <LoginForm>
                <div className='login-title'><h1>登录</h1></div>
                <form id="login-form" action="/main">
                    <label htmlFor="account">
                        <span>账号: </span>
                        <input 
                            onChange={this.handleAccount}
                            value={this.state.account}
                            id='account' 
                            type="text" 
                        />
                    </label>
                    <label htmlFor="password">
                        <span>密码: </span>
                        <input id='password' type="text" />
                    </label>
                    <div className='error-message'></div>

                    <div className='login-error'></div>

                    <Button id='login-submit' type="primary">登录</Button>

                    <div className='form-bottom'>
                        <button onClick={()=>this.props.history.push('/register')}>注册</button>
                    </div>
                </form>
            </LoginForm>
        );
    }
};


export default withRouter(connect(
    state=>({
        user: state.Auth
    }),
    dispatch=>({
        login: (props)=>{
            login(props);
        }
    })
)(Login))