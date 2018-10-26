import fetcher from '../../utils/axios.js';

export const getUser = dispatch => {
    dispatch({type: 'GET_USER_STAR'});
    fetcher.get('/all-user')
    .then(res=>{
        dispatch({type: 'GET_USER_SUCCESS', payload: res});
    })
    .catch(err=>{
        dispatch({type: 'GET_USER_ERROR', payload: err});
    })
}