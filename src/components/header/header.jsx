import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {withRouter} from 'react-router-dom';

class Header extends React.Component {
    render() {
        const path = this.props.location.pathname;
        const list = {
            '/index/home': '首页',
            '/index/message': '消息',
            '/index/mine': '我的'
        }
        return (
            <React.Fragment>
                <NavBar
                    mode="light"
                    // icon={<Icon type="left" />}
                    // onLeftClick={() => console.log('onLeftClick')}
                    style={{fontSize: '12px'}}
                >{list[path]}</NavBar>
            </React.Fragment>
        )
    }
}

export default withRouter(Header)