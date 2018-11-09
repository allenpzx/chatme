import React from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import './bottom-nav.css';
class BottomNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'message',
      hidden: false,
      fullScreen: false,
    };
  }

  render() {
    const data = this.props.data.filter(x => !x.hidden);
    const { push } = this.props.history;
    const { pathname } = this.props.location;
    return (
      <div style={{position: 'fixed', width: '100%', bottom: 0}}>
        <TabBar>
          {data.map(x => (
            <TabBar.Item
              key={x.path}
              title={x.text}
              badge={x.path === '/msg' ? this.props.chat.unread : null}
              icon={{ uri: require(`./icon/${x.icon}.svg`) }}
              selectedIcon={{ uri: require(`./icon/${x.selectedIcon}.svg`) }}
              selected={pathname.includes(x.path)}
              onPress={() => push(x.path)}
            >
            </TabBar.Item>
          ))}
        </TabBar>
      </div>
    );
  }
}

BottomNav.propTypes = {
  data: PropTypes.array.isRequired
}

export default BottomNav