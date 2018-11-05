import React from 'react';
import BottomNav from '../../components/bottom-nav/bottom-nav.jsx';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { Me } from '../me/me.jsx';

class DashBoard extends React.Component {

    render() {
        const {pathname} = this.props.location;
        const user = this.props.user;
        const navList = [
          {
            path: '/message',
            title: '消息列表',
            text:'消息',
            icon: 'message',
            selectedIcon: '_message',
            badge: null,
            selected: 'message',
          },
          {
            path: '/ladies',
            title: 'ladies',
            text: '发现',
            icon: 'list',
            selectedIcon: '_list',
            badge: null,
            selected: 'square',
            hidden: user.gender === 'female'
          },
          {
            path: '/gentleman',
            title: 'gentleman',
            text: '发现',
            icon: 'list',
            selectedIcon: '_list',
            badge: null,
            selected: 'square',
            hidden: user.gender === 'male'
          },
          {
            path: '/me',
            title: '个人中心',
            text: '我',
            icon: 'me',
            selectedIcon: '_me',
            badge: 'me',
            selected: 'me',
          },
        ]

        return (
            <div className='dashboard'>
                <NavBar mode='light'>{navList.find(x=>x.path===pathname).title}</NavBar>
                    <Route path='/me' component={Me} />
                <BottomNav {...this.props} data={navList} />
            </div>
        )
    }
}

export default withRouter(connect(
    state=>({
        user: state.user
    })
)(DashBoard))