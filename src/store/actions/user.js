import axios from 'axios';
import {getRedirectPath} from '../../utils/getRedirectPath.js';
import Cookies from 'js-cookie';

export const getUser = dispatch => push => {
    dispatch({type: 'GET_USER_STAR', payload: {message: '获取用户模型开始'}});
    axios.get('/api/v1/user')
    .then(res=>{
        if(res.status === 200){
            const islogin = (res.data.code === 1)
            if(islogin){
                dispatch({type: 'GET_USER_SUCCESS', payload: res.data});
                const {gender, avatar} = res.data.data;
                if(!avatar){
                    push(getRedirectPath(gender, avatar));
                }
            }else{
                push('/login');
            }
        }
    })
    .catch(err=>{
        dispatch({type: 'GET_USER_ERROR', payload: err.response});
    })
}

export const login = dispatch => props => {
    dispatch({type: 'LOGIN_STAR', payload: {message: '登录开始'}});
    axios.post('/api/v1/login', {
        data: {
            account: props.account,
            password: props.password
        }
    })
    .then(res=>{
        if(res.status === 200){
            res.data.code === 1
            ? dispatch({type: 'LOGIN_SUCCESS', payload: res.data})
            : dispatch({type: 'LOGIN_ERROR', payload: res.data});
        }else{
            dispatch({type: 'LOGIN_ERROR', payload: {mesage: "服务端正忙, 请稍后再试"}});   
        }
    })
    .catch(err=>{
        dispatch({type: 'LOGIN_ERROR', payload: {mesage: err.response}});
    })
}

export const register = dispatch => props => {

    const errorMsg = msg => {
        return {type: 'REGISTER_ERROR', message: msg}
    }

    if(!props.account || !props.password || !props.gender){
        dispatch(errorMsg('请填写完整'));
        return 
    }
    if(props.password !== props.repeatPassword){
        dispatch(errorMsg('密码和确认密码不同'));
        return 
    }

    dispatch({type: 'REGISTER_STAR', payload: {message: '注册开始'}});
    axios.post('/api/v1/register', {
        data: {
            account: props.account,
            password: props.password,
            gender: props.gender
        }
    })
    .then(res=>{
        if(res.status === 200) {
            res.data.code === 1
            ? dispatch({type: 'REGISTER_SUCCESS', payload: res.data})
            : dispatch({type: 'REGISTER_ERROR', payload: res.data})
        }
    })
    .catch(err=>{
        dispatch(errorMsg(err.response.data.message));
    })
}

export const updateUser = dispatch => props => {
    dispatch({type: 'UPDATE_USER_STAR', payload: {mesage: '更新用户资料开始'}});
    axios.post(`/api/v1/user/update`, props)
    .then(res=>{
        if( res.status === 200 && res.data.code === 1){
            dispatch({type: 'UPDATE_USER_SUCCESS', payload: res.data});
        }
    })
    .catch(err=>{
        dispatch({type: 'UPDATE_USER_SUCCESS', payload: err.response});
    })
}

export const logout = dispatch => push => {
    dispatch({type: 'LOGOUT_SUCCESS'});
    Cookies.remove('userid');
    window.location.reload();
}