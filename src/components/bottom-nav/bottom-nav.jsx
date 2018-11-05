import React from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';

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
      <TabBar tabBarPosition={'bottom'}>
        {data.map(x => (
          <TabBar.Item
            key={x.title}
            title={x.text}
            icon={{ uri: require(`./icon/${x.icon}.svg`) }}
            selectedIcon={{ uri: require(`./icon/${x.selectedIcon}.svg`) }}
            selected={x.path === pathname}
            onPress={()=>push(x.path)}
          />
        ))}
      </TabBar>
    );
  }
}

BottomNav.propTypes = {
  data: PropTypes.array.isRequired
}

export default BottomNav