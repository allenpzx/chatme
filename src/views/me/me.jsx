import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { WhiteSpace } from 'antd-mobile';
import PersonalInfo from './personal-info.jsx';

class Me extends React.Component {
  render() {
    return (
      <React.Fragment>
        <PersonalInfo />
      </React.Fragment>
    );
  }
}

export default withRouter(connect(
  state => ({
    user: state.user
  }),
)(Me))