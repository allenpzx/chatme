import React from 'react';
import {connect} from 'react-redux';
import { withRouter, Route} from 'react-router-dom'

class Mine extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="mine">
        <h3>Mine</h3> 
      </div>
    );
  }
}

export default withRouter(connect(
  state=>({
    user: state.user
  }),
  dispatch=>({

  })
)(Mine))