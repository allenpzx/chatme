import React from 'react';
import {connect} from 'react-redux';
import {List} from 'antd-mobile';

@connect(
  state=>({
    user: state.user,
    chat: state.chat
  })
)
class Message extends React.Component {
  render() {
    console.log(this.props)
    const users = this.props.chat.users;
    const userid = this.props.user._id;
    const messageGroup = {};
    this.props.chat.chatMessage.map(x=>{
      messageGroup[x.chatid] = messageGroup[x.chatid] || [];
      messageGroup[x.chatid].push(x);
    });
    const chatList = Object.values(messageGroup);
    return (
      <div className="message-container">
        <List>
          {chatList.map(x=>{
            // console.log(x);
            const lastItem = x[x.length-1];
            const targetId = lastItem.from === userid ? lastItem.to : lastItem.from ;
            const target = users.find(x=>{
              if(x._id === targetId){
                return true
              }
            });

            return (
              <List.Item 
                thumb={<img src={target.avatar} alt={'chat_avatar'} />}
                key={x[x.length-1]._id}
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