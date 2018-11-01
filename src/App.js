import React from "react";
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from './views/login/login.jsx';
import Register from './views/register/register.jsx';
import Main from './views/main/main.jsx';
import AuthRoute from './components/auth-route/auth-route.jsx';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AuthRoute />
        <Switch>
          <Route path='/index' component={Main} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Redirect to='/index/home' />
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