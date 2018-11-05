import React from 'react';
import BottomNav from '../../components/bottom-nav/bottom-nav.jsx';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar, Icon } from 'antd-mobile';
import Message from '../message/message.jsx';
import Ladies from '../ladies/ladies.jsx';
import Gentleman from '../gentleman/gentleman.jsx'
import Me from '../me/me.jsx';
// import './dashboard.css';
class DashBoard extends React.Component {

  render() {
    const { pathname } = this.props.location;
    const user = this.props.user;
    const navList = [
      {
        path: '/msg',
        title: '消息列表',
        text: '消息',
        icon: 'message',
        selectedIcon: '_message',
        component: Message
      },
      {
        path: '/ladies',
        title: 'ladies',
        text: '发现',
        icon: 'list',
        selectedIcon: '_list',
        hidden: user.gender === 'female',
        component: Ladies
      },
      {
        path: '/gentleman',
        title: 'gentleman',
        text: '发现',
        icon: 'list',
        selectedIcon: '_list',
        hidden: user.gender === 'male',
        component: Gentleman
      },
      {
        path: '/me',
        title: '个人中心',
        text: '我',
        icon: 'me',
        selectedIcon: '_me',
        component: Me
      },
    ]

    return (
      <div className='dashboard' style={{
        height: '100vh',
        width: '100vw',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'scroll'
      }}>
        <NavBar
          icon={this.props.history.length > 0 ? <Icon type="left" /> : null}
          onLeftClick={() => this.props.history.goBack()}
          mode='light'
        >
          {navList.find(x => x.path === pathname) ? navList.find(x => x.path === pathname).title : null}
        </NavBar>
        <Switch>
          {navList.map(x => (
            <Route key={x.path} path={x.path} component={x.component} />
          ))}
        </Switch>
        <BottomNav {...this.props} data={navList} />
      </div>
    )
  }
}

export default withRouter(connect(
  state => ({
    user: state.user
  })
)(DashBoard))