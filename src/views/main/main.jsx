import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './main.css';
import BottomNav from '../../components/bottom-nav/bottom-nav.jsx';
import Home from '../home/home.jsx';
import Message from '../message/message.jsx';
import Mine from '../mine/mine.jsx';

import { TransitionGroup, CSSTransition } from "react-transition-group";
export default class Main extends React.Component {
  render() {
    return (
      <div className="Main">
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="fade" timeout={300}>
            <Switch location={this.props.location}>
              <Route exact path='/' component={Home} />
              <Route exact path='/home' component={Home} />
              <Route path='/message' component={Message} />
              <Route path='/mine' component={Mine} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <BottomNav {...this.props} />
      </div>
    );
  }
}
