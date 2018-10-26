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