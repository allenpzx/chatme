import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { register } from '../../store/actions/Auth.js';
import { Button, List, Radio, WhiteSpace } from 'antd-mobile';
import LoginFrom from '../../components/login/index.jsx';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            repeatPassword: '',
            gender: 'male'
        }
    }

    handleAccount = (e) => this.setState({ account: e.target.value });

    handlePassword = (e) => this.setState({ password: e.target.value });

    handleRepeatPassword = (e) => this.setState({ repeatPassword: e.target.value });

    handleRegister = (e) => {
        console.log(this.state);
    }

    handleGender = (e) => {
        e.preventDefault();
        const v = e.target.dataset.value;
        this.setState({ gender: v});
    }

    render() {
        return (
            <LoginFrom>
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
                        <input id='register-password' type="text" />
                    </label>
                    <label htmlFor="repeat-password">
                        <span>确认密码: </span>
                        <input id='repeat-password' type="text" />
                    </label>

                    <div className='radio-group'>
                        <div className='radio-title'>请选择性别</div>
                        <div className='radio-item' data-ischeck={this.state.gender === 'male'} data-value='male' onClick={(e)=>this.handleGender(e)}>男</div>
                        <div className='radio-item' data-ischeck={this.state.gender === 'female'} data-value='female' onClick={(e)=>this.handleGender(e)}>女</div>
                    </div>

                    <div className='error-message'></div>

                    <Button id='login-submit' type="primary">注册</Button>

                    <div onClick={() => this.props.history.push('/login')} className='form-bottom'>
                        <button>登录</button>
                    </div>
                </div>
            </LoginFrom>
        );
    }
};


export default withRouter(connect(
    state => ({
        user: state.Auth
    }),
    dispatch => ({
        register: (props) => {
            register(props);
        }
    })
)(Register))