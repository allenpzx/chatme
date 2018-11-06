import React from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import './bottom-nav.css';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
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
      <div>
        <TabBar>
          {data.map(x => (
            <TabBar.Item
              key={x.path}
              title={x.text}
              icon={{ uri: require(`./icon/${x.icon}.svg`) }}
              selectedIcon={{ uri: require(`./icon/${x.selectedIcon}.svg`) }}
              selected={pathname.includes(x.path)}
              onPress={() => push(x.path)}
            >
              <Route path={x.path} component={x.component} />
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