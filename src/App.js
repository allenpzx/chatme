import React from "react";
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from "react-router-dom";
import Login from './views/login/login.jsx';
import Register from './views/register/register.jsx';
import Main from './views/main/main.jsx';
import AuthRoute from './components/AuthRoute/authroute.jsx';
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AuthRoute />
        <Switch>
          <Route path='/' component={Main} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(
  state=>({
    user: state.user
  })
)(App))