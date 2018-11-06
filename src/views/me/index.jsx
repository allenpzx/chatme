import React from 'react';
import { connect } from 'react-redux';
import { List, Button, WhiteSpace, Result, Icon, } from 'antd-mobile';

class Options extends React.Component {

    render() {
        const user = this.props.user;
        return (
            <React.Fragment>
                <Result
                    img={user.avatar ? <img style={{ width: '100%', height: '100%' }} src={user.avatar} /> : null}
                    title={user.account}
                    message={<div>{user.description}</div>}
                />
                <WhiteSpace size='lg'/>
                <List>
                    <List.Item arrow="horizontal" multipleLine onClick={() => this.props.history.push('/me/info')}>
                        个人资料
                    </List.Item>
                    <List.Item arrow="horizontal" multipleLine onClick={() => this.props.history.push('/me/settings')}>
                        设置
                    </List.Item>
                </List>
                <WhiteSpace size='lg' />
                <List>
                    <List.Item onClick={() => this.props.logout()}>
                        退出
                    </List.Item>
                </List>
                <WhiteSpace size='lg' />
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    dispatch=>({
        logout: () => {
            console.log('logout')
        }
    })
)(Options)