import axios from "axios";

const getMatchList = dispatch => {
    dispatch({type: 'GET_MATCH_LIST_START', payload: {}})
    axios.get(`/api/v1/user/match-list`)
    .then(res=>{
        dispatch({type: 'GET_MATCH_LIST_SUCCESS', payload: res.data});
    })
    .catch(err=>{
        dispatch({type: 'GET_MATCH_LIST_ERROR', payload: err});
    })
}

export default getMatchList