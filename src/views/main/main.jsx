import React from 'react';
import { Route } from 'react-router-dom';
import './main.css';
import BottomNav from '../../components/bottom-nav/bottom-nav.jsx';
import Home from '../home/home.jsx';
import Message from '../message/message.jsx';
import Mine from '../mine/mine.jsx';

export default class Main extends React.Component {
  render() {
    return (
      <div className="Main">
        <Route path='/home' component={Home} />
        <Route path='/message' component={Message} />
        <Route path='/mine' component={Mine} />
        <BottomNav {...this.props}/>
      </div>
    );
  }
}
