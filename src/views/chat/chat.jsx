import React from 'react';
import {connect} from 'react-redux';
import {NavBar, List, InputItem} from 'antd-mobile';
import { getMessage, sendMessage, listenMessage } from '../../store/actions/chat.js';
import './chat.css';

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

        const target_user = this.props.match.params.target;

        const Opposite = props => <div style={{
            margin: '10px ',
            padding: '20px',
            textAlign: 'left'
        }}>对方发的: {props.children}</div>

        const Self = props => <div style={{
            margin: '10px ',
            padding: '20px',
            textAlign: 'right'
        }}>我发的: {props.children}</div>

        return (
            <div className='chat-container'>

                <NavBar mode='dark'>
                    {target_user}
                </NavBar>

                {/* {this.props.chat.chatMessage.map(x=>{
                    return x.from === target_user
                        ? <Opposite key={x._id}>{x.content}</Opposite>
                        : <Self key={x._id}>{x.content}</Self>
                })} */}
                {this.props.chat.chatMessage.map(x=>{
                    return x.from === target_user
                        ? (<List key={x._id}>
                             <List.Item>{x.content}</List.Item> 
                            </List>
                        )
                        :(
                            <List key={x._id}>
                             <List.Item className='message-me'>我发的： {x.content}</List.Item> 
                            </List>
                        );
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