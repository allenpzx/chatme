import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import './bottom-nav.css';
class BottomNav extends Component {

    render() {
        const pn = this.props.location && this.props.location.pathname ? this.props.location.pathname : null;
        const isHome = pn && (pn.includes('/index/home') || /^\/$/.test(pn));
        const isMessage = pn && pn.includes('/index/message');
        const isMine = pn && pn.includes('/index/mine');
        return (
            <div className="bottom-nav">
                <NavLink to='/index/home'>
                    <div className='bottom-nav-item'>
                        <img src={isHome?require('./images/_all.svg'):require('./images/all.svg')} alt="bottom-nav-item" />
                        <span>所有</span>
                    </div>
                </NavLink>
                <NavLink to='/index/message'>
                    <div className='bottom-nav-item'>
                        <img src={isMessage?require('./images/_message.svg'):require('./images/message.svg')} alt="bottom-nav-item" />
                        <span>消息</span>
                    </div>
                </NavLink>
                <NavLink to='/index/mine'>
                    <div className='bottom-nav-item'>
                        <img src={isMine?require('./images/_mine.svg'):require('./images/mine.svg')} alt="bottom-nav-item" />
                        <span>我的</span>
                    </div>
                </NavLink>
            </div>
        );
    }
};

export default withRouter(BottomNav);