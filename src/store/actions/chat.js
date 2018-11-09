import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

export const getMessage = () => (dispatch, getState) => {
    dispatch({type: "GET_MESSAGE_START", payload: {}});
    axios.get('/api/v1/user/message-list')
    .then(res=>{
        console.log(res)
        if(res.status === 200 && res.data.code === 1){
            dispatch({type: "GET_MESSAGE_SUCCESS", payload: res.data.data});
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
    dispatch({type: 'SEND_MESSAGE_START'});
    socket.emit('send-msg-client', { from, to, message });
    dispatch({type: 'SEND_MESSAGE_SUCCESS'});
}

export const listenMessage = () => (dispatch, getState) => {
    socket.on('send-msg-server', data => {
        console.log('socket listen', data)
        const userid = getState().user._id;
        dispatch({type: 'LISTEN_MESSAGE', payload: {data, userid}});
    })
}