import React from 'react';
import { List, Button, WhiteSpace } from 'antd-mobile';

class Options extends React.Component {

    render() {
        return (
            <React.Fragment>
                <List renderHeader={() => 'Subtitle'}>
                    <List.Item arrow="horizontal" multipleLine onClick={() => this.props.history.push('/me/info')}>
                        个人资料
                </List.Item>
                    <List.Item arrow="horizontal" multipleLine onClick={() => this.props.history.push('/me/settings')}>
                        设置
                </List.Item>
                </List>
                <WhiteSpace />
                <Button type="warning" style={{margin: '0 auto', width: '90%'}}>退出</Button>
                <WhiteSpace />
            </React.Fragment>
        )
    }
}

export default Options