import React from 'react';
import { Redirect } from "react-router-dom";
import { Button } from 'antd-mobile';
import AuthForm from '../../components/auth-form/auth-form.js';
class Register extends React.Component {
    componentDidMount(){
        this.props.handleChange('gender', 'male');
    }

    render() {
        const user = this.props.user || null;
        return (
            <React.Fragment>
                {
                    user && user.redirectTo 
                    ? <Redirect to={user.redirectTo} /> 
                    : null
                }
                <div className='login-title'><h1>注册</h1></div>
                <div className="login-form">
                    <label htmlFor="register-account">
                        <span>账号: </span>
                        <input
                            onChange={v=>this.props.handleChange('account', v.target.value)}
                            value={this.props.state.account}
                            id='register-account'
                            type="text"
                        />
                    </label>
                    <label htmlFor="register-password">
                        <span>密码: </span>
                        <input 
                            onChange={v=>this.props.handleChange('password', v.target.value)}
                            value={this.props.state.password} 
                            id='register-password' 
                            type="password" 
                        />
                    </label>
                    <label htmlFor="repeat-password">
                        <span>确认密码: </span>
                        <input 
                            onChange={v=>this.props.handleChange('repeatPassword', v.target.value)}
                            value={this.props.state.repeatPassword} 
                            id='repeat-password' 
                            type="password" 
                        />
                    </label>

                    <div className='radio-group'>
                        <div className='radio-title'>请选择性别</div>
                        <div className='radio-item' data-ischeck={this.props.state.gender === 'male'} data-value='male' onClick={(e)=>this.props.handleChange('gender', e.target.dataset.value)}>男</div>
                        <div className='radio-item' data-ischeck={this.props.state.gender === 'female'} data-value='female' onClick={(e)=>this.props.handleChange('gender', e.target.dataset.value)}>女</div>
                    </div>

                    {this.props.state.inputError && <div className='inputError'>{this.props.state.inputError}</div>}
                    {   user && user.message
                        ? <div className='registerError'>{user.message}</div>
                        : null
                    }
                    <Button onClick={this.props.handleRegister} className='login-submit' type="primary">注册</Button>

                    <div onClick={() => this.props.history.push('/login')} className='form-bottom'>
                        <div>登录</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

Register = AuthForm(Register);
export default Register;