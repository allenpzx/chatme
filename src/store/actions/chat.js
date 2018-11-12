import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

export const getMessage = (target_user_id) => (dispatch, getState) => {
    dispatch({type: "GET_MESSAGE_START", payload: {}});
    axios.get('/api/v1/user/message-list')
    .then(res=>{
        if(res.status === 200 && res.data.code === 1){
            dispatch({type: "GET_MESSAGE_SUCCESS", payload: res.data.data});
            target_user_id && dispatch(readMessage(target_user_id));
        }else{
            dispatch({type: 'GET_MESSAGE_ERROR', payload: res.data.message});
        }
    })
    .catch(err=>{
        dispatch({type: 'GET_MESSAGE_ERROR', payload: err});
    })
}

export const sendMessage = dispatch => props => {
    const { from, to, message } = props;
    console.log(props)
    dispatch({type: 'SEND_MESSAGE_START'});
    socket.emit('send-msg-client', { from, to, message });
    dispatch({type: 'SEND_MESSAGE_SUCCESS'});
    console.log('send')
}

export const listenMessage = () => (dispatch, getState) => {
    socket.on('send-msg-server', data => {
        const userid = getState().user._id;
        dispatch({type: 'LISTEN_MESSAGE', payload: {data, userid}});
        console.log('listen')
    })
}

export const readMessage = target_user_id => (dispatch, getState) => {
    dispatch({type: 'READE_MESSAGE_START'})
    axios.post('/api/v1/user/read-message', {
        target_user_id,
    })
    .then(res=>{
        if(res.status === 200 && res.data.code === 1){
            dispatch({type: 'READE_MESSAGE_SUCCESS', payload: {read: res.data.read, target_user_id: res.data.target_user_id, userid: res.data.userid}})
        }
    })
    .catch(err=>{
        dispatch({type: 'READE_MESSAGE_START', payload: err.response});
    })
}