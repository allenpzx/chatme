import React from 'react';
import { Redirect } from 'react-router-dom';
import { List, InputItem, Toast, Button, WhiteSpace } from 'antd-mobile';
import AuthForm from '../../components/auth-form/auth-form.js';

@AuthForm
class Login extends React.Component {

    render() {
        const user = this.props.user || null;
        return (
            <React.Fragment>
                {user && user.redirectTo ? <Redirect to={user.redirectTo} /> : null}
                <div className='login-title'><h1>登录</h1></div>
                {/* <form className="login-form" action="/main">
                    <label htmlFor="account">
                        <span>账号: </span>
                        <input
                            onChange={v=>this.props.handleChange('account', v.target.value)}
                            value={this.props.state.account}
                            id='account'
                            type="text"
                        />
                    </label>
                    <label htmlFor="password">
                        <span>密码: </span>
                        <input
                            onChange={v=>this.props.handleChange('password', v.target.value)}
                            value={this.props.state.password}
                            id='password'
                            type="text"
                        />
                    </label>
                    {user && user.message ? <div className='registerError'>{user.message}</div> : null}
                    <Button onClick={this.props.handleLogin} className='login-submit' type="primary">登录</Button>
                    <div className='form-bottom'>
                        <div onClick={() => this.props.history.push('/register')}>注册</div>
                    </div>
                </form> */}
                <WhiteSpace size='lg' />
                <List>
                    <InputItem
                        // {...getFieldProps('phone')}
                        value={this.props.state.account}
                        onChange={v=>this.props.handleChange('account', v)}
                    >账号</InputItem>
                    <InputItem
                        // {...getFieldProps('password')}
                        value={this.props.state.password}
                        onChange={v=>this.props.handleChange('password', v)}
                        type="password"
                    >密码</InputItem>
                </List>
                <WhiteSpace size='lg' />

                {user && user.message ? <div className='registerError'>{user.message}</div> : null}
                <Button onClick={this.props.handleLogin} className='login-submit' type="primary">登录</Button>
                <div className='form-bottom'>
                    <div onClick={() => this.props.history.push('/register')}>注册</div>
                </div>
                <WhiteSpace />
                
            </React.Fragment>
        );
    }
};
export default Login;