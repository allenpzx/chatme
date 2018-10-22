import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from './views/login/login.jsx';
import Main from './views/main/main.jsx';
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path='/' component={Main} />
        <Route path='/login' component={Login} />
      </div>
    );
  }
}
