import React from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { List, WhiteSpace, Result, Modal } from 'antd-mobile';
import {logout} from '../../store/actions/user.js';
import Cookies from 'js-cookie';

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
                    <List.Item onClick={() => this.props.logout(this.props.history.replace)}>
                        退出
                    </List.Item>
                </List>
                <WhiteSpace size='lg' />
            </React.Fragment>
        )
    }
}

export default withRouter(connect(
    state => ({
        user: state.user
    }),
    dispatch=>({
        logout: push => {
            Modal.alert('注销', '确定退出登录吗???', [
                { text: '取消', onPress: () => {} },
                { text: '确定', onPress: () => logout(dispatch)(push) },
            ])
        }
    })
)(Options))