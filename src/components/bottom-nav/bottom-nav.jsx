import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './bottom-nav.css';

export default class BottomNav extends Component {
    render() {
        return (
            <div className="bottom-nav">
                <NavLink to='/home'>
                    <div className='bottom-nav-item'>
                        <img src={require('./images/all.svg')} alt="bottom-nav-item" />
                        <span>所有</span>
                    </div>
                </NavLink>
                <NavLink to='/message'>
                    <div className='bottom-nav-item'>
                        <img src={require('./images/message.svg')} alt="bottom-nav-item" />
                        <span>消息</span>
                    </div>
                </NavLink>
                <NavLink to='mine'>
                    <div className='bottom-nav-item'>
                        <img src={require('./images/mine.svg')} alt="bottom-nav-item" />
                        <span>我的</span>
                    </div>
                </NavLink>
            </div>
        );
    }
};
