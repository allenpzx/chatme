import React from "react";
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from "react-router-dom";
import Login from './views/login/login.jsx';
import Register from './views/register/register.jsx';
import Main from './views/main/main.jsx';
import { getUser } from './store/actions/Auth.js';
class App extends React.Component {

  state={
    user: null
  }

  componentDidMount(){
    this.props.getUser();
  }

  render() {
    return (
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
    );
  }
}

export default withRouter(connect(
  state=>({
    user: state.Auth
  }),
  dispatch=>({
    getUser: ()=>{
      getUser(dispatch);
    }
  })
)(App))