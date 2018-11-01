import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import './main.css';
import BottomNav from '../../components/bottom-nav/bottom-nav.jsx';
import Home from '../home/home.jsx';
import Message from '../message/message.jsx';
import Mine from '../mine/mine.jsx';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { NavBar, Icon } from 'antd-mobile';
import Header from '../../components/header/header.jsx';
class Main extends React.Component {
  render() {
    return (
      <div className="Main">

        <Header />

        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="fade" timeout={300}>
            <Switch location={this.props.location}>
              <Route path='/index/home' component={Home} />
              <Route path='/index/message' component={Message} />
              <Route path='/index/mine' component={Mine} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <BottomNav {...this.props} />
      </div>
    );
  }
}
export default withRouter(Main);