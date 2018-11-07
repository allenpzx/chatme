import axios from 'axios';

export const getMessage = dispatch => {
    dispatch({type: "GET_MESSAGE_START", payload: {}});
    axios.get('/api/v1/user/message-list')
    .then(res=>{
        if(res.state === 200 && res.date.code === 1){
            dispatch({type: "GET_MESSAGE_SUCCESS", payload: res.data.data});
        }else{
            dispatch({type: 'GET_MESSAGE_ERROR', payload: res.data.message});
        }
    })
    .catch(err=>{
        dispatch({type: 'GET_MESSAGE_ERROR', payload: err});
    })
}

export const sendMessage = dispatch => socket => props => {
    const { from, to, message } = props;
    dispatch({type: 'SEND_MESSAGE_START'});
    socket.emit('send-msg-client', { from, to, message });
    dispatch({type: 'SEND_MESSAGE_SUCCESS'});
}

export const listenMessage = dispatch => socket => {
    socket.on('send-msg-server', data => {
        console.log('socket listen', data)
        dispatch({type: 'LISTEN_MESSAGE', payload: data});
    })
}