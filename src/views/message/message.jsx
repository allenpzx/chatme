import React from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

@connect(
  state=>({
    user: state.user,
    chat: state.chat
  })
)
class Message extends React.Component {
  render() {
    const users = this.props.chat.users;
    const userid = this.props.user._id;
    const messageGroup = {};
    this.props.chat.chatMessage.map(x=>{
      messageGroup[x.chatid] = messageGroup[x.chatid] || [];
      messageGroup[x.chatid].push(x);
    });
    const chatList = Object.values(messageGroup).sort((a, b)=>{
      return b[b.length-1].create_time - a[a.length-1].create_time
    });
    
    return (
      <div className="message-container">
        <List>
          {chatList.map(x=>{
            const lastItem = x[x.length-1];
            const targetId = lastItem.from === userid ? lastItem.to : lastItem.from ;
            const target = users.find(x=>{
              if(x._id === targetId){
                return true
              }
            });
            const unreadNum = x.filter(v=>!v.read&&v.to===userid).length;

            return (
              <List.Item 
                extra={<Badge text={unreadNum}></Badge>}
                thumb={target.avatar?<img src={target.avatar} alt={'chat_avatar'} />:null}
                key={x[x.length-1]._id}
                arrow='horizontal'
                onClick={()=>this.props.history.push(`/chat/${targetId}`)}
              >
                {x[x.length-1].content}
                <List.Item.Brief>
                    {target.name}
                </List.Item.Brief>
              </List.Item>
            )
          })}
        </List>
      </div>
    );
  }
}
export default Message