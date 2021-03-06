import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from './views/login/login.jsx';
import Register from './views/register/register.jsx';
import AuthRoute from './components/auth-route/auth-route.jsx';
import DashBoard from './views/dashboard/dashboard.jsx';
import Chat from './views/chat/chat.jsx';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AuthRoute />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/chat/:target' component={Chat} />
          <Route component={DashBoard} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default App