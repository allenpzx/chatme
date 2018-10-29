import axios from 'axios';

export const getUser = dispatch => {
    dispatch({type: 'GET_USER_STAR'});
    axios.get('/api/all-user')
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
    dispatch({type: 'REGISTER_STAR'});
    axios.post('/api/v1/register', {
        data: {
            account: props.account,
            password: props.password
        }
    })
    .then(res=>{
        dispatch({type: 'REGISTER_SUCCESS', payload: res});
    })
    .catch(err=>{
        dispatch({type: 'REGISTER_ERROR', payload: err});
    })
}