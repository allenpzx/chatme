import axios from "axios";

const getGentleman = dispatch => {
    dispatch({type: 'GET_GENTLEMAN_START', payload: {}})
    axios.get('/api/v1/user/list?gender=male')
    .then(res=>{
        dispatch({type: 'GET_GENTLEMAN_SUCCESS', payload: res.data});
    })
    .catch(err=>{
        dispatch({type: 'GET_GENTLEMAN_ERROR', payload: err});
    })
}

export default getGentleman