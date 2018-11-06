import React from 'react';
import {List, InputItem} from 'antd-mobile';

import io from 'socket.io-client';
const socket = io('ws://localhost:9093');
export default class Chat extends React.Component {

    constructor(props){
        super(props)
        this.state={
            text: ''
        }
    }

    handleSubmit = () => {
        socket.emit('sendmsg', {text: this.state.text});
        this.setState({text: ''});
    }

    render(){
        return (
            <div className='chat-container'>
                <h1>chat with user: {this.props.match.params.target}</h1>
                <div className="stick-footer" style={{
                    position: 'fixed',
                    width: '100%',
                    bottom: 0
                }}>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>this.setState({text: v})}
                            extra={<span onClick={this.handleSubmit}>发送</span>}
                        >
                        </InputItem>    
                    </List> 
                </div>
            </div>
        )
    }
}