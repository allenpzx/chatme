import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { Card, Picker, List, WhiteSpace } from 'antd-mobile';
import PersonalInfo from './personal-info.jsx';
class Mine extends React.Component {


  render() {
    const user = this.props.user || null;
    const path = this.props.location.pathname || null;
    return (
      <React.Fragment>
        <PersonalInfo />
        <WhiteSpace size="lg" />
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