import React from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { login } from '../../store/actions/user.js';
// import './login.css';
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

    handleLogin = () => {
        this.props.login(this.state);
    }

    render() {
        const user = this.props.user || null;
        return (
            <LoginForm>
                {
                    user && user.redirectTo 
                    ? <Redirect to={user.redirectTo} /> 
                    : null
                }
                <div className='login-title'><h1>登录</h1></div>
                <form className="login-form" action="/main">
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
                        <input 
                            onChange={this.handlePassword}
                            value={this.state.password}
                            id='password' 
                            type="text" 
                        />
                    </label>
                    {
                        user && user.message
                        ? <div className='registerError'>{user.message}</div>
                        : null
                    }
                    <Button onClick={this.handleLogin} className='login-submit' type="primary">登录</Button>

                    <div className='form-bottom'>
                        <div onClick={()=>this.props.history.push('/register')}>注册</div>
                    </div>
                </form>
            </LoginForm>
        );
    }
};


export default withRouter(connect(
    state=>({
        user: state.user
    }),
    dispatch=>({
        login: props=>login(dispatch)(props)
    })
)(Login))