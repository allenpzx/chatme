import axios from "axios";

const getLadies = dispatch => {
    dispatch({type: 'GET_LADIES_START', payload: {}})
    axios.get(`/api/v1/user/list?gender=female`)
    .then(res=>{
        dispatch({type: 'GET_LADIES_SUCCESS', payload: res.data});
    })
    .catch(err=>{
        dispatch({type: 'GET_LADIES_ERROR', payload: err});
    })
}

export default getLadies