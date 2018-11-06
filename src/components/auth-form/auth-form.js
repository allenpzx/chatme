import React from 'react';
import { connect } from 'react-redux';
import { register, login } from '../../store/actions/user.js';
import './auth-form.css';

export default function withAuthForm(Component){
    class WrapperComponent extends React.Component {
        constructor(props){
            super(props);
            this.state = {}
        }

        handleChange = (key, v) => this.setState({[key]: v});

        handleLogin = () => this.props.login(this.state);

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

        render(){
            return  <Component 
                        handleChange={this.handleChange} 
                        handleLogin={this.handleLogin}
                        handleRegister={this.handleRegister}
                        state={this.state} 
                        {...this.props} 
                    />
        }
    }
    return connect(
        state => ({
            user: state.user
        }),
        dispatch => ({
            register: props => register(dispatch)(props),
            login: props => login(dispatch)(props)
        })
    )(WrapperComponent)
}