import axios from 'axios';

export const getUser = dispatch => {
    dispatch({type: 'GET_USER_STAR'});
    axios.get('/api/v1/user')
    .then(res=>{
        dispatch({type: 'GET_USER_SUCCESS', payload: res});
    })
    .catch(err=>{
        dispatch({type: 'GET_USER_ERROR', payload: err});
    })
}

export const login = dispatch => props => {
    dispatch({type: 'LOGIN_STAR'});
    axios.post('/api/v1/login', {
        data: {
            account: props.account,
            password: props.password
        }
    })
    .then(res=>{
        dispatch({type: 'LOGIN_SUCCESS', payload: res});
    })
    .catch(err=>{
        dispatch({type: 'LOGIN_ERROR', payload: err});
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
        res.status === 200 && res.data.code === 1
        ? dispatch({type: 'REGISTER_SUCCESS', payload: res})
        : dispatch(errorMsg(res.data.message));
    })
    .catch(err=>{
        dispatch({type: 'REGISTER_ERROR', payload: {message: err}});
    })
}