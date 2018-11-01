import React from 'react';
import {connect} from 'react-redux';
import { withRouter, Route} from 'react-router-dom'

class Mine extends React.Component {


  render() {
    const user = this.props.user || null;
    const path = this.props.location.pathname || null;
    const Man = () => <div>man</div>;
    const Women = () => <div>women</div>;
    console.log(user);
    return (
      <div className="mine">
        <h3>Mine</h3> 

  
        {
          path === '/mine/man/info'
          ? <Man />
          : path === '/mine/women/info' ? <Women /> : null
        }
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