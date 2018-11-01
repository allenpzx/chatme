import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { Card, Picker, List, WhiteSpace } from 'antd-mobile';
import BottomNav from "../../components/bottom-nav/bottom-nav.jsx";
import AvatarSelector from '../../components/avatar-selector/avatar-selectot.jsx';
class Mine extends React.Component {


  render() {
    const user = this.props.user || null;
    const path = this.props.location.pathname || null;
    return (
      <React.Fragment>

        <AvatarSelector />
        
        <WhiteSpace size="lg" />
        <Card full>
          <Card.Header
            title="This is title"
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            extra={<span>this is extra</span>}
          />
          <Card.Body>
            <div>This is content of `Card`</div>
          </Card.Body>
          <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
        </Card>
        <WhiteSpace size="lg" />

        <List className='' style={{}}>
          <List.Item arrow="horizontal">个人信息</List.Item>
          <List.Item arrow="horizontal">设置</List.Item>
        </List>

      </React.Fragment>
    );
  }
}

export default withRouter(connect(
  state => ({
    user: state.user
  }),
  dispatch => ({

  })
)(Mine))