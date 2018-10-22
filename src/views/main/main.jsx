import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './main.css';
import BottomNav from '../../components/bottom-nav/bottom-nav.jsx';
import Home from '../home/home.jsx';
import Message from '../message/message.jsx';
import Mine from '../mine/mine.jsx';

export default class Main extends React.Component {
  render() {
    return (
      <div className="Main">
        <Switch>
            <Route exact path='/home' component={Home} />
            <Route path='/message' component={Message} />
            <Route path='/mine' component={Mine} />
        </Switch>
        <BottomNav {...this.props}/>
      </div>
    );
  }
}
