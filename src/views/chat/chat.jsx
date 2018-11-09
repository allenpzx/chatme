import React from 'react';
import { connect } from 'react-redux';
import { NavBar, List, InputItem, Icon, Grid } from 'antd-mobile';
import { getMessage, sendMessage, listenMessage } from '../../store/actions/chat.js';
import './chat.css';

const emoji = `😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾 `.split(' ').filter(v => v).map(x => ({ text: x }))
@connect(
    state => ({
        user: state.user,
        chat: state.chat
    }),
    dispatch => ({
        getMessage: () => dispatch(getMessage()),
        sendMessage: props => sendMessage(dispatch)(props),
        listenMessage: () => listenMessage(dispatch)
    })
)

class Chat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            input: '',
            message: [],
            showEmoji: false
        }
    }

    componentDidMount() {
        this.props.getMessage();
        this.props.listenMessage();
    }

    fixCarousel = () => {
        // 解决ant-mobile Grid表情初始化显示的问题
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 0);
    }

    handleSubmit = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.target;
        const message = this.state.input;
        this.props.sendMessage({ from, to, message });
        this.setState({ input: '' })
    }

    render() {

        const target_user_id = this.props.match.params.target;
        const chat_users = this.props.chat.users;
        const target = chat_users.find(x => (x._id === target_user_id));
        const user = this.props.user;
        const chat_id = [user._id, target_user_id].sort().join('_');
        const chat_message = this.props.chat.chatMessage.filter(x => x.chatid === chat_id)

        return (
            <div id='chat-container'>

                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >
                    {target && target.name}
                </NavBar>

                {chat_message.map(x => {
                    return x.from === target_user_id
                        ? (
                            <List key={x._id}>
                                <List.Item
                                    thumb={target && <img src={target.avatar} alt='chat_avatar' />}
                                >{x.content}</List.Item>
                            </List>
                        )
                        : (
                            <List key={x._id}>
                                <List.Item
                                    className='message-me'
                                    extra={user && <img src={user.avatar} alt='user_avatar' />}
                                >
                                    {x.content}
                                </List.Item>
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
                            onChange={v => this.setState({ input: v })}
                            extra={
                                <div>
                                    <span
                                        style={{
                                            padding: '10px',
                                            boxSizing: 'border-box'
                                        }}
                                        onClick={()=>{
                                            this.setState({showEmoji: !this.state.showEmoji})
                                            this.fixCarousel();
                                     }}
                                    >😆</span>
                                    <span onClick={this.handleSubmit}>发送</span>
                                </div>
                            }
                        >
                        </InputItem>
                    </List>
                    {
                        this.state.showEmoji
                            ? <Grid
                                data={emoji}
                                columnNum={9}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={el=>{
                                    this.setState({input: this.state.input + ' ' + el.text})
                                }}
                            />
                            : null
                    }
                </div>
            </div>
        )
    }
}

export default Chat