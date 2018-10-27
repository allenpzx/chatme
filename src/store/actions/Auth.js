import axios from 'axios';

export const getUser = dispatch => {
    dispatch({type: 'GET_USER_STAR'});
    axios.get('/api/all-user')
    .then(res=>{
        console.log('get user successed', res);
        dispatch({type: 'GET_USER_SUCCESS', payload: res});
    })
    .catch(err=>{
        console.log('get user error', err);
        dispatch({type: 'GET_USER_ERROR', payload: err});
    })
}