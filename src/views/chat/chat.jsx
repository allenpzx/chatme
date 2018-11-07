import React from 'react';
import {connect} from 'react-redux';
import {List, InputItem} from 'antd-mobile';
import { getMessage, sendMessage, listenMessage } from '../../store/actions/chat.js';

import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

@connect(
    state=>({
        user: state.user,
        chat: state.chat
    }),
    dispatch=>({
        getMessage: ()=>getMessage(dispatch),
        sendMessage: props=>sendMessage(dispatch)(socket)(props),
        listenMessage: ()=>listenMessage(dispatch)(socket)
    })
)

class Chat extends React.Component {

    constructor(props){
        super(props)
        this.state={
            input: '',
            message: []
        }
    }

    componentDidMount(){
        this.props.getMessage();
        this.props.listenMessage();
    }

    handleSubmit = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.target;
        const message = this.state.input;
        this.props.sendMessage({from, to, message});
        this.setState({input: ''})
    }

    render(){
        console.log(this.props)
        return (
            <div className='chat-container'>
                {this.props.chat.chatMessage.map(x=>{
                    return <p key={x._id}>{x.content}</p>
                })}

                <div className="stick-footer" style={{
                    position: 'fixed',
                    width: '100%',
                    bottom: 0
                }}>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.input}
                            onChange={v=>this.setState({input: v})}
                            extra={<span onClick={this.handleSubmit}>发送</span>}
                        >
                        </InputItem>    
                    </List> 
                </div>
            </div>
        )
    }
}

export default Chat