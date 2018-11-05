import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from "react-router-dom";
import { register } from '../../store/actions/user.js';
import { Button } from 'antd-mobile';
import LoginFrom from '../../components/login/index.jsx';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            repeatPassword: '',
            gender: 'male',
            inputError: null
        }
    }

    handleAccount = (e) => this.setState({ account: e.target.value });

    handlePassword = (e) => this.setState({ password: e.target.value });

    handleRepeatPassword = (e) => this.setState({ repeatPassword: e.target.value });

    handleGender = (e) => {
        e.preventDefault();
        const v = e.target.dataset.value;
        this.setState({ gender: v});
    }

    handleRegister = (e) => {
        const list = {
            account: '用户名',
            password: '密码',
            repeatPassword: '确认密码',
            gender: '性别'
        }
        let obj = {};
        for(let [k,v] of Object.entries(this.state)){
            if(k === 'inputError')continue
            obj[k]=v;
            if(!(v && v.replace(/\s+/g,"") !== '')){ 
                this.setState({inputError: `${list[k]}请正确填写`});
                return 
            }
        }
        if(this.state.password !== this.state.repeatPassword){
            this.setState({inputError: '密码和确认密码请保持一致'})
            return 
        }
        this.setState({inputError: null});
        this.props.register(obj);
    }

    render() {
        const user = this.props.user || null;
        return (
            <LoginFrom>
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
                            onChange={this.handleAccount}
                            value={this.state.account}
                            id='register-account'
                            type="text"
                        />
                    </label>
                    <label htmlFor="register-password">
                        <span>密码: </span>
                        <input 
                            onChange={this.handlePassword}
                            value={this.state.password} 
                            id='register-password' 
                            type="password" 
                        />
                    </label>
                    <label htmlFor="repeat-password">
                        <span>确认密码: </span>
                        <input 
                            onChange={this.handleRepeatPassword}
                            value={this.state.repeatPassword} 
                            id='repeat-password' 
                            type="password" 
                        />
                    </label>

                    <div className='radio-group'>
                        <div className='radio-title'>请选择性别</div>
                        <div className='radio-item' data-ischeck={this.state.gender === 'male'} data-value='male' onClick={(e)=>this.handleGender(e)}>男</div>
                        <div className='radio-item' data-ischeck={this.state.gender === 'female'} data-value='female' onClick={(e)=>this.handleGender(e)}>女</div>
                    </div>

                    {this.state.inputError && <div className='inputError'>{this.state.inputError}</div>}
                    {   user && user.message
                        ? <div className='registerError'>{user.message}</div>
                        : null
                    }
                    <Button onClick={this.handleRegister} className='login-submit' type="primary">注册</Button>

                    <div onClick={() => this.props.history.push('/login')} className='form-bottom'>
                        <div>登录</div>
                    </div>
                </div>
            </LoginFrom>
        );
    }
};


export default withRouter(connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        register: (props) => {
            register(dispatch)(props);
        }
    })
)(Register))