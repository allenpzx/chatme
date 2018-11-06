import React from 'react';
import BottomNav from '../../components/bottom-nav/bottom-nav.jsx';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar, Icon } from 'antd-mobile';
import Message from '../message/message.jsx';
import MatchList from '../match-list/match-list.jsx'
import Me from '../me/me.jsx';
class DashBoard extends React.Component {

  render() {
    const { pathname } = this.props.location;
    // const user = this.props.user;
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
        path: '/match-list',
        title: '有趣的朋友',
        text: '发现',
        icon: 'list',
        selectedIcon: '_list',
        component: MatchList
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
      <div className='dashboard'>
        <NavBar
          icon={this.props.history.length > 0 ? <Icon type="left" /> : null}
          onLeftClick={() => this.props.history.goBack()}
          mode={'light'}
        >
          {navList.find(x => pathname.includes(x.path)) ? navList.find(x => pathname.includes(x.path)).title : null}
        </NavBar>
        {/* <Switch>
          {navList.map(x => (
            <Route key={x.path} path={x.path} component={x.component} />
          ))}
          <Redirect to='/match-list'/>
        </Switch> */}
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